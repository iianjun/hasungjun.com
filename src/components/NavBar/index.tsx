import Link from "next/link";
import React from "react";
import styles from "@/styles/nav.module.scss";
const NavBar: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <h1>Hasung Jun</h1>
          </Link>
          <ul className={styles.list}>
            <li className={styles["list-item"]}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles["list-item"]}>
              <Link href="/about">About</Link>
            </li>
            <li className={styles["list-item"]}>
              <Link href="/projects">Projects</Link>
            </li>
            <li className={styles["list-item"]}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
