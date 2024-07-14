import React, { forwardRef } from "react";

const IntroSection = forwardRef<HTMLDetailsElement>((_, ref) => {
  return (
    <section className="flex h-svh items-center" ref={ref}>
      <div className="flex animate-fade-in-up flex-col gap-6 text-[1.8rem] text-slate-500">
        <p>
          I started my journey in software development in my sophmore year by
          falling in love with computer science by accident. My initial major
          was Technological Systems Management (TSM), which had the prerequisite
          to take Object Oriented Programming class.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
          luctus venenatis lectus magna fringilla. Sodales neque sodales ut
          etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
          odio facilisis mauris sit amet massa.
        </p>
      </div>
    </section>
  );
});
IntroSection.displayName = "IntroSection";
export default IntroSection;
