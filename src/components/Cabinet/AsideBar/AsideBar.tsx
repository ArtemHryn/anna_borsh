import Logo from "./Logo/Logo";
import styles from "./AsideBar.module.scss";
import Navigation from "./Navigation/Navigation";
import LogOut from "./LogOut/LogOut";
import { Suspense } from "react";

interface AsideBar {
  type: "admin" | "user";
  asideNavList?: { name: string; href: string }[];
}

const AsideBar = ({ type, asideNavList = [] }: AsideBar) => {
  return (
    <aside className={styles.aside}>
      <Logo type={type} />
      <Suspense fallback={<div></div>}>
        <Navigation navList={asideNavList} />
      </Suspense>
      <LogOut />
    </aside>
  );
};

export default AsideBar;
