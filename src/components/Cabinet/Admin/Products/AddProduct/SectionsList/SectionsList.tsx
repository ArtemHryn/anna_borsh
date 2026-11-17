import { fields } from "@/helpers/cabinet/admin/productList";
import type { ProductListType } from "@/helpers/cabinet/admin/productList";
import type { Dispatch, SetStateAction } from "react";
import { useFormContext, useFormState } from "react-hook-form";

import type { AddProductFormData } from "../types";
import styles from "./SectionsList.module.scss";

interface SectionsListProps {
  setBlock: Dispatch<SetStateAction<ProductListType>>;
  block: ProductListType;
}

const SectionsList = ({ setBlock, block }: SectionsListProps) => {
  const { control } = useFormContext<AddProductFormData>();
  const { errors } = useFormState({ control });

  const sectionHasError = (section: ProductListType) => {
    switch (section) {
      case "productInfo":
        return Boolean(errors.name || errors.description);
      case "cardInfo":
        return Boolean(errors.cardName || errors.cardDescription);
      case "cover":
        return Boolean(errors.cover);
      case "dates":
        return Boolean(errors.dateRange);
      case "pricing":
        return Boolean(errors.price || errors.discount);
      default: {
        const blockNumber = section.slice("block".length);
        return Boolean(
          errors[`blockName${blockNumber}` as keyof AddProductFormData] ||
          errors[`blockDescription${blockNumber}` as keyof AddProductFormData],
        );
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.counter}>ЗАПОВНЕНО РОЗДІЛІВ 0/15</p>
      <ul className={styles.list}>
        {fields.map((el) => {
          const hasError = sectionHasError(el.type);

          return (
            <li key={el.type}>
              <button
                onClick={() => setBlock(el.type)}
                type="button"
                className={`${styles.select_button} ${block === el.type ? styles.active : ""} ${hasError ? styles.hasError : ""}`}
              >
                {el.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SectionsList;
