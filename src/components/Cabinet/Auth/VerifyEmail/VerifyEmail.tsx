"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { backend_url } from "@/helpers/consts";
import VerifyEmailButtons from "./VerifyEmailButtons";
import styles from "./VerifyEmail.module.scss";

type VerificationState = "loading" | "success" | "error";

async function getResponseError(response: Response) {
  try {
    const payload: unknown = await response.json();
    if (payload && typeof payload === "object") {
      const body = payload as Record<string, unknown>;
      const data = body.data;
      const nested =
        data && typeof data === "object"
          ? (data as Record<string, unknown>)
          : undefined;
      const message =
        body.message ?? body.error ?? nested?.message ?? nested?.error;
      if (typeof message === "string") return message;
    }
  } catch {
    // Fall back to a readable message if the server did not return JSON.
  }

  return "Посилання для підтвердження недійсне або термін його дії минув.";
}

async function verifyEmailRequest(token: string): Promise<void> {
  let response: Response;
  try {
    response = await fetch(
      `${backend_url.replace(/\/$/, "")}/auth/verify-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      },
    );
  } catch {
    throw new Error("Не вдалося з'єднатися із сервером. Спробуйте ще раз.");
  }

  if (!response.ok) {
    throw new Error(await getResponseError(response));
  }
}

const VerifyEmail = ({ token }: { token?: string }) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const submittedToken = useRef<string | undefined>(undefined);
  const missingTokenToastShown = useRef(false);

  const verification = useMutation({
    mutationFn: verifyEmailRequest,
    retry: false,
    onSuccess: () => toast.success("Електронну пошту успішно підтверджено."),
    onError: (error: Error) => toast.error(error.message),
  });

  useEffect(() => {
    if (!token) {
      if (!missingTokenToastShown.current) {
        missingTokenToastShown.current = true;
        toast.error("У посиланні для підтвердження немає токена.");
      }
      return;
    }

    if (submittedToken.current === token) return;
    submittedToken.current = token;
    verification.mutate(token);
  }, [token, verification, verification.mutate]);

  useEffect(() => {
    if (!verification.isSuccess) return;

    const timer = window.setInterval(() => {
      setCountdown((current) => Math.max(current - 1, 0));
    }, 1000);
    const redirectTimer = window.setTimeout(
      () => router.replace("/login"),
      3000,
    );

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(redirectTimer);
    };
  }, [router, verification.isSuccess]);

  const visibleState: VerificationState =
    !token || verification.isError
      ? "error"
      : verification.isSuccess
        ? "success"
        : "loading";
  const isLoading = visibleState === "loading";
  const isSuccess = visibleState === "success";
  const visibleError = token
    ? (verification.error?.message ??
      "Не вдалося підтвердити електронну пошту.")
    : "У посиланні для підтвердження немає токена.";

  return (
    <div
      className={`${styles.card} ${styles[visibleState]}`}
      aria-live="polite"
    >
      <div className={styles.icon_wrap} aria-hidden="true">
        {isLoading ? (
          <span className={styles.spinner} />
        ) : (
          <svg viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="22" />
            {isSuccess ? (
              <path d="m21 32 7 7 15-16" />
            ) : (
              <path d="m25 25 14 14m0-14L25 39" />
            )}
          </svg>
        )}
      </div>

      <p className={styles.eyebrow}>
        {isLoading ? "ПЕРЕВІРКА ПОШТИ" : isSuccess ? "ГОТОВО" : "ПОМИЛКА"}
      </p>
      <h1 className={styles.title}>
        {isLoading
          ? "Підтверджуємо вашу адресу"
          : isSuccess
            ? "Електронну пошту підтверджено"
            : "Не вдалося підтвердити пошту"}
      </h1>
      <p className={styles.description}>
        {isLoading
          ? "Зачекайте, ми перевіряємо посилання для підтвердження."
          : isSuccess
            ? `Ваша адреса електронної пошти підтверджена. Через ${countdown} сек. вас буде перенаправлено на сторінку входу.`
            : visibleError}
      </p>

      <VerifyEmailButtons />
    </div>
  );
};

export default VerifyEmail;
