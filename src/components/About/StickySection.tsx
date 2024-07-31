import React, { PropsWithChildren, forwardRef } from "react";

import classNames from "classnames";

interface Props {
  headline: string;
  subhead?: string;
  className?: string;
}
const StickySection = forwardRef<HTMLDetailsElement, PropsWithChildren<Props>>(
  ({ headline, className, subhead, children }, ref) => {
    return (
      <section
        className={classNames("h-svh w-full sm:w-auto", className)}
        ref={ref}
      >
        <div className="sticky top-0 flex flex-col gap-10 px-8 py-40 text-white md:min-w-[42rem] md:px-0">
          <h2 className="text-8xl font-bold">{headline}</h2>
          {subhead && <h3 className="text-[2.4rem]">{subhead}</h3>}
        </div>
        {children && children}
      </section>
    );
  },
);
StickySection.displayName = "StickySection";

export default StickySection;
