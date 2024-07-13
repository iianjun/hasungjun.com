import React from "react";

const MainSection: React.FC = () => {
  return (
    <section className="sticky top-0 flex max-h-screen flex-col justify-between px-6 py-32">
      <div className="flex flex-col gap-[1.6rem]">
        <h1 className="animate-fade-in-up text-8xl font-bold text-slate-200">
          Hasung Jun
        </h1>
        <h2 className="animate-delay-200 translate-y-10 animate-fade-in-up text-[2.4rem] font-semibold text-slate-400 opacity-0">
          Frontend Developer
        </h2>
        <p className="animate-delay-400 max-w-2xl translate-y-10 animate-fade-in-up text-[1.8rem] text-slate-500 opacity-0">
          I'm a passionate front-end software engineer focused on building
          efficient and user-centric applications. As a continuous and fast
          learner, I'm always excited to discover something new.
        </p>
      </div>
    </section>
  );
};

export default MainSection;
