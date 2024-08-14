import React from "react";

const ProjectsSection = () => {
  return (
    <div>
      <section className="mx-auto w-full md:w-[42rem]">
        <div className="sticky top-0 flex flex-col gap-[1.6rem] px-10 py-30 text-white md:min-w-[42rem] md:px-0 md:py-20 lg:pb-72 lg:pt-16">
          <h2 className="animate-fade-in-up text-6xl font-bold opacity-0 md:text-8xl">
            Projects
          </h2>
          <h3 className="animate-delay-200 animate-fade-in-up text-3xl font-semibold text-slate-400 opacity-0 md:text-4xl">
            Bringing Ideas to Life
          </h3>
          <p className="animate-delay-400 translate-y-10 animate-fade-in-up text-[1.6rem] text-slate-500 opacity-0 md:max-w-2xl md:text-[1.8rem]">
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
