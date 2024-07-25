import FloatingTerminal from "@/components/FloatingTerminal";
import { FloatingTerminalProps } from "@/components/FloatingTerminal";
import Image from "next/image";
import React from "react";
const AboutTermimal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal animation hasContentAbove {...rest}>
      <div className="flex flex-col gap-12">
        <section>
          <h2 className="mb-6 text-5xl text-slate-200">Background</h2>
          <p className="mb-6 text-[1.8rem] text-slate-400">
            I started my journey in software development in my sophmore year by
            falling in love with computer science by accident. My initial major
            was Technological Systems Management (TSM), which had the
            prerequisite to take Object Oriented Programming class.
          </p>
          <p className="mb-6 text-[1.8rem] text-slate-400">
            Taking this class changed my life. As I learn more about
            programming,{" "}
          </p>
          <p className="text-[1.8rem] text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            luctus venenatis lectus magna fringilla. Sodales neque sodales ut
            etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
            odio facilisis mauris sit amet massa.
          </p>
        </section>
        <section className="flex flex-col gap-12">
          <h2 className="text-5xl text-slate-200">Education</h2>
          <div className="flex gap-10">
            <Image
              src="/svg/stony-brook-logo.svg"
              width={80}
              height={0}
              className="h-auto"
              alt="stony-brook-logo"
            />
            <div>
              <h3 className="mb-[.8rem] text-3xl text-slate-300">
                Computer Science and Technological Systems Management
                (Bachelor's Degree)
              </h3>
              <h4 className="mb-[.8rem] text-[1.8rem] text-slate-400">
                Stony Brook University
              </h4>
              <p className="text-[1.8rem] text-slate-400">Graduated May 2022</p>
            </div>
          </div>
        </section>
      </div>
    </FloatingTerminal>
  );
};

export default AboutTermimal;
