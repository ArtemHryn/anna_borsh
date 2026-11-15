import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    authError?: "RefreshAccessTokenError";
    user: {
      role?: string;
    } & NonNullable<DefaultSession["user"]>;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    expiresIn?: number;
    accessTokenExpiresAt?: number;
  }
}

import type { DefaultSession } from "next-auth";
