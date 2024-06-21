"use client";

import React, { useEffect } from "react";

import Image from "next/image";
import styles from "@/styles/resume.module.scss";

const Resume: React.FC = () => {
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      console.log(document.documentElement.scrollTop);
    });
  }, []);
  return (
    <>
      <section>
        <div className={styles.content}>
          <p style={{ fontSize: 40, color: "white" }}></p>
        </div>
      </section>
      <section className={styles["resume-wrap"]}>
        <div className={styles.resume}>
          <Image src="/resume-page-1.png" layout="fill" alt="resume-page-1" />
        </div>
        <div className={styles.resume}>
          <Image src="/resume-page-2.png" layout="fill" alt="resume-page-2" />
        </div>
      </section>
    </>
  );
};
export default Resume;
