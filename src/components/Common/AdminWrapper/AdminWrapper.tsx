import type { ReactNode } from "react";
import CabinetHeader from "@/components/Cabinet/CabinetHeader/CabinetHeader";
import styles from "./AdminWrapper.module.scss";

interface AdminWrapperProps {
  children: ReactNode;
  title: string;
  description: string;
}

const AdminWrapper = ({ children, title, description }: AdminWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <CabinetHeader title={title} description={description} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AdminWrapper;
