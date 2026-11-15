import Link from "next/link";

import styles from "./AddProductButton.module.scss";

const AddProductButton = () => {
  return (
    <Link href={"products/add"} className={styles.link}>
      + Створити продукт
    </Link>
  );
};

export default AddProductButton;
