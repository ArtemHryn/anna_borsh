import Link from "next/link";
import { useFormContext } from "react-hook-form";

import styles from "./SubmitButton.module.scss";

const SubmitButton = () => {
  const { reset } = useFormContext();

  return (
    <div className={styles.wrapper}>
      <Link
        href="/cabinet/admin/products"
        className={styles.back}
        onClick={() => reset()}
      >
        Відмовитись та вийти
      </Link>
      <button className={styles.submit}>Зберегти зміни</button>
    </div>
  );
};

export default SubmitButton;
