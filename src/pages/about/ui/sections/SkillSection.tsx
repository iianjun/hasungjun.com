import React, { useRef } from "react";

import Image from "next/image";
import { SKILLS } from "@/shared/config/skill";
import { cn } from "@/shared/lib";
import { useScrollTransform } from "@/pages/about/hooks/useScrollTransform";

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
            // 6.25rem is size of the first logo width so that it centers when it has full scale
            className="absolute top-2/3 left-[calc(50%+6.25rem)] flex -translate-y-1/2 items-center gap-15 pr-37.5 opacity-0 will-change-[transform,opacity] md:top-1/2"
            ref={skills}
          >
            {SKILLS.map((skill) => (
              <div
                key={skill.value}
                className={cn("relative h-auto will-change-[transform]", {
                  "w-25": skill.width === 100,
                  "w-32.5": skill.width === 130,
                  "w-37.5": skill.width === 150,
                })}
              >
                <div
                  role="tooltip"
                  className="bg-app-header-bg absolute bottom-[calc(100%+1.25rem)] left-1/2 z-10 -translate-x-1/2 rounded-[.625rem] px-4 py-[.625rem] opacity-0 shadow-sm will-change-[opacity]"
                >
                  <p className="z-[5] text-base font-semibold whitespace-nowrap text-white">
                    {skill.label}
                  </p>
                  <div className="border-t-app-header-bg absolute top-full left-1/2 z-[3] -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-r-transparent border-l-transparent" />
                </div>
                <Image
                  src={`/skills/${skill.value}.svg`}
                  width="0"
                  height="0"
                  className={cn("h-auto", {
                    "w-25": skill.width === 100,
                    "w-32.5": skill.width === 130,
                    "w-37.5": skill.width === 150,
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
