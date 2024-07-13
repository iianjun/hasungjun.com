import React, { forwardRef } from "react";

interface Props {
  headline: string;
  subhead?: string;
}
const StickySection = forwardRef<HTMLDetailsElement, Props>(
  ({ headline, subhead }, ref) => {
    return (
      <section className="h-svh" ref={ref}>
        <div className="sticky top-0 flex flex-col gap-10 pb-96 pt-32 text-white">
          <h1 className="text-8xl font-bold">{headline}</h1>
          {subhead && <h2 className="text-[2.4rem]">{subhead}</h2>}
        </div>
      </section>
    );
  },
);
StickySection.displayName = "StickySection";

export default StickySection;
