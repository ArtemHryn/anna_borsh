import { signIn } from "next-auth/react";
import type { LoginFormValues } from "@/schemas/auth.shema";

export async function loginMutation({ email, password }: LoginFormValues) {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (!result?.ok || result.error) {
    throw new Error("Не вдалося увійти. Перевірте email і пароль.");
  }

  return result.url ?? "/";
}
