import { Select, type SelectValueChangeEvent } from "@primereact/ui/select";
import {
  Controller,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import styles from "./Selector.module.scss";

export interface SelectorOption {
  label: string;
  value: string | number;
}

interface SelectorProps<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  label: string;
  options: readonly SelectorOption[];
  placeholder?: string;
}

const Selector = <TFormValues extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Оберіть значення",
}: SelectorProps<TFormValues>) => {
  const { control } = useFormContext<TFormValues>();
  const selectId = String(name).replaceAll(".", "-");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={styles.selectField}>
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
          <Select.Root
            value={field.value}
            options={[...options]}
            optionLabel="label"
            optionValue="value"
            onValueChange={(event: SelectValueChangeEvent) => {
              if (options.some((option) => option.value === event.value)) {
                field.onChange(event.value);
              }
            }}
            onBlur={field.onBlur}
            invalid={fieldState.invalid}
            className={styles.select}
          >
            <Select.Trigger
              id={selectId}
              className={styles.selectTrigger}
              aria-label={label}
            >
              <Select.Value placeholder={placeholder} />
              <Select.Indicator className={styles.selectIndicator}>
                ▾
              </Select.Indicator>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup className={styles.selectPopup}>
                  <Select.List className={styles.selectList} />
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          {fieldState.error?.message && (
            <span role="alert">{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default Selector;
