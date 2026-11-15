"use client";

import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import AuthForm from "./AuthForm/AuthForm";
import About from "./About/About";
import { loginMutation } from "@/helpers/auth/login";
import { registrationMutation } from "@/helpers/auth/register";

import type {
  AuthFormValues,
  LoginFormValues,
  RegisterFormValues,
} from "@/schemas/auth.shema";

import styles from "./Auth.module.scss";

const Auth = () => {
  const pathname = usePathname();
  const router = useRouter();

  const mode = pathname.endsWith("/registration") ? "registration" : "login";

  const isRegister = mode === "registration";

  const signInMutation = useMutation({
    mutationFn: loginMutation,
    onSuccess: (url) => {
      router.replace(url);
      router.refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const registerMutation = useMutation({
    mutationFn: registrationMutation,
    onSuccess: () => {
      toast.success("Реєстрацію завершено. Тепер увійдіть у свій акаунт.");
      router.push("/login");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await signInMutation.mutateAsync(data);
    } catch {
      // The mutation reports its error through onError.
    }
  };

  const handleRegistration = async (data: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch {
      // The mutation reports its error through onError.
    }
  };

  const onSubmit = async (data: AuthFormValues) => {

    if (isRegister && "name" in data) {
      await handleRegistration(data);
    } else {
      await handleLogin(data);
    }
  };

  return (
    <>
      <About isRegister={isRegister} />
      <div className={styles.auth_wrapper}>
        {" "}
        <h1 className={styles.title}>{isRegister ? "Реєстрація" : "Вхід"}</h1>
        <AuthForm mode={mode} onSubmit={onSubmit} />
      </div>
      <div className={styles.route_wrapper}>
        <p>{isRegister ? "Вже маєте акаунт?" : "Немає акаунту?"}</p>
        <Link
          href={isRegister ? "/login" : "/registration"}
          className={styles.route_link}
        >
          {isRegister ? "Увійти" : "Реєстрація"}
        </Link>
      </div>
    </>
  );
};

export default Auth;
