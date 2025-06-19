import FloatingTerminal from "@/components/FloatingTerminal";
import { FloatingTerminalProps } from "@/components/FloatingTerminal";
import Image from "next/image";
import React from "react";
const AboutTermimal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal {...rest}>
      <div className="flex flex-col gap-[1.875rem]">
        <section>
          <h2 className="mb-4 text-[1.375rem] text-slate-100 md:text-[1.875rem]">
            Background
          </h2>
          <p className="mb-4 text-base text-slate-400 md:text-lg">
            I started my journey in software development in my sophmore year by
            falling in love with computer science by accident. My initial major
            was Technological Systems Management (TSM), which had the
            prerequisite to take Object Oriented Programming class.
          </p>
          <p className="mb-4 text-base text-slate-400 md:text-lg">
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
        <section className="flex flex-col gap-[1.375rem]">
          <h2 className="text-[1.375rem] text-slate-100 md:text-[1.875rem]">
            Education
          </h2>
          <div className="flex items-start gap-6 md:items-center">
            <Image
              src="/svg/stony-brook-logo.svg"
              priority
              width={"0"}
              height={"0"}
              className="mt-3 h-auto w-[3.75rem] md:mt-0"
              alt="stony-brook-logo"
            />
            <div>
              <h3 className="mb-1 text-base text-slate-200 md:mb-2 md:text-lg">
                <span>Computer Science</span>{" "}
                <span className="invisible md:visible"> · </span>{" "}
                <span className="block md:inline">
                  Technological Systems Management
                </span>
              </h3>
              <h4 className="mb-1 text-base text-slate-400 md:mb-2 md:text-lg">
                Stony Brook University
              </h4>
              <p className="mb-1 text-base text-slate-400 md:mb-2 md:text-lg">
                Bachelor's Degree
              </p>
              <p className="text-base text-slate-400 md:text-lg">
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
