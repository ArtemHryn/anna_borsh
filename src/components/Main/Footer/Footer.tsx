import Title from "../Title/Title";
import FooterForm from "./FooterForm/FooterForm";

import styles from "./Footer.module.scss";
import SocialList from "./SocialList/SocialList";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.form_wrapper}>
          <div className={styles.text_wrapper}>
            <Title title="Є ЩО СКАЗАТИ?" styled={styles.title} />
            <p className={styles.about}>кажи. я не кусаюсь, ну майже ↑</p>
          </div>
          <FooterForm />
        </div>
        <div className={styles.bottom_text_wrapper}>
          <h2 className={styles.anka_title}>
            ANKA <span>BORSH</span>
          </h2>

          <SocialList />
          <div className={styles.politic_wrapper}>
            <a href="#" className={styles.politic_links}>
              Політика конфіденційності
            </a>
            <a href="#" className={styles.politic_links}>
              Публічна оферта
            </a>
            <p className={styles.copyright}>© 2026 ANKA BORSH</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
