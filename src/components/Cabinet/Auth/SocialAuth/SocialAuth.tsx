"use client";

import { signIn } from "next-auth/react";
import styles from "./SocialAuth.module.scss";

const SocialAuth = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>або увійдіть через</p>
      <div className={styles.buttons_wrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={() => signIn("google", { redirectTo: "/login" })}
          aria-label="Увійти через Google"
          title="Увійти через Google"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M21.456 10.154C21.579 10.813 21.646 11.502 21.646 12.221C21.646 17.845 17.882 21.844 12.197 21.844C10.9041 21.8445 9.62384 21.5903 8.42927 21.0957C7.2347 20.6012 6.1493 19.8761 5.2351 18.9619C4.32089 18.0477 3.59581 16.9623 3.10129 15.7678C2.60677 14.5732 2.3525 13.2929 2.35303 12C2.3525 10.7071 2.60677 9.42682 3.10129 8.23225C3.59581 7.03768 4.32089 5.95228 5.2351 5.03807C6.1493 4.12387 7.2347 3.39879 8.42927 2.90427C9.62384 2.40974 10.9041 2.15548 12.197 2.15601C14.855 2.15601 17.076 3.13401 18.78 4.72201L16.005 7.49701V7.49001C14.972 6.50601 13.661 6.00101 12.197 6.00101C8.94903 6.00101 6.30903 8.74501 6.30903 11.994C6.30903 15.243 8.94903 17.993 12.197 17.993C15.144 17.993 17.15 16.307 17.562 13.993H12.197V10.154H21.456Z"
              fill="#595958"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;
