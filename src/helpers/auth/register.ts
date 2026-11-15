import { backend_url } from "@/helpers/consts";
import type { RegisterFormValues } from "@/schemas/auth.shema";

export async function registrationMutation({
  name,
  email,
  password,
}: RegisterFormValues): Promise<void> {
  const response = await fetch(
    `${backend_url.replace(/\/$/, "")}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    },
  );

  if (response.ok) return;

  let message = "Не вдалося зареєструватися. Спробуйте ще раз.";
  try {
    const payload: unknown = await response.json();
    if (payload && typeof payload === "object") {
      const body = payload as Record<string, unknown>;
      const details = body.message ?? body.error;
      if (typeof details === "string") message = details;
    }
  } catch {
    // Keep the fallback message when the server response is not JSON.
  }

  throw new Error(message);
}
