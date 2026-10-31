import Instagram from "./Icons/Instagram";
import Mail from "./Icons/Mail";
import Telegram from "./Icons/Telegram";
import YouTube from "./Icons/YouTube";
import styles from "./Navigation.module.scss";

interface MenuNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  {
    name: "Facebook",
    href: "mailto:ankaborsh999@gmail.com",
    icon: <Mail />,
  },
];

const Navigation = ({ isOpen, onClose }: MenuNavigationProps) => {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlay_open : ""}`}
      aria-hidden={!isOpen}
      onClick={onClose}
      inert={!isOpen}
    >
      <nav
        id="mobile-menu"
        className={`${styles.navigation} ${
          isOpen ? styles.navigation_open : ""
        }`}
        aria-label="Main navigation"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <p className={styles.title}>ANKA BORSH</p>

          <button
            type="button"
            className={styles.close_button}
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <ul className={styles.list}>
          {navigationItems.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={onClose} className={styles.link}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a className={styles.cabinet}>
          Особистий кабінет{" "}
          <svg
            viewBox="0 0 23 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 15.75L21.75 8.25003L15.75 0.750031M21.75 8.25003H0.75"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#D60D21"
            />
          </svg>
        </a>
        <div className={styles.socials}>
          {socialLinks.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              aria-label={name}
            >
              {icon}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
