import React, { useRef } from "react";

import Image from "next/image";
import { SKILLS } from "@/constants/skill";
import classNames from "classnames";
import { useScrollTransform } from "@/hooks/useScrollTransform";

const OFFSET = 484;

const SkillSection = () => {
  const section = useRef<HTMLDetailsElement>(null);
  const skills = useRef<HTMLDivElement>(null);

  useScrollTransform({ num: 12, stuckOffset: OFFSET }, [section, skills]);

  return (
    <section className="h-[500svh] w-screen" ref={section}>
      <div className="sticky left-0 top-0 flex h-svh w-full md:justify-center">
        <div className="flex flex-col gap-[1.6rem] px-10 py-30 md:min-w-[42rem] md:px-0 md:py-20">
          <h2 className="h-fit animate-fade-in-up text-6xl font-bold text-white md:text-8xl">
            Skills
          </h2>
          <h3 className="animate-delay-200 animate-fade-in-up text-3xl font-semibold text-slate-400 opacity-0 md:text-4xl">
            Expertise and Tools
          </h3>
        </div>
        <div className="absolute h-full w-full overflow-hidden">
          <div
            className="absolute top-1/2 flex items-center gap-24 ps-[calc(50%+15rem)] opacity-0 will-change-[transform,opacity] md:ps-[calc(50%+10rem)]"
            style={{ transform: `matrix(1, 0, 0, 1, 0, ${OFFSET})` }}
            ref={skills}
          >
            {SKILLS.map((skill) => (
              <div
                key={skill.value}
                className={classNames(
                  "relative h-auto will-change-[transform]",
                  skill.className,
                )}
              >
                <div
                  role="tooltip"
                  className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
                >
                  {skill.label}
                  <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
                </div>
                <Image
                  src={`/skills/${skill.value}.svg`}
                  width="0"
                  height="0"
                  className={classNames("h-auto", skill.className)}
                  alt={`${skill.value}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
