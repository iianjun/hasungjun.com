import FloatingTerminal from "@/components/FloatingTerminal";
import { FloatingTerminalProps } from "@/components/FloatingTerminal";
import Link from "next/link";
import React from "react";
const ExperienceTerminal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal {...rest}>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="text-[1.6rem] font-medium text-white">
              May 2022 — Present
            </h2>
            <p className="hidden text-[1.6rem] text-slate-400 md:block">
              Full-Stack developer
            </p>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-[1.6rem] text-white">WorkOnward</h3>
            <div className="visible inline-flex items-center gap-3 md:invisible">
              <span className="text-[1.2rem] text-slate-300">|</span>
              <p className="text-[1.6rem] text-slate-400">
                Full-Stack developer
              </p>
            </div>
          </div>
          <p className="text-[1.6rem] text-slate-400">
            Build and maintain critical frontend UIs using React and Next.js.
            Worked closely with design team to implement and deliver better UX.
            Developed and maintained RESTful APIs and GraphQL using Node.js and
            Fastify to ensure seamless communication between the frontend and
            backend systems while integrating MongoDB for efficient data storage
            and optimizing queries to enhance application performance.
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="text-[1.6rem] font-medium text-white">
              November 2023 - May 2024
            </h2>
            <p className="hidden text-[1.6rem] text-slate-400 md:block">
              Frontend developer
            </p>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-[1.6rem] text-white">Soft Squared</h3>
            <div className="visible inline-flex items-center gap-3 md:invisible">
              <span className="text-[1.2rem] text-slate-300">|</span>
              <p className="text-[1.6rem] text-slate-400">Frontend developer</p>
            </div>
          </div>
          <p className="text-[1.6rem] text-slate-400">
            Build and styled interactive e-commerce web apps, inclduing the
            order management user interface and product management system in the
            admin page using Next.js, Typescript, and Tailwind CSS.
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="text-[1.6rem] font-medium text-white">
              June 2021 - July 2021
            </h2>
            <p className="hidden text-[1.6rem] text-slate-400 md:block">
              Frontend developer
            </p>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-[1.6rem] text-white">Moornomo</h3>
            <div className="visible inline-flex items-center gap-3 md:invisible">
              <span className="text-[1.2rem] text-slate-300">|</span>
              <p className="text-[1.6rem] text-slate-400">Frontend developer</p>
            </div>
          </div>
          <p className="text-[1.6rem] text-slate-400">
            Developed production code for client websites including electronic
            document management system using React and Redux and 3D viewer using{" "}
            <Link
              href="https://www.itwinjs.org"
              className="underline"
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
