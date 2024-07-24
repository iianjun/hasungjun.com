import React, { forwardRef } from "react";

const MainSection = forwardRef<HTMLDetailsElement>((_, ref) => {
  return (
    <section ref={ref} className="h-svh">
      <div className="sticky top-0 flex flex-col gap-[1.6rem] px-8 py-40 md:px-0 lg:py-32">
        <h1 className="animate-fade-in-up text-8xl font-bold text-slate-200">
          Hasung Jun
        </h1>
        <h2 className="animate-delay-200 translate-y-10 animate-fade-in-up text-[2.4rem] font-semibold text-slate-400 opacity-0">
          Frontend Developer
        </h2>
        <p className="animate-delay-400 translate-y-10 animate-fade-in-up text-[1.8rem] text-slate-500 opacity-0 md:max-w-2xl">
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
