import Link from "next/link";
import styles from "./VerifyEmail.module.scss";

const VerifyEmailButtons = () => (
  <div className={styles.actions}>
    <Link href="/login" className={styles.primary_button}>
      Повернутися до входу
    </Link>
  </div>
);

export default VerifyEmailButtons;
