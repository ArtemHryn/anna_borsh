"use client";

import { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import Navigation from "./Navigation/Navigation";

const Menu = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const closeMenu = () => setShowModal(false);

  return (
    <>
      {" "}
      <button
        className={`${styles.menu_button}`}
        onClick={() => setShowModal(true)}
        aria-label="Open menu"
        aria-expanded={showModal}
        aria-controls="mobile-menu"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.125 18.375H19.875M4.125 12.375H19.875M4.125 6.375H19.875"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Navigation isOpen={showModal} onClose={closeMenu} />
    </>
  );
};

export default Menu;
