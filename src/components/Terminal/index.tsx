"use client";

import React from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import localFont from "next/font/local";
import styles from "@/styles/terminal.module.scss";
import useTypedText from "@/hooks/useTypedText";
const d2coding = localFont({
  src: "../../app/D2Coding.woff2",
});
const day = dayjs().format("ddd MMM DD hh:mm:ss");
const Terminal: React.FC = () => {
  const { typedText, done } = useTypedText(`Last login: ${day}`, 50);
  return (
    <div className={classNames(styles.container, d2coding.className)}>
      <div className={styles.header}>
        <div className="flex gap-[.8rem]">
          <div className={classNames(styles.btn, "bg-[#ed6a5e]")}></div>
          <div className={classNames(styles.btn, "bg-[#f5bf4f]")}></div>
          <div className={classNames(styles.btn, "bg-[#61c454]")}></div>
        </div>
        <h6 className="text-[1.4rem] text-[#b4b4b4] absolute left-1/2 -translate-x-1/2">
          hasungjun
        </h6>
      </div>
      <p
        className={classNames(styles.text, {
          [styles["with-cursor"]]: !done,
        })}
      >
        {typedText}
      </p>
      <input />
    </div>
  );
};
export default Terminal;
