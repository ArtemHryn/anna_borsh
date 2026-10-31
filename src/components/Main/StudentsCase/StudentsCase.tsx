import Container from "@/components/Common/Container/Container";
import SectionHeader from "@/components/Common/SectionHeader/SectionHeader";
import Title from "../Title/Title";

import styles from "./StudentsCase.module.scss";

const StudentsCase = () => {
  return (
    <Container>
      <SectionHeader left="04 / КЕЙСИ СТУДЕНТІВ" right="04" />
      <div>
        <div className={styles.text_wrapper}>
          <Title dark={true} title="Кейси Студентів" />
          <p className={styles.about}>
            Історії студентів: від перших кроків до розвитку власного блогу.
          </p>
        </div>
      </div>
      <div></div>
    </Container>
  );
};

export default StudentsCase;
