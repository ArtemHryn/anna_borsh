import { backend_url } from "@/helpers/consts";
import type { ForgotPasswordFormValues } from "@/schemas/auth.shema";

export async function forgotPasswordMutation({
  email,
}: ForgotPasswordFormValues): Promise<void> {
  let response: Response;

  try {
    response = await fetch(
      `${backend_url.replace(/\/$/, "")}/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );
  } catch {
    throw new Error("Не вдалося з'єднатися із сервером. Спробуйте ще раз.");
  }

  if (response.ok) return;

  let message = "Не вдалося надіслати лист. Перевірте адресу й спробуйте ще раз.";
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
