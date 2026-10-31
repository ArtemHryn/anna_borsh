import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>ANKA</h1>
      <div className={styles.info_wrapper}>
        <p className={styles.couch}>КОУЧ / МАРКЕТОЛОГ</p>

        <div className={styles.description_wrapper}>
          <h2 className={styles.title}>BORSH</h2>
          <p className={styles.be_yourself}>БУДЬ СОБОЮ. НАВІТЬ У БЛОЗІ.</p>
          <div className={styles.inner_description_wrapper}>
            <p className={styles.description}>
              Після роботи зі мною та моїх курсів - розумні сильні експерти
              пробивають фінансову стелю без вигорання і переходять на інший
              рівень життя в балансі між карʼєрою та сімʼєю.{" "}
            </p>
            <p className={styles.description}>
              Тут можна доєднатися до програми амбасадора та заробляти з Анкою
              Борщ разом.
            </p>
          </div>
          <div className={styles.buttons_wrapper}>
            <a href="#" className={`${styles.buttons} ${styles.primary}`}>
              Обрати програму
            </a>
            <a href="#" className={`${styles.buttons} ${styles.secondary}`}>
              Консультація
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
