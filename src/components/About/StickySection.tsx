import React, { forwardRef } from "react";

import classNames from "classnames";

interface Props {
  headline: string;
  subhead?: string;
  className?: string;
  content?: string;
}
const StickySection = forwardRef<HTMLDetailsElement, Props>(
  ({ headline, content, className, subhead }, ref) => {
    return (
      <section
        className={classNames("h-svh w-full md:w-auto", className)}
        ref={ref}
      >
        <div className="sticky top-0 flex flex-col gap-[1.6rem] px-10 py-30 text-white md:min-w-[42rem] md:px-0 md:py-16">
          <h2 className="animate-fade-in-up text-6xl font-bold opacity-0 md:text-8xl">
            {headline}
          </h2>
          {subhead && (
            <h3 className="animate-delay-200 animate-fade-in-up text-3xl font-semibold text-slate-400 opacity-0 md:text-4xl">
              {subhead}
            </h3>
          )}
          {content && (
            <p className="animate-delay-400 md:text-3xl- translate-y-10 animate-fade-in-up text-[1.6rem] text-slate-500 opacity-0 md:max-w-2xl">
              {content}
            </p>
          )}
        </div>
      </section>
    );
  },
);
StickySection.displayName = "StickySection";

export default StickySection;
