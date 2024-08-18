import React from "react";
import TinyDesk from "@/components/About/Projects/TinyDesk";

const ProjectsSection = () => {
  return (
    <div>
      <section className="mx-auto h-svh w-full md:w-auto md:max-w-[26.25rem]">
        <div className="flex flex-col gap-3 px-6 py-[4.75rem] md:px-0 md:py-[3.125rem] lg:pb-[11.25rem] lg:pt-10">
          <h2 className="animate-fade-in-up text-4xl font-bold text-slate-200 opacity-0 md:text-6xl">
            Projects
          </h2>
          <p className="animate-delay-200 translate-y-6 animate-fade-in-up text-lg font-semibold text-slate-400 opacity-0 md:text-xl">
            Bringing Ideas to Life
          </p>
          <p className="animate-delay-400 translate-y-6 animate-fade-in-up text-base text-slate-500 opacity-0 md:text-lg">
            Discover the projects that highlight my journey as a developer, from
            concept to execution. Each project reflects my dedication to
            delivering great user experiences and efficient solutions.
          </p>
        </div>
      </section>
      <TinyDesk />
    </div>
  );
};

export default ProjectsSection;
