import React, { forwardRef } from "react";

const ExperienceSection = forwardRef<HTMLDetailsElement>((_, ref) => {
  return (
    <section className="flex h-svh flex-col justify-center" ref={ref}>
      <h1 className="text-4xl font-bold text-white">Experience</h1>
    </section>
  );
});
ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
