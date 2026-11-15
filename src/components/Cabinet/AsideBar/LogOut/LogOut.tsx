import { logout } from "@/helpers/auth/logout";
import styles from "./LogOut.module.scss";

const LogOut = () => {
  return (
    <form action={logout}>
      <button className={styles.logout_btn} type="submit">
        Вийти з кабінету
      </button>
    </form>
  );
};

export default LogOut;
