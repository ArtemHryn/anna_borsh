import Link from "next/link";

import styles from "./About.module.scss";

const About = ({ isRegister }: { isRegister: boolean }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>ANKA BORSH</h2>
      <p className={styles.text}>
        Будь собою. Навіть у блозі. Керуй своєю реальністю впевнено та сміливо.
      </p>
      <div className={styles.route_wrapper}>
        <p className={styles.route_text}>
          {isRegister ? "Вже маєте акаунт?" : "Немає акаунту?"}
        </p>
        <Link
          href={isRegister ? "/login" : "/registration"}
          className={styles.route_link}
        >
          {isRegister ? "Увійти" : "Реєстрація"}
        </Link>
      </div>
    </div>
  );
};

export default About;
