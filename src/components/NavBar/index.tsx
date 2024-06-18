import Link from "next/link";
import React from "react";
import classNames from "classnames";
import styles from "@/styles/nav.module.scss";
const NavBar: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.container}>
          <Link href="/" className={classNames(styles.logo, styles.underline)}>
            <h1>Hasung Jun</h1>
          </Link>
          <ul className={styles.list}>
            <li className={classNames(styles["list-item"], styles.underline)}>
              <Link href="/">Home</Link>
            </li>
            <li className={classNames(styles["list-item"], styles.underline)}>
              <Link href="/about">About</Link>
            </li>
            <li className={classNames(styles["list-item"], styles.underline)}>
              <Link href="/projects">Projects</Link>
            </li>
            <li className={classNames(styles["list-item"], styles.underline)}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
