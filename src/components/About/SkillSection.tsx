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
      <div className="sticky left-0 top-0 flex h-svh w-full justify-center">
        <h2 className="h-fit px-8 py-40 text-8xl font-bold text-white md:min-w-[42rem] md:px-0">
          My skills
        </h2>
        <div className="absolute h-full w-full overflow-hidden">
          <div
            className="absolute top-1/2 flex items-center gap-24 ps-[calc(50%-10rem)] opacity-0 will-change-[transform,opacity]"
            style={{ transform: `matrix(1, 0, 0, 1, 0, ${OFFSET})` }}
            ref={skills}
          >
            <div className="relative h-auto w-[10rem] will-change-[transform]">
              <div
                role="tooltip"
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                Typescript
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                Javascript
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                GraphQL
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                Next.js
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                Node.js
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                React
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                Cascading Style Sheets
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                Tailwind CSS
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                Nest.js
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                MongoDB
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                SQL
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
                className="absolute bottom-[calc(100%+2rem)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-[#383838] px-6 py-4 text-2xl font-semibold text-white opacity-0 shadow-sm"
              >
                REST API
                <div
                  className="absolute left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 bg-inherit"
                  data-popper-arrow
                ></div>
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
