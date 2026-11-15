import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Некоректний email"),
  password: z.string().min(1, "Введіть пароль"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Введіть ваше ім'я"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Некоректний email"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, "Введіть новий пароль"),
    confirmPassword: z.string().min(1, "Повторіть новий пароль"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Паролі не збігаються",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export type AuthFormValues = LoginFormValues | RegisterFormValues;
