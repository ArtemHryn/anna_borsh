"use client";

import { useFormContext } from "react-hook-form";
import styles from "./FormInput.module.scss";

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
};

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <label className={styles.label}>
      <span>{label}</span>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={styles.input}
      />

      {error && <span className={styles.error}>{String(error.message)}</span>}
    </label>
  );
};

export default FormInput;
