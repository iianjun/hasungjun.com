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
            Taking this class changed my life. As I learn more about
            programming,
          </p>
          <p className="text-[1.6rem] text-slate-400 md:text-[1.8rem]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            luctus venenatis lectus magna fringilla. Sodales neque sodales ut
            etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
            odio facilisis mauris sit amet massa.
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
