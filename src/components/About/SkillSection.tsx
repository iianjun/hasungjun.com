import React, { useRef } from "react";

import Image from "next/image";
import { useScrollTransform } from "@/hooks/useScrollTransform";

const OFFSET = 484;

const SkillSection = () => {
  const section = useRef<HTMLDetailsElement>(null);
  const skills = useRef<HTMLDivElement>(null);

  useScrollTransform({ num: 12, stuckOffset: OFFSET }, [section, skills]);

  return (
    <section className="h-[500svh] w-screen" ref={section}>
      <div className="sticky left-0 top-0 flex h-svh w-full md:justify-center">
        <div className="flex flex-col gap-[1.6rem] px-8 py-30 md:min-w-[42rem] md:px-0 md:py-40">
          <h2 className="h-fit text-6xl font-bold text-white md:text-8xl">
            Skills
          </h2>
          <h3 className="text-3xl font-semibold text-slate-400 md:text-4xl">
            <h3 className="text-3xl font-semibold text-slate-400 md:text-4xl">
              Expertise and Tools
            </h3>
          </h3>
        </div>
        <div className="absolute h-full w-full overflow-hidden">
          <div
            className="absolute top-1/2 flex items-center gap-24 ps-[calc(50%+15rem)] opacity-0 will-change-[transform,opacity] md:ps-[calc(50%+10rem)]"
            style={{ transform: `matrix(1, 0, 0, 1, 0, ${OFFSET})` }}
            ref={skills}
          >
            <div className="relative h-auto w-[10rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                Typescript
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/typescript-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[10rem]"
                alt="typescript-logo"
              />
            </div>
            <div className="relative h-auto w-[10rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                Javascript
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/javascript-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[10rem]"
                alt="javascript-logo"
              />
            </div>
            <div className="relative h-auto w-[10rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                GraphQL
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/graphql-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[10rem]"
                alt="graphql-logo"
              />
            </div>
            <div className="relative h-auto w-[13rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                Next.js
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/nextjs-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[13rem]"
                alt="nextjs-logo"
              />
            </div>
            <div className="relative h-auto w-[13rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                Node.js
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/nodejs-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[13rem]"
                alt="nodejs-logo"
              />
            </div>
            <div className="relative h-auto w-[10rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                React
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/react-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[10rem]"
                alt="react-logo"
              />
            </div>
            <div className="relative h-auto w-[10rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                Cascading Style Sheets
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/css-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[10rem]"
                alt="css-logo"
              />
            </div>
            <div className="relative h-auto w-[15rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                Tailwind CSS
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/tailwindcss-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[15rem]"
                alt="tailwindcss-logo"
              />
            </div>
            <div className="relative h-auto w-[10rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                Nest.js
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/nestjs-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[10rem]"
                alt="nestjs-logo"
              />
            </div>

            <div className="relative h-auto w-[15rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                MongoDB
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/mongodb-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[15rem]"
                alt="mongodb-logo"
              />
            </div>
            <div className="relative h-auto w-[12rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                SQL
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/sql-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[12rem]"
                alt="sql-logo"
              />
            </div>
            <div className="relative h-auto w-[10rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm will-change-[opacity]"
              >
                REST API
                <div className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit" />
              </div>
              <Image
                src="/skills/rest-api-logo.svg"
                width="0"
                height="0"
                className="h-auto w-[10rem]"
                alt="rest-api-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
