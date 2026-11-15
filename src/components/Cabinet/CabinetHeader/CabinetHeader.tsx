import styles from "./CabinetHeader.module.scss";

interface CabinetHeaderProps {
  title: string;
  description: string;
}

const CabinetHeader = ({ title, description }: CabinetHeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
};

export default CabinetHeader;
