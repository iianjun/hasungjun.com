import React, { forwardRef } from "react";

const MainSection = forwardRef<HTMLDetailsElement>((_, ref) => {
  return (
    <section ref={ref} className="h-svh">
      <div className="sticky top-0 flex flex-col gap-[1.6rem] px-10 py-30 md:px-0 md:py-20 lg:py-16">
        <h1 className="animate-fade-in-up text-6xl font-bold text-slate-200 md:text-8xl">
          Hasung Jun
        </h1>
        <h2 className="animate-delay-200 translate-y-10 animate-fade-in-up text-3xl font-semibold text-slate-400 opacity-0 md:text-4xl">
          Frontend Developer
        </h2>
        <p className="animate-delay-400 translate-y-10 animate-fade-in-up text-[1.6rem] text-slate-500 opacity-0 md:max-w-2xl md:text-[1.8rem]">
          I'm a passionate front-end software engineer focused on building
          efficient and user-centric applications. As a continuous and fast
          learner, I'm always excited to discover something new.
        </p>
      </div>
    </section>
  );
});
MainSection.displayName = "MainSection";
export default MainSection;
