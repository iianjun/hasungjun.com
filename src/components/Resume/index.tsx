"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "@/styles/resume.module.scss";
import { useIsInViews } from "@/hooks/useIsInViews";

const Resume: React.FC = () => {
  const [mounted, setMounted] = useState({ resume: false, links: false });
  const refs = useRef([
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]);
  const [education, experience, projects, skills] = useIsInViews(
    ...refs.current,
  );
  useEffect(() => {
    setMounted({ resume: true, links: true });
  }, []);

  return (
    <>
      <section>
        <div className={styles.content}>
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
      <section className="relative w-full">
        <div className={styles.container}>
          <div
            className={classNames(styles["img-wrap"], {
              [styles.active]: mounted.resume,
              "!translate-y-[calc(100vh-25%)]": education && !experience,
              "!translate-y-[calc(100vh-61%)]": experience && !projects,
              "!translate-y-[calc(100vh-82%)]": projects && !skills,
              "!translate-y-[calc(100vh-98%)]": skills,
            })}
          >
            <Image
              src="/resume.png"
              width={720}
              height="0"
              alt="resume-image"
              priority
              quality={100}
            />
          </div>
        </div>
        <div className="h-[150vh]"></div>
        <div className="h-[100vh]" ref={refs.current[0]}></div>
        <div className="h-[100vh]" ref={refs.current[1]}></div>
        <div className="h-[100vh]" ref={refs.current[2]}></div>
        <div className="h-[100vh]" ref={refs.current[3]}></div>
      </section>
    </>
  );
};
export default Resume;
