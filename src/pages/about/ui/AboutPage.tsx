"use client";

import AboutTerminal from "@/pages/about/ui/terminals/AboutTerminal";
import EducationSection from "@/pages/about/ui/sections/EducationSection";
import ExperienceTerminal from "@/pages/about/ui/terminals/ExperienceTerminal";
import MainSection from "@/pages/about/ui/sections/MainSection";
import ProjectsSection from "@/pages/about/ui/projects/ProjectsSection";
import React from "react";
import SkillSection from "@/pages/about/ui/sections/SkillSection";
import { useEntrance } from "@/pages/about/hooks/useEntrance";
import { useIsInViews } from "@/shared/lib";

export const AboutPage = () => {
  const intro = useEntrance<HTMLDetailsElement>();
  const experience = useEntrance<HTMLDetailsElement>();
  const isInViews = useIsInViews(intro, experience);

  return (
    <>
      <section>
        <AboutTerminal visible={isInViews[0]} />
        <ExperienceTerminal visible={isInViews[1] && !isInViews[0]} />
      </section>
      <div>
        <MainSection ref={intro} />
        <EducationSection ref={experience} />
        <ProjectsSection />
        <SkillSection />
      </div>
    </>
  );
};
