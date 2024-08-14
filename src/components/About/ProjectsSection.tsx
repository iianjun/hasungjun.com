import React from "react";

const ProjectsSection = () => {
  return (
    <div>
      <section className="h-svh w-full md:w-auto md:max-w-[26.25rem]">
        <div className="sticky top-0 flex flex-col gap-3 px-6 py-[4.75rem] md:px-0 md:py-[3.125rem] lg:pb-[11.25rem] lg:pt-10">
          <h2 className="animate-fade-in-up text-4xl font-bold text-slate-200 opacity-0 md:text-6xl">
            Projects
          </h2>
          <h3 className="animate-delay-200 translate-y-6 animate-fade-in-up text-lg font-semibold text-slate-400 opacity-0 md:text-xl">
            Bringing Ideas to Life
          </h3>
          <p className="animate-delay-400 translate-y-6 animate-fade-in-up text-base text-slate-500 opacity-0 md:text-lg">
            Discover the projects that highlight my journey as a developer, from
            concept to execution. Each project reflects my dedication to
            delivering great user experiences and efficient solutions.
          </p>
        </div>
      </section>
      {/* <section className="h-svh w-full max-w-screen-xl px-10 md:px-0">
        <h2 className="bg-big-sur-gradient animate-fade-in-up bg-clip-text text-[3.75rem] font-bold opacity-0 md:text-[6rem]">
          Tiny desk
        </h2>
      </section>
      <section className="h-svh w-full md:w-auto"></section>
      <section className="h-svh w-full md:w-auto"></section> */}
    </div>
  );
};

export default ProjectsSection;
