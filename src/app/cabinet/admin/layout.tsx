import AsideBar from "@/components/Cabinet/AsideBar/AsideBar";
import styles from "./AdminMainLayout.module.scss";

const asideNavList = [
  { name: "Продукти", href: "/cabinet/admin/products" },
  { name: "Кейси", href: "/cabinet/admin/cases" },
  { name: "Студенти", href: "/cabinet/admin/students" },
  {
    name: "Амбасадорська програма",
    href: "/cabinet/admin/ambassador-settings",
  },
  { name: "Налаштування", href: "/cabinet/admin/law-settings" },
];

const AdminMainLayout = ({ children }: LayoutProps<"/cabinet/admin">) => {
  return (
    <div className={styles.layout}>
      <AsideBar type="admin" asideNavList={asideNavList} />
      {children}
    </div>
  );
};

export default AdminMainLayout;
