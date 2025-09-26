import React from "react";

export default function MainSection({
  ref,
}: {
  ref: React.RefObject<HTMLDetailsElement | null>;
}) {
  return (
    <section
      ref={ref}
      className="mx-auto h-svh w-full md:w-auto md:max-w-[26.25rem]"
    >
      <div className="sticky top-0 flex flex-col gap-3 px-6 py-[4.75rem] md:px-0 md:py-[3.125rem] lg:py-10">
        <h1 className="animate-fade-in-up text-4xl font-bold text-slate-200 md:text-6xl">
          Hasung Jun
        </h1>
        <h2 className="animate-delay-200 animate-fade-in-up translate-y-6 text-lg font-semibold text-slate-400 opacity-0 md:text-xl">
          Full-stack Developer
        </h2>
        <p className="animate-delay-400 animate-fade-in-up translate-y-6 text-base text-slate-500 opacity-0 md:text-lg">
          I’m a passionate full-stack developer focused on building efficient,
          user-centric applications. As a continuous and fast learner, I’m
          always excited to discover new things.
        </p>
      </div>
    </section>
  );
}
