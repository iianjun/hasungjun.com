"use client";

import React, { useRef } from "react";

import AboutTerminal from "@/components/Terminal/AboutTerminal";
import ExperienceSection from "@/components/About/ExperienceSection";
import ExperienceTerminal from "@/components/Terminal/ExperienceTerminal";
import IntroSection from "@/components/About/IntroSection";
import MainSection from "@/components/About/MainSection";
import ProjectSection from "@/components/About/ProjectSection";
import ProjectsTerminal from "@/components/Terminal/ProjectsTerminal";
import SkillSection from "@/components/About/SkillSection";
import { useIsInViews } from "@/hooks/useIsInViews";

const About = () => {
  const intro = useRef<HTMLDetailsElement>(null);
  const experience = useRef<HTMLDetailsElement>(null);
  const projects = useRef<HTMLDetailsElement>(null);
  const skills = useRef<HTMLDetailsElement>(null);
  const isInViews = useIsInViews(intro, experience, projects, skills);

  return (
    <>
      <section>
        <AboutTerminal visible={isInViews[0]} />
        <ExperienceTerminal visible={isInViews[1] && !isInViews[0]} />
        <ProjectsTerminal visible={isInViews[2] && !isInViews[1]} />
      </section>
      <div className="grid grid-cols-2 gap-6">
        <MainSection />
        <div className="px-6">
          <IntroSection ref={intro} />
          <ExperienceSection ref={experience} />
          <ProjectSection ref={projects} />
          <SkillSection ref={skills} />
        </div>
      </div>
    </>
  );
};

export default About;
