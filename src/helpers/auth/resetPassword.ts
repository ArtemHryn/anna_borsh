import { backend_url } from "@/helpers/consts";
import type { ResetPasswordFormValues } from "@/schemas/auth.shema";

type ResetPasswordPayload = ResetPasswordFormValues & { token: string };

export async function resetPasswordMutation({
  token,
  password,
}: ResetPasswordPayload): Promise<void> {
  let response: Response;

  try {
    response = await fetch(
      `${backend_url.replace(/\/$/, "")}/auth/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      },
    );
  } catch {
    throw new Error("Не вдалося з'єднатися із сервером. Спробуйте ще раз.");
  }

  if (response.ok) return;

  let message = "Не вдалося змінити пароль. Можливо, посилання застаріло.";
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
