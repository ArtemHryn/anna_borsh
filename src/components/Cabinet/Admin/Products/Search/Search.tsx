"use client";

import { useEffect, useRef, useState } from "react";
import SearchIcon from "./Icons/SearchIcon";
import styles from "./Search.module.scss";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  return (
    <div className={`${styles.search} ${isOpen ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.button}
        aria-label={isOpen ? "Закрити пошук" : "Відкрити пошук"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <SearchIcon />
      </button>
      <div className={styles.field}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Пошук продуктів"
          aria-label="Пошук продуктів"
          tabIndex={isOpen ? 0 : -1}
        />
        {query && (
          <button
            type="button"
            className={styles.clearButton}
            aria-label="Очистити пошук"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
