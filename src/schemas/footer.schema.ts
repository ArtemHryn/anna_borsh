import { z } from "zod";

export const footerSchema = z.object({
  name: z.string().trim().min(2, "Введіть ім'я"),

  contact: z
    .string()
    .trim()
    .refine((value) => {
      const isEmail = z.email().safeParse(value).success;
      const isNickname = /^@[a-zA-Z0-9_]{2,}$/.test(value);

      return isEmail || isNickname;
    }, "Введіть коректний email або нікнейм (@nickname)"),

  message: z.string().trim().min(10, "Мінімум 10 символів"),
});

export type FooterFormData = z.infer<typeof footerSchema>;
