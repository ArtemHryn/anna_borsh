import Image from "next/image";

import styles from "./About.module.scss";
import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";

const About = () => {
  return (
    <section className={styles.section}>
      <SectionHeader left="[ 02 - ХТО Я? ]" right="02" />
      <div className={styles.context_wrapper}>
        <div className={styles.text_wrapper}>
          <h1 className={styles.title}>Допомагаю бути собою в блозі</h1>
          <p className={styles.correct_place}>Ви в правильному місці, якщо:</p>
          <p className={styles.text}>
            Якщо ви хочете, щоб блог приносив стабільний дохід без постійної
            гонитви й вигорання, ріс органічно без залежності від таргету, а
            кожна дія мала зрозумілий сенс і результат — тут ви знайдете
            інструменти, які допоможуть вибудувати власну систему. А якщо ви
            тільки шукаєте себе, не знаєте, з чого почати, або просто хочете
            сміливіше проявлятися й говорити про себе — почати можна саме з
            цього
          </p>
          <div className={styles.facts_pc}>
            {" "}
            <div className={`${styles.fact_wrapper} ${styles.students}`}>
              <p className={`${styles.fact}`}>
                500+
                <span>навчено студентів за останні 2 роки</span>
              </p>
            </div>
            <div className={`${styles.fact_wrapper} ${styles.subs}`}>
              <p className={`${styles.fact}`}>
                30K
                <span>підписників</span>
              </p>
            </div>
            <div className={`${styles.fact_wrapper} ${styles.money}`}>
              <p className={`${styles.fact}`}>
                200K€
                <span>Оборот коштів</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.logo_wrapper}>
          <h2 className={styles.logo_text}>
            БОР<span>ЩИК</span>
          </h2>
          <Image
            alt="Anka Borsch"
            src={"/assets/images/anka_about_mob.webp"}
            width={627}
            height={852}
            className={styles.img}
            loading="eager"
          />

          <p className={styles.couch}>← так, це коуч</p>
          <div
            className={`${styles.fact_wrapper} ${styles.students} ${styles.hidden}`}
          >
            <p className={`${styles.fact}`}>
              500+
              <span>навчено студентів за останні 2 роки</span>
            </p>
          </div>
          <div
            className={`${styles.fact_wrapper} ${styles.subs} ${styles.hidden}`}
          >
            <p className={`${styles.fact}`}>
              30K
              <span>підписників</span>
            </p>
          </div>
          <div className={`${styles.fact_wrapper} ${styles.consulting} `}>
            <p className={` ${styles.consulting_pc} ${styles.fact}`}>
              200+
              <span>консультацій</span>
            </p>
          </div>
          <div
            className={`${styles.fact_wrapper} ${styles.money} ${styles.hidden}`}
          >
            <p className={`${styles.fact}`}>
              200K€
              <span>Оборот коштів</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
