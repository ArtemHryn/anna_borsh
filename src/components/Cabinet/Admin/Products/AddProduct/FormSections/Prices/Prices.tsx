import { useFormContext, useFormState } from "react-hook-form";

import type { AddProductFormData } from "../../types";
import styles from "./Prices.module.scss";

const PRICE_PATTERN = /^\d+(?:[.,]\d{1,2})?$/;

const Prices = () => {
  const {
    control,
    getValues,
    register,
  } = useFormContext<AddProductFormData>();
  const { errors } = useFormState({
    control,
    name: ["price", "discount"],
    exact: true,
  });

  const priceError = errors.price?.message;
  const discountError = errors.discount?.message;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <span className={priceError ? styles.errorLabel : undefined}>
          {priceError || "ВАРТІСТЬ ПРОДУКТУ (***,** €)"}
        </span>
        <input
          {...register("price", {
            required: "Вкажіть ціну продукту.",
            validate: (value) => {
              const price = value?.trim() ?? "";
              if (!price) return true;
              if (!PRICE_PATTERN.test(price)) {
                return "Введіть коректну ціну, наприклад 120,50.";
              }

              if (Number(price.replace(",", ".")) <= 0) {
                return "Ціна має бути більшою за 0.";
              }

              return true;
            },
            deps: "discount",
          })}
          className={styles.input}
          type="text"
          inputMode="decimal"
          aria-invalid={Boolean(priceError)}
        />
      </label>
      <label className={styles.label}>
        <span className={discountError ? styles.errorLabel : undefined}>
          {discountError || "ВАРТІСТЬ ПРОДУКТУ ЗІ ЗНИЖКОЮ (***,** €)"}
        </span>
        <input
          {...register("discount", {
            validate: (value) => {
              const discount = value?.trim() ?? "";
              if (!discount) return true;
              if (!PRICE_PATTERN.test(discount)) {
                return "Введіть коректну знижку, наприклад 99,50.";
              }

              const discountValue = Number(discount.replace(",", "."));
              if (discountValue <= 0) {
                return "Ціна зі знижкою має бути більшою за 0.";
              }

              const price = getValues("price")?.trim();
              if (!price || !PRICE_PATTERN.test(price)) {
                return "Спочатку вкажіть коректну ціну продукту.";
              }

              if (discountValue >= Number(price.replace(",", "."))) {
                return "Ціна зі знижкою має бути меншою за звичайну ціну.";
              }

              return true;
            },
          })}
          className={styles.input}
          type="text"
          inputMode="decimal"
          aria-invalid={Boolean(discountError)}
        />
      </label>
    </div>
  );
};

export default Prices;
