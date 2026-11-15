"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.scss";

interface NavigationProps {
  navList: { name: string; href: string }[];
}

const Navigation = ({ navList }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <ul className={styles.list}>
      {navList.map(({ name, href }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <li key={href}>
            <Link
              href={href}
              className={`${styles.link}${isActive ? ` ${styles.active}` : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
