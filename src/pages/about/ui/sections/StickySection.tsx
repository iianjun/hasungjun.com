import React, { forwardRef } from "react";

import { cn } from "@/shared/lib";

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
        className={cn(
          "mx-auto h-svh w-full md:w-auto md:max-w-[26.25rem]",
          className,
        )}
        ref={ref}
      >
        <div className="sticky top-0 flex flex-col gap-3 px-6 py-[4.75rem] md:px-0 md:py-[3.125rem] lg:py-10">
          <h2 className="animate-fade-in-up text-4xl font-bold text-slate-200 opacity-0 md:text-6xl">
            {headline}
          </h2>
          {subhead && (
            <h3 className="animate-delay-200 animate-fade-in-up translate-y-6 text-lg font-semibold text-slate-400 opacity-0 md:text-xl">
              {subhead}
            </h3>
          )}
          {content && (
            <p className="animate-delay-400 animate-fade-in-up translate-y-6 text-base text-slate-500 opacity-0 md:text-lg">
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
