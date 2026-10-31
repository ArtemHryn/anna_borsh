import Instagram from "../../Header/HeaderNavigation/Icons/Instagram";
import Telegram from "../../Header/HeaderNavigation/Icons/Telegram";
import YouTube from "../../Header/HeaderNavigation/Icons/YouTube";
import Mail from "../Icons/Mail";

import styles from "./SocialList.module.scss";

const SocialList = () => {
  return (
    <>
      <ul className={styles.list}>
        <li>
          <a
            href="https://www.instagram.com/coach_anka.borsh"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <Instagram /> <span>@coach_anka.borsh</span>
          </a>
        </li>
        <li>
          <a
            href="https://youtube.com/@coach_anka.borsh9?si=QSSFno_VHJDALPP-"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {" "}
            <YouTube />
            <span>Youtube «Філософія Борща»</span>
          </a>
        </li>
        <li>
          <a
            href="https://t.me/borsh_and_friends"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <Telegram /> <span>Канал «Філософія Борща»</span>
          </a>
        </li>
        <li>
          <a
            href="mailto:ankaborsh999@gmail.com"
            target="_blank"
            className={styles.link}
          >
            <Mail />
            <span>ankaborsh999@gmail.com</span>
          </a>
        </li>
      </ul>
    </>
  );
};

export default SocialList;
