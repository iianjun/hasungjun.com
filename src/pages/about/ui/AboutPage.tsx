"use client";

import AboutTerminal from "./terminals/AboutTerminal";
import EducationSection from "./sections/EducationSection";
import ExperienceTerminal from "./terminals/ExperienceTerminal";
import MainSection from "./sections/MainSection";
import ProjectsSection from "./projects/ProjectsSection";
import SkillSection from "./sections/SkillSection";
import { useEntrance } from "../hooks/useEntrance";
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
