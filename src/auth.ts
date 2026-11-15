import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { backend_url } from "@/helpers/consts";

type BackendUser = {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  id?: string;
  name?: string;
  email: string;
  role?: string;
};

type BackendTokens = Pick<
  BackendUser,
  "accessToken" | "refreshToken" | "expiresIn" | "role"
>;

type AuthToken = {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: number;
  role?: string;
  error?: "RefreshAccessTokenError";
};

const refreshRequests = new Map<
  string,
  { promise: Promise<BackendTokens>; expiresAt: number }
>();

async function callAuthApi(path: string, body: Record<string, string>) {
  const response = await fetch(`${backend_url}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Authentication API request failed (${response.status})`);
  }

  const payload: unknown = await response.json();
  if (!payload || typeof payload !== "object") {
    throw new Error("Authentication API returned an invalid response");
  }

  // Accept direct responses, { data: ... } envelopes, and token responses
  // that keep profile fields inside a nested `user` object.
  const record = payload as Record<string, unknown>;
  const envelope = (
    record.data && typeof record.data === "object" ? record.data : record
  ) as Record<string, unknown>;
  const profile = (
    envelope.user && typeof envelope.user === "object"
      ? envelope.user
      : envelope
  ) as Record<string, unknown>;

  if (
    typeof envelope.accessToken !== "string" ||
    typeof envelope.refreshToken !== "string" ||
    typeof profile.email !== "string"
  ) {
    throw new Error("Authentication API response is missing required fields");
  }

  return {
    accessToken: envelope.accessToken,
    refreshToken: envelope.refreshToken,
    expiresIn:
      typeof envelope.expiresIn === "number" ? envelope.expiresIn : undefined,
    id: typeof profile.id === "string" ? profile.id : undefined,
    name: typeof profile.name === "string" ? profile.name : undefined,
    email: profile.email,
    role: typeof profile.role === "string" ? profile.role : undefined,
  };
}

async function callRefreshApi(refreshToken: string): Promise<BackendTokens> {
  const response = await fetch(`${backend_url}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Authentication API request failed (${response.status})`);
  }

  const payload: unknown = await response.json();
  if (!payload || typeof payload !== "object") {
    throw new Error("Authentication API returned an invalid refresh response");
  }

  const record = payload as Record<string, unknown>;
  const envelope = (
    record.data && typeof record.data === "object" ? record.data : record
  ) as Record<string, unknown>;

  if (
    typeof envelope.accessToken !== "string" ||
    typeof envelope.refreshToken !== "string"
  ) {
    throw new Error("Refresh response is missing required tokens");
  }

  return {
    accessToken: envelope.accessToken,
    refreshToken: envelope.refreshToken,
    expiresIn:
      typeof envelope.expiresIn === "number" ? envelope.expiresIn : undefined,
    role: typeof envelope.role === "string" ? envelope.role : undefined,
  };
}

async function refreshBackendTokens(
  refreshToken: string,
): Promise<BackendTokens> {
  const now = Date.now();
  for (const [key, entry] of refreshRequests) {
    if (entry.expiresAt <= now) refreshRequests.delete(key);
  }

  const existingRequest = refreshRequests.get(refreshToken);
  if (existingRequest) return existingRequest.promise;

  const entry = {
    promise: callRefreshApi(refreshToken),
    expiresAt: Number.POSITIVE_INFINITY,
  };
  refreshRequests.set(refreshToken, entry);

  try {
    const refreshed = await entry.promise;
    entry.expiresAt = Date.now() + 30_000;
    return refreshed;
  } catch (error) {
    if (refreshRequests.get(refreshToken) === entry) {
      refreshRequests.delete(refreshToken);
    }
    throw error;
  }
}

function setBackendTokens(token: AuthToken, user: BackendTokens) {
  token.accessToken = user.accessToken;
  token.refreshToken = user.refreshToken;
  if (user.role !== undefined) token.role = user.role;
  token.accessTokenExpiresAt = Date.now() + (user.expiresIn ?? 900) * 1000;
  delete token.error;
}

async function refreshAccessToken(token: AuthToken): Promise<AuthToken> {
  try {
    if (!token.refreshToken) throw new Error("Refresh token is missing");
    const refreshed = await refreshBackendTokens(token.refreshToken);
    setBackendTokens(token, refreshed);
    console.log("Refreshed token at:", new Date().toLocaleString());
    return token;
  } catch (error) {
    console.error("[auth] Failed to refresh access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        try {
          const user = await callAuthApi("auth/login", {
            email: credentials.email,
            password: credentials.password,
          });
          return user;
        } catch {
          return null;
        }
      },
    }),
    Google({
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      const authToken = token as typeof token & AuthToken;

      if (account?.provider === "google" && account.id_token) {
        try {
          console.log("id_token: ", account.id_token);

          const backendUser = await callAuthApi("auth/google", {
            idToken: account.id_token,
          });
          console.log("backendUser: ", backendUser);

          setBackendTokens(authToken, backendUser);
        } catch {
          authToken.error = "RefreshAccessTokenError";
        }
      } else if (user) {
        setBackendTokens(authToken, user as typeof user & BackendUser);
      }

      if (
        authToken.accessToken &&
        authToken.accessTokenExpiresAt &&
        Date.now() < authToken.accessTokenExpiresAt
      ) {
        return authToken;
      }

      if (authToken.refreshToken) {
        return refreshAccessToken(authToken);
      }

      return authToken;
    },
    async session({ session, token }) {
      const authToken = token as typeof token & AuthToken;
      session.accessToken = authToken.accessToken;
      session.user.role = authToken.role;
      session.authError = authToken.error;
      return session;
    },
  },
  events: {
    async signOut(message) {
      if (!("token" in message)) return;

      const refreshToken = (message.token as AuthToken | null)?.refreshToken;
      if (!refreshToken) return;

      try {
        await fetch(`${backend_url}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
          cache: "no-store",
        });
      } catch {
        // Clear the local session even if the backend cannot be reached.
      }
    },
  },
});
