import Link from "next/link";
import styles from "./Logo.module.scss";

const Logo = ({ type }: { type: string }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.out_circle}>
        <svg className={styles.textRing} viewBox="0 0 96 96" aria-hidden="true">
          <defs>
            <path id="logo-text-circle" d="M 12,63 a 38,38 0 0,0 72,0" />
          </defs>
          <text>
            <textPath
              href="#logo-text-circle"
              startOffset="50%"
              textAnchor="middle"
            >
              {type === "admin" ? "Адміністратор" : "Студент"}
            </textPath>
          </text>
        </svg>
        <Link href={"/"} className={styles.link}>
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.6654 9.33333C22.6654 13.0152 19.6806 16 15.9987 16C12.3168 16 9.33203 13.0152 9.33203 9.33333C9.33203 5.65143 12.3168 2.66666 15.9987 2.66666C19.6806 2.66666 22.6654 5.65143 22.6654 9.33333Z"
              strokeWidth="3.33333"
              stroke="white"
            />
            <path
              d="M22.6661 18.6667H23.1354C24.1102 18.6669 25.0513 19.0232 25.782 19.6684C26.5126 20.3136 26.9826 21.2034 27.1034 22.1707L27.6248 26.336C27.6717 26.7112 27.6382 27.0922 27.5266 27.4535C27.415 27.8148 27.2279 28.1483 26.9776 28.4317C26.7273 28.7152 26.4196 28.9422 26.0748 29.0976C25.7301 29.2531 25.3563 29.3334 24.9781 29.3333H7.02076C6.64261 29.3334 6.26876 29.2531 5.92402 29.0976C5.57929 28.9422 5.27156 28.7152 5.02126 28.4317C4.77096 28.1483 4.58381 27.8148 4.47224 27.4535C4.36066 27.0922 4.32721 26.7112 4.3741 26.336L4.8941 22.1707C5.01503 21.203 5.48532 20.3128 6.21654 19.6675C6.94776 19.0222 7.88953 18.6663 8.86476 18.6667H9.33276"
              strokeWidth="3.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="white"
            />
          </svg>
        </Link>
      </div>
      <p className={styles.role}>
        {type === "admin" ? "Адміністратор сайту" : "Студент"}
      </p>
    </div>
  );
};

export default Logo;
