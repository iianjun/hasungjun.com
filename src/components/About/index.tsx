"use client";

import React, { useRef } from "react";

import AboutTerminal from "@/components/Terminal/AboutTerminal";
import classNames from "classnames";
import { useIsInViews } from "@/hooks/useIsInViews";

const About = () => {
  const main = useRef<HTMLDetailsElement>(null);
  const about = useRef<HTMLDivElement>(null);
  const experience = useRef<HTMLDivElement>(null);
  const projects = useRef<HTMLDivElement>(null);
  const skills = useRef<HTMLDivElement>(null);
  const isInViews = useIsInViews(main, about, experience, projects, skills);

  return (
    <>
      <section>
        <AboutTerminal visible={isInViews[1]} />
      </section>
      <div className="grid grid-cols-2 gap-6">
        <section
          className="sticky top-0 flex max-h-screen flex-col justify-between px-6 py-32"
          ref={main}
        >
          <div className="flex flex-col gap-[1.6rem]">
            <h1
              data-text-animation
              className={classNames("text-8xl font-bold text-slate-200", {
                "translate-y-10 opacity-0": !isInViews[0],
                "translate-y-0 opacity-100": isInViews[0],
              })}
            >
              Hasung Jun
            </h1>
            <h2
              data-text-animation
              className={classNames(
                "text-[2.4rem] font-semibold text-slate-400 !delay-200",
                {
                  "translate-y-10 opacity-0": !isInViews[0],
                  "translate-y-0 opacity-100": isInViews[0],
                },
              )}
            >
              Frontend Developer
            </h2>
            <p
              data-text-animation
              className={classNames(
                "max-w-2xl text-[1.8rem] text-slate-500 !delay-500",
                {
                  "translate-y-10 opacity-0": !isInViews[0],
                  "translate-y-0 opacity-100": isInViews[0],
                },
              )}
            >
              I'm a passionate front-end software engineer focused on building
              efficient and user-centric applications. As a continuous and fast
              learner, I'm always excited to discover something new.
            </p>
          </div>
        </section>
        <div className="px-6">
          {/* About me */}
          <div className={"flex h-svh items-center"} ref={about}>
            <div
              data-text-animation
              className={classNames("flex flex-col gap-6", {
                "translate-y-10 opacity-0": !isInViews[1],
                "translate-y-0 opacity-100": isInViews[1],
              })}
            >
              <p className="text-[1.8rem] text-slate-500">
                I started my journey in software development in my sophmore year
                by falling in love with computer science by accident. My initial
                major was Technological Systems Management (TSM), which had the
                prerequisite to take Object Oriented Programming class.
              </p>
              <p className="text-[1.8rem] text-slate-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-[1.8rem] text-slate-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
                amet luctus venenatis lectus magna fringilla. Sodales neque
                sodales ut etiam sit. Egestas congue quisque egestas diam.
                Sagittis eu volutpat odio facilisis mauris sit amet massa.
              </p>
            </div>
          </div>
          {/* Experience */}
          <div className="flex h-svh flex-col justify-center" ref={experience}>
            <h1 className="text-4xl font-bold text-white">Content</h1>
          </div>
          {/* Projects */}
          <div className="flex h-svh flex-col justify-center" ref={projects}>
            <h1 className="text-4xl font-bold text-white">Content</h1>
          </div>
          {/* Skills */}
          <div className="flex h-svh flex-col justify-center" ref={skills}>
            <h1 className="text-4xl font-bold text-white">Content</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
