import React, { forwardRef } from "react";

const ProjectSection = forwardRef<HTMLDetailsElement>((_, ref) => {
  return (
    <section className="flex h-svh flex-col justify-center" ref={ref}>
      <h1 className="text-4xl font-bold text-white">Projects</h1>
    </section>
  );
});
ProjectSection.displayName = "ProjectSection";

export default ProjectSection;
