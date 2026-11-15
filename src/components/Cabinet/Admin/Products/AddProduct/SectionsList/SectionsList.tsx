import { fields, ProductListType } from "@/helpers/cabinet/admin/productList";
import { Dispatch, SetStateAction } from "react";

import styles from "./SectionsList.module.scss";

interface SectionsListProps {
  setBlock: Dispatch<SetStateAction<ProductListType>>;
  block: ProductListType;
}

const SectionsList = ({ setBlock, block }: SectionsListProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.counter}>ЗАПОВНЕНО РОЗДІЛІВ 0/15</p>
      <ul className={styles.list}>
        {fields.map((el) => (
          <li key={el.type}>
            <button
              onClick={() => setBlock(el.type)}
              type="button"
              className={`${styles.select_button} ${block === el.type ? styles.active : ""}`}
            >
              {el.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionsList;
