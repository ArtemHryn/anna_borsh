"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { resetPasswordMutation } from "@/helpers/auth/resetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/schemas/auth.shema";
import styles from "./ResetPassword.module.scss";

const ResetPassword = ({ token }: { token?: string }) => {
  const mutation = useMutation({
    mutationFn: resetPasswordMutation,
    retry: false,
    onSuccess: () => toast.success("Пароль успішно змінено."),
    onError: (error: Error) => toast.error(error.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    if (!token) return;
    mutation.mutate({ ...values, token });
  };

  return (
    <section className={styles.card}>
      <div className={styles.icon_wrap} aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none">
          <rect x="13" y="28" width="38" height="27" rx="5" />
          <path d="M21 28v-8a11 11 0 0 1 22 0v8" />
          <circle cx="32" cy="40" r="3" />
          <path d="M32 43v5" />
        </svg>
      </div>

      <p className={styles.eyebrow}>ОНОВЛЕННЯ ДОСТУПУ</p>
      <h1 className={styles.title}>
        {mutation.isSuccess ? "Пароль змінено" : "Створіть новий пароль"}
      </h1>
      <p className={styles.description}>
        {mutation.isSuccess
          ? "Тепер увійдіть до акаунта, використовуючи новий пароль."
          : "Введіть новий пароль для свого акаунта та підтвердьте його."}
      </p>

      {!token ? (
        <p className={styles.error_message} role="alert">
          У посиланні для відновлення немає токена. Запросіть нове посилання.
        </p>
      ) : mutation.isSuccess ? (
        <Link href="/login" className={styles.submit}>
          ПЕРЕЙТИ ДО ВХОДУ
        </Link>
      ) : (
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label className={styles.label} htmlFor="reset-password">
            НОВИЙ ПАРОЛЬ
            <input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              className={styles.input}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "reset-password-error" : undefined
              }
              {...register("password")}
            />
            {errors.password && (
              <span className={styles.error} id="reset-password-error">
                {errors.password.message}
              </span>
            )}
          </label>

          <label className={styles.label} htmlFor="reset-password-confirm">
            ПІДТВЕРДІТЬ ПАРОЛЬ
            <input
              id="reset-password-confirm"
              type="password"
              autoComplete="new-password"
              className={styles.input}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? "reset-password-confirm-error"
                  : undefined
              }
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span
                className={styles.error}
                id="reset-password-confirm-error"
              >
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

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
            {mutation.isPending ? "ЗБЕРІГАЄМО..." : "ЗМІНИТИ ПАРОЛЬ"}
          </button>
        </form>
      )}

      <Link href="/login" className={styles.back_link}>
        ← Повернутися до входу
      </Link>
    </section>
  );
};

export default ResetPassword;
