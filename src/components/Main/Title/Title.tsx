import styles from "./Title.module.scss";

interface TitleProps {
  title: string;
  dark?: boolean;
  styled?: string;
}

const Title = ({ title, dark = false, styled = "" }: TitleProps) => {
  return (
    <h1 className={`${styles.title} ${dark ? styles.dark : ""} ${styled}`}>
      {title ? title : ""}
    </h1>
  );
};

export default Title;
