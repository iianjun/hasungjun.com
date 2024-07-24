import React, { forwardRef } from "react";

interface Props {
  headline: string;
  subhead?: string;
}
const StickySection = forwardRef<HTMLDetailsElement, Props>(
  ({ headline, subhead }, ref) => {
    return (
      <section className="h-svh w-full sm:w-auto" ref={ref}>
        <div className="sticky top-0 flex flex-col gap-10 px-8 py-40 text-white md:min-w-[42rem] md:px-0">
          <h2 className="text-8xl font-bold">{headline}</h2>
          {subhead && <h3 className="text-[2.4rem]">{subhead}</h3>}
        </div>
      </section>
    );
  },
);
StickySection.displayName = "StickySection";

export default StickySection;
