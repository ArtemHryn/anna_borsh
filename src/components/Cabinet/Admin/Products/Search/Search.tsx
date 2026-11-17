"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import SearchIcon from "./Icons/SearchIcon";
import styles from "./Search.module.scss";

interface SearchProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const Search = ({ query, setQuery }: SearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        setQuery(value);

        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }

        const query = params.toString();
        router.replace(query ? `?${query}` : "?");
      }, 500),
    [searchParams, router, setQuery],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  };

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

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
          value={inputValue}
          onChange={handleChange}
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
