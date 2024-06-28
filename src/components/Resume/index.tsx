"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "@/styles/resume.module.scss";

const Resume: React.FC = () => {
  const [maxScrollValue, setMaxScrollValue] = useState(0);
  const [mounted, setMounted] = useState({ resume: false, links: false });

  useEffect(() => {
    const calculateMaxScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setMaxScrollValue(Math.round((scrollHeight - clientHeight) * 0.9));
    };
    calculateMaxScroll();

    window.addEventListener("scroll", (e) => {
      console.log(document.documentElement.scrollTop);
    });
    window.addEventListener("resize", calculateMaxScroll);
    setMounted({ resume: true, links: true });
    return () => {
      window.removeEventListener("resize", calculateMaxScroll);
    };
  }, []);

  return (
    <>
      <section>
        <div className={styles.content}>
          <p style={{ fontSize: 40, color: "white" }}>
            Hello! My name is Hassung Jun, also go by Ian.
          </p>
          <aside>
            <div
              className={classNames(styles.links, {
                [styles.visible]: mounted.links,
              })}
            >
              <Link
                className={styles.download}
                href="/resume_hasung_jun.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={30}
                  height={30}
                  src={"/svg/download.svg"}
                  alt="download"
                />
              </Link>
              <Link
                className={styles.github}
                href="https://github.com/iianjun"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={30}
                  height={30}
                  src={"/svg/github.svg"}
                  alt="github"
                />
              </Link>
              <Link
                className={styles.linkedin}
                href="https://www.linkedin.com/in/hasungjun/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={30}
                  height={30}
                  src={"/svg/linkedin.svg"}
                  alt="linkedin"
                />
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <section>
        <div
          className={classNames(styles.resume, {
            [styles.visible]: mounted.resume,
          })}
        >
          <Image
            src="/resume.png"
            layout="fill"
            alt="resume-image"
            priority
            quality={100}
          />
        </div>
      </section>
    </>
  );
};
export default Resume;
