"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { forgotPasswordMutation } from "@/helpers/auth/forgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/schemas/auth.shema";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPasswordMutation,
    onSuccess: () =>
      toast.success("Якщо акаунт із цією адресою існує, ми надіслали лист."),
    onError: (error: Error) => toast.error(error.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    mutation.mutate(data);
  };

  return (
    <section className={styles.card}>
      <div className={styles.icon_wrap} aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none">
          <rect x="8" y="14" width="48" height="36" rx="8" />
          <path d="m12 20 20 16 20-16" />
          <path d="M42 45h12m-6-6v12" />
        </svg>
      </div>

      <p className={styles.eyebrow}>ВІДНОВЛЕННЯ ДОСТУПУ</p>
      <h1 className={styles.title}>Забули пароль?</h1>
      <p className={styles.description}>
        Вкажіть email, з яким ви реєструвалися. Якщо акаунт існує, ми надішлемо
        інструкцію для створення нового пароля.
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label className={styles.label} htmlFor="forgot-password-email">
          EMAIL
          <input
            id="forgot-password-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            className={styles.input}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "forgot-password-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <span className={styles.error} id="forgot-password-error">
              {errors.email.message}
            </span>
          )}
        </label>

        {mutation.isSuccess && (
          <p className={styles.success_message} role="status">
            Перевірте пошту та папку «Спам». Якщо лист не надійшов, перевірте
            правильність email.
          </p>
        )}
        {mutation.isError && (
          <p className={styles.error_message} role="alert">
            {mutation.error.message}
          </p>
        )}

        <button
          type="submit"
          className={styles.submit}
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? "НАДСИЛАЄМО..."
            : mutation.isSuccess
              ? "НАДІСЛАТИ ЩЕ РАЗ"
              : "НАДІСЛАТИ ІНСТРУКЦІЮ"}
        </button>
      </form>

      <Link href="/login" className={styles.back_link}>
        ← Повернутися до входу
      </Link>
    </section>
  );
};

export default ForgotPassword;
