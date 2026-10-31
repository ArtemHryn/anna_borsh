import styles from "./SectionHeader.module.scss";

interface SectionHeaderProps {
  left: string;
  right: string;
  light?: boolean;
}

const SectionHeader = ({ left, right, light = false }: SectionHeaderProps) => {
  return (
    <div className={styles.header_wrapper}>
      <p className={`${styles.header} ${light ? styles.light : ""}`}>{left}</p>
      <p className={`${styles.header} ${light ? styles.light : ""}`}>{right}</p>
    </div>
  );
};

export default SectionHeader;
