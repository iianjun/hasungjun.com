import { FloatingTerminal, type FloatingTerminalProps } from "@/shared/ui";

import Link from "next/link";
import React from "react";
const ExperienceTerminal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal {...rest}>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="text-base font-medium text-white">
              May 2022 — March 2025
            </h2>
            <p className="hidden text-base text-slate-400 md:block">
              Full-Stack developer
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-base text-white">WorkOnward</h3>
            <div className="visible inline-flex items-center gap-2 md:invisible">
              <span className="text-[.75rem] text-slate-300">|</span>
              <p className="text-base text-slate-400">Full-Stack developer</p>
            </div>
          </div>
          <p className="text-base text-slate-400">
            Build and maintain critical frontend UIs using React and Next.js.
            Worked closely with design team to implement and deliver better UX.
            Developed and maintained RESTful APIs and GraphQL using Node.js and
            Fastify to ensure seamless communication between the frontend and
            backend systems while integrating MongoDB for efficient data storage
            and optimizing queries to enhance application performance.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="text-base font-medium text-white">
              November 2023 - May 2024
            </h2>
            <p className="hidden text-base text-slate-400 md:block">
              Frontend developer
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-base text-white">Soft Squared</h3>
            <div className="visible inline-flex items-center gap-2 md:invisible">
              <span className="text-[.75rem] text-slate-300">|</span>
              <p className="text-base text-slate-400">Frontend developer</p>
            </div>
          </div>
          <p className="text-base text-slate-400">
            Build and styled interactive e-commerce web apps, inclduing the
            order management user interface and product management system in the
            admin page using Next.js, Typescript, and Tailwind CSS.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h2 className="text-base font-medium text-white">
              June 2021 - July 2021
            </h2>
            <p className="hidden text-base text-slate-400 md:block">
              Frontend developer (Contract)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-base text-white">Moornomo</h3>
            <div className="visible inline-flex items-center gap-2 md:invisible">
              <span className="text-[.75rem] text-slate-300">|</span>
              <p className="text-base text-slate-400">Frontend developer</p>
            </div>
          </div>
          <p className="text-base text-slate-400">
            Developed production code for client websites including electronic
            document management system using React and Redux and 3D viewer using{" "}
            <Link
              href="https://www.itwinjs.org"
              className="text-link underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              iTwin.js
            </Link>
            .
          </p>
        </section>
      </div>
    </FloatingTerminal>
  );
};

export default ExperienceTerminal;
