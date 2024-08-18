import React, { forwardRef } from "react";

const MainSection = forwardRef<HTMLDetailsElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="mx-auto h-svh w-full md:w-auto md:max-w-[26.25rem]"
    >
      <div className="sticky top-0 flex flex-col gap-3 px-6 py-[4.75rem] md:px-0 md:py-[3.125rem] lg:py-10">
        <h1 className="animate-fade-in-up text-4xl font-bold text-slate-200 md:text-6xl">
          Hasung Jun
        </h1>
        <h2 className="animate-delay-200 translate-y-6 animate-fade-in-up text-lg font-semibold text-slate-400 opacity-0 md:text-xl">
          Frontend Developer
        </h2>
        <p className="animate-delay-400 translate-y-6 animate-fade-in-up text-base text-slate-500 opacity-0 md:text-lg">
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
