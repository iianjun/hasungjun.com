import React, { useRef } from "react";

import Image from "next/image";
import { SKILLS } from "@/constants/skill";
import { cn } from "@/utils/cn";
import { useScrollTransform } from "@/hooks/useScrollTransform";

const SkillSection = () => {
  const section = useRef<HTMLDetailsElement>(null);
  const skills = useRef<HTMLDivElement>(null);

  useScrollTransform({ num: SKILLS.length }, [section, skills]);

  return (
    <section className="h-[500svh] w-screen" ref={section}>
      <div className="sticky top-0 left-0 flex h-svh w-full md:justify-center">
        <div className="flex flex-col gap-4 px-[2.5rem] py-[4.75rem] md:min-w-[26.25rem] md:px-0 md:py-[3.125rem] lg:py-10">
          <h2 className="animate-fade-in-up h-fit text-4xl font-bold text-slate-200 md:text-6xl">
            Skills
          </h2>
          <p className="animate-delay-200 animate-fade-in-up translate-y-6 text-lg font-semibold text-slate-400 opacity-0 md:text-xl">
            Expertise and Tools
          </p>
        </div>
        <div className="absolute h-full w-full overflow-hidden">
          <div
            // 3.125rem is half size of the first logo width so that it starts from the middle of the first logo
            className="absolute top-1/2 left-[calc(50%-3.125rem)] flex -translate-y-1/2 items-center gap-15 opacity-0 will-change-[transform,opacity]"
            ref={skills}
          >
            {SKILLS.map((skill) => (
              <div
                key={skill.value}
                className={cn("relative h-auto will-change-[transform]", {
                  "w-[6.25rem]": skill.width === 100,
                  "w-[8.125rem]": skill.width === 130,
                  "w-[9.375rem]": skill.width === 150,
                })}
              >
                <div
                  role="tooltip"
                  className="absolute bottom-[calc(100%+1.25rem)] left-1/2 z-10 -translate-x-1/2 rounded-[.625rem] bg-[#383838] px-4 py-[.625rem] opacity-0 shadow-sm will-change-[opacity]"
                >
                  <p className="z-[5] text-base font-semibold whitespace-nowrap text-white">
                    {skill.label}
                  </p>
                  <div className="absolute top-full left-1/2 z-[3] -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-t-[#383838] border-r-transparent border-l-transparent" />
                </div>
                <Image
                  src={`/skills/${skill.value}.svg`}
                  width="0"
                  height="0"
                  className={cn("h-auto", {
                    "w-[6.25rem]": skill.width === 100,
                    "w-[8.125rem]": skill.width === 130,
                    "w-[9.375rem]": skill.width === 150,
                  })}
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
