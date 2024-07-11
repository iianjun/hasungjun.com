import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/dock.module.scss";

const BottomNavBar: React.FC<{ position?: "left" | "bottom" }> = ({
  position = "bottom",
}) => {
  return (
    <nav
      id="nav-dock"
      className={position === "bottom" ? "nav-bottom" : "nav-left"}
    >
      <ul className={styles.list}>
        <li>
          <div className={styles.item}>
            <Link href="/">
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-terminal.svg"
                alt="terminal"
              />
            </Link>
            <span className={styles.tooltip} role="tooltip">
              Terminal
            </span>
          </div>
        </li>
        <li>
          <div className={styles.item}>
            <Link href="/about">
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/dock-about.png"
                alt="about-me"
              />
            </Link>
            <span className={styles.tooltip} role="tooltip">
              About
            </span>
          </div>
        </li>
        <li>
          <div className={styles.item}>
            <Link href="/resume">
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-resume.svg"
                alt="resume"
              />
            </Link>
            <span className={styles.tooltip} role="tooltip">
              Resume
            </span>
          </div>
        </li>
        <li>
          <div className={styles.item}>
            <Link href="/contact">
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-contact.svg"
                alt="contact"
              />
            </Link>
            <span className={styles.tooltip} role="tooltip">
              Contact
            </span>
          </div>
        </li>
        <li>
          <div className={styles.item}>
            <Link
              href="https://www.linkedin.com/in/hasungjun/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-linkedin.svg"
                alt="linkedin"
              />
            </Link>
            <span className={styles.tooltip} role="tooltip">
              LinkedIn
            </span>
          </div>
        </li>
        <li>
          <div className={styles.item}>
            <Link
              href="https://github.com/iianjun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width="50"
                height="0"
                className="h-full w-full"
                src="/svg/dock-github.svg"
                alt="github"
              />
            </Link>
            <span className={styles.tooltip} role="tooltip">
              GitHub
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavBar;
