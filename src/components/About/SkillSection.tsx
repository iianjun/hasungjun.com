import React, { forwardRef } from "react";

const SkillSection = forwardRef<HTMLDetailsElement>((_, ref) => {
  return (
    <section className="flex h-[200svh] flex-col justify-center" ref={ref}>
      <h1 className="text-4xl font-bold text-white">Skills</h1>
    </section>
  );
});
SkillSection.displayName = "SkillSection";

export default SkillSection;
