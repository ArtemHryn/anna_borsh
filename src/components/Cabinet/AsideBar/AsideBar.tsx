import Logo from "./Logo/Logo";
import styles from "./AsideBar.module.scss";
import Navigation from "./Navigation/Navigation";
import LogOut from "./LogOut/LogOut";

interface AsideBar {
  type: "admin" | "user";
  asideNavList?: { name: string; href: string }[];
}

const AsideBar = ({ type, asideNavList = [] }: AsideBar) => {
  return (
    <aside className={styles.aside}>
      <Logo type={type} />
      <Navigation navList={asideNavList} />
      <LogOut />
    </aside>
  );
};

export default AsideBar;
