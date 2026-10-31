import { Dispatch, SetStateAction } from "react";
import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
  isPrivacyAccepted: boolean;
  setIsPrivacyAccepted: Dispatch<SetStateAction<boolean>>;
}

const CheckBox = ({
  isPrivacyAccepted,
  setIsPrivacyAccepted,
}: CheckBoxProps) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={isPrivacyAccepted}
        onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
      />

      <span className={styles.checkboxIcon}>
        {isPrivacyAccepted ? (
          <svg viewBox="0 0 40 40" fill="none">
            <rect x="12" y="12" width="16" height="16" rx="1" fill="#E53935" />
            <path
              d="M16 20L19 23L25 17"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M13 12H27C27.5523 12 28 12.4477 28 13V27C28 27.5523 27.5523 28 27 28H13C12.4477 28 12 27.5523 12 27V13C12 12.4477 12.4477 12 13 12Z"
              stroke="#C9C5BE"
              strokeWidth="2"
            />
          </svg>
        )}
      </span>

      <span className={styles.text}>
        З Політикою конфіденційності згоден(на)
      </span>
    </label>
  );
};

export default CheckBox;
