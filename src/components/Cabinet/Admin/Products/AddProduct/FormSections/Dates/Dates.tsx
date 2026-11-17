"use client";

import { ChevronLeft } from "@primeicons/react/chevron-left";
import { ChevronRight } from "@primeicons/react/chevron-right";
import { Button } from "@primereact/ui/button";
import {
  DatePicker,
  type DatePickerRootValueChangeEvent,
} from "@primereact/ui/datepicker";
import { Controller, useFormContext } from "react-hook-form";

import type { AddProductFormData } from "../../types";
import styles from "./Dates.module.scss";

const Dates = () => {
  const { control } = useFormContext<AddProductFormData>();

  return (
    <Controller
      control={control}
      name="dateRange"
      rules={{
        validate: (value) =>
          value?.length === 2 || "Оберіть дату початку та завершення.",
      }}
      render={({ field, fieldState }) => (
        <div className={styles.wrapper}>
          <label
            className={`${styles.label} ${fieldState.error ? styles.errorLabel : ""}`}
            htmlFor="product-date-range"
          >
            {fieldState.error?.message ?? "ДАТИ ПРОДАЖУ"}
          </label>
          <DatePicker.Root
            value={field.value?.length ? field.value : null}
            selectionMode="range"
            dateFormat="dd.mm.yy"
            updateModelType="date"
            manualInput={false}
            className={styles.datePicker}
            onValueChange={(event: DatePickerRootValueChangeEvent) => {
              const value = Array.isArray(event.value)
                ? event.value.filter(
                    (date): date is Date => date instanceof Date,
                  )
                : event.value instanceof Date
                  ? [event.value]
                  : [];

              field.onChange(value.length ? value : undefined);
            }}
          >
            <DatePicker.Input
              id="product-date-range"
              className={styles.input}
              placeholder="Оберіть період"
              onBlur={field.onBlur}
            />
            <DatePicker.Portal>
              <DatePicker.Positioner align="start">
                <DatePicker.Popup className={styles.popup}>
                  <DatePicker.Body>
                    <DatePicker.Panel>
                      <DatePicker.Calendar>
                        <DatePicker.Header>
                          <DatePicker.Prev
                            as={Button}
                            iconOnly
                            variant="text"
                            rounded
                            severity="secondary"
                            size="small"
                            aria-label="Попередній місяць"
                          >
                            <ChevronLeft />
                          </DatePicker.Prev>
                          <DatePicker.Title>
                            <DatePicker.SelectMonth />
                            <DatePicker.SelectYear />
                            <DatePicker.Decade />
                          </DatePicker.Title>
                          <DatePicker.Next
                            as={Button}
                            iconOnly
                            variant="text"
                            rounded
                            severity="secondary"
                            size="small"
                            aria-label="Наступний місяць"
                          >
                            <ChevronRight />
                          </DatePicker.Next>
                        </DatePicker.Header>
                        <DatePicker.Table>
                          <DatePicker.TableHead />
                          <DatePicker.TableBody />
                          <DatePicker.TableBody view="month" />
                          <DatePicker.TableBody view="year" />
                        </DatePicker.Table>
                      </DatePicker.Calendar>
                    </DatePicker.Panel>
                  </DatePicker.Body>
                </DatePicker.Popup>
              </DatePicker.Positioner>
            </DatePicker.Portal>
          </DatePicker.Root>
        </div>
      )}
    />
  );
};

export default Dates;
