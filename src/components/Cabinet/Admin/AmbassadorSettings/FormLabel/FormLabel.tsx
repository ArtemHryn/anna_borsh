"use client";

import {
  useFormContext,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";

import styles from "./FormLabel.module.scss";

interface FormLabelProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  registerOptions?: RegisterOptions<FieldValues, FieldPath<FieldValues>>;
  clampRange?: { min: number; max: number };
}

const FormLabel = ({
  label,
  name,
  type = "text",
  placeholder,
  registerOptions = {},
  clampRange,
}: FormLabelProps) => {
  const { register, setValue, getFieldState, formState } =
    useFormContext<FieldValues>();
  const { error } = getFieldState(name, formState);
  const inputId = name.replaceAll(".", "-");
  const errorId = `${inputId}-error`;
  const field = register(name, registerOptions);

  return (
    <label htmlFor={inputId} className={styles.label}>
      {label}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        min={clampRange?.min}
        max={clampRange?.max}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={styles.input}
        {...field}
        onChange={async (event) => {
          const input = event.currentTarget;
          await field.onChange(event);

          if (!clampRange) return;

          const value = input.valueAsNumber;
          if (Number.isNaN(value)) return;

          const clampedValue = Math.min(
            clampRange.max,
            Math.max(clampRange.min, value),
          );

          if (clampedValue !== value) {
            input.value = String(clampedValue);
            setValue(name, clampedValue, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }
        }}
      />
      {error?.message && (
        <span id={errorId} role="alert">
          {String(error.message)}
        </span>
      )}
    </label>
  );
};

export default FormLabel;
