"use client";
import { AnimatePresence, motion } from "motion/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  loginSchema,
  AuthFormValues,
} from "@/schemas/auth.shema";
import { AuthMode } from "../../../../../types/auth.type";

import styles from "./AuthForm.module.scss";
import SocialAuth from "../SocialAuth/SocialAuth";

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: AuthFormValues) => Promise<void>;
}

const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
  const isRegister = mode === "registration";
  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    shouldUnregister: true,
    defaultValues: {
      email: "",
      password: "",
      ...(isRegister && { name: "" }),
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={styles.form}
      >
        <div className={styles.label_wrapper}>
          <AnimatePresence initial={false}>
            {isRegister && (
              <motion.label
                key="name"
                className={styles.label}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: "hidden" }}
              >
                ВАШЕ ІМЯ
                <input
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  className={styles.input}
                />
                {"name" in errors && errors.name && (
                  <p className={styles.error}>{errors.name.message}</p>
                )}
              </motion.label>
            )}
          </AnimatePresence>
          <label className={styles.label}>
            EMAIL
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              className={styles.input}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </label>
          <label className={styles.label}>
            ПАРОЛЬ
            <input
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              {...register("password")}
              className={styles.input}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </label>
          <AnimatePresence initial={false}>
            {!isRegister && (
              <motion.a
                key="forgot-password"
                href="forgot-password"
                className={styles.restore_password_link}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: "hidden" }}
              >
                Забули пароль?
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.enter_wrapper}>
          {" "}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submit}
          >
            {isSubmitting
              ? "ЗАЧЕКАЙТЕ..."
              : isRegister
                ? "ЗАРЕЄСТРУВАТИСЯ →"
                : "УВІЙТИ →"}
          </button>
          <SocialAuth />
        </div>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
