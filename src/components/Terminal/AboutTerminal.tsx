import FloatingTerminal from "@/components/FloatingTerminal";
import { FloatingTerminalProps } from "@/components/FloatingTerminal";
import Image from "next/image";
import React from "react";
const AboutTermimal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal animation {...rest}>
      <div className="flex flex-col gap-12">
        <section>
          <h2 className="mb-6 text-4xl text-slate-100 md:text-5xl">
            Background
          </h2>
          <p className="mb-6 text-[1.6rem] text-slate-400 md:text-[1.8rem]">
            I started my journey in software development in my sophmore year by
            falling in love with computer science by accident. My initial major
            was Technological Systems Management (TSM), which had the
            prerequisite to take Object Oriented Programming class.
          </p>
          <p className="mb-6 text-[1.6rem] text-slate-400 md:text-[1.8rem]">
            Taking this class changed my life. The more I learned about
            programming, the more I realized this was what I wanted to do for
            the rest of my life. That one simple class became a turning point
            for me. Each line of code was like solving a puzzle, and the sense
            of accomplishment I felt when a program worked seamlessly was
            incredibly rewarding. The creative process of building something
            from scratch, along with the logical problem-solving aspect, sparked
            a passion that has driven me ever since.
          </p>
        </section>
        <section className="flex flex-col gap-12">
          <h2 className="text-4xl text-slate-100 md:text-5xl">Education</h2>
          <div className="flex items-start gap-10 md:items-center">
            <Image
              src="/svg/stony-brook-logo.svg"
              width={60}
              height={0}
              className="mt-5 h-auto md:mt-0"
              alt="stony-brook-logo"
            />
            <div>
              <h3 className="mb-[.8rem] text-[1.6rem] text-slate-200 md:text-[1.8rem]">
                <span>Computer Science</span>{" "}
                <span className="invisible md:visible"> · </span>{" "}
                <span className="block md:inline">
                  Technological Systems Management
                </span>
              </h3>
              <h4 className="mb-[.8rem] text-[1.6rem] text-slate-400 md:text-[1.8rem]">
                Stony Brook University
              </h4>
              <p className="mb-[.8rem] text-[1.6rem] text-slate-400 md:text-[1.8rem]">
                Bachelor's Degree
              </p>
              <p className="text-[1.6rem] text-slate-400 md:text-[1.8rem]">
                Graduated May 2022
              </p>
            </div>
          </div>
        </section>
      </div>
    </FloatingTerminal>
  );
};

export default AboutTermimal;
