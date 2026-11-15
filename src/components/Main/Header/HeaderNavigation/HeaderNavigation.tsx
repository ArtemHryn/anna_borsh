"use client";

import { useState } from "react";
import styles from "./HeaderNavigation.module.scss";
import Arrow from "./Icons/Arrow";
import Instagram from "./Icons/Instagram";
import Login from "./Icons/Login";
import Telegram from "./Icons/Telegram";
import YouTube from "./Icons/YouTube";

const navigationItems = [
  { label: "Продукти", href: "#products" },
  { label: "Кейси", href: "#cases" },
  { label: "Амбасадорам", href: "#contacts" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/coach_anka.borsh",
    icon: <Instagram />,
  },

  {
    name: "YouTube",
    href: "https://youtube.com/@coach_anka.borsh9?si=QSSFno_VHJDALPP-",
    icon: <YouTube />,
  },
  {
    name: "TikTok",
    href: "https://t.me/borsh_and_friends",
    icon: <Telegram />,
  },
];

const HeaderNavigation = () => {
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  return (
    <>
      <>
        <ul className={styles.list}>
          {navigationItems.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.link}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <>
            {" "}
            <div
              className={`${styles.social} ${isSocialOpen ? styles.socialOpen : ""}`}
            >
              <ul className={styles.soc_links_list}>
                {socialLinks.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.social_link}
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsSocialOpen((prev) => !prev)}
                className={styles.open_btn}
                aria-expanded={isSocialOpen}
              >
                <Arrow />
              </button>
            </div>
          </>
          <a href="/login" className={styles.login}>
            <Login />
          </a>
        </div>
      </>
    </>
  );
};

export default HeaderNavigation;
