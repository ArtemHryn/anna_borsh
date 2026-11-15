import Auth from "@/components/Cabinet/Auth/Auth";

import styles from "./layout.module.scss";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Auth />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
