import styles from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  styled?: string;
  styledSec?: string;
}

const Container = ({
  children,
  styled = "",
  styledSec = "",
}: ContainerProps) => {
  return (
    <section className={`${styles.section} ${styledSec}`}>
      <div className={`${styles.container} ${styled}`}>{children}</div>
    </section>
  );
};

export default Container;
