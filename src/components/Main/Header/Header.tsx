import styles from "./Header.module.scss";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import Menu from "./Menu/Menu";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.mob_wrapper}>
        <h1 className={styles.title}>ANKA BORSH</h1>
        <Menu />
      </div>
      <div className={styles.tab_plus_wrapper}>
        <h1 className={styles.title}>ANKA BORSH</h1>
        <HeaderNavigation/>
      </div>
    </header>
  );
};

export default Header;
