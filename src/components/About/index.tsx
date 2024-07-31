"use client";

import React, { useRef } from "react";

import AboutTerminal from "@/components/Terminal/AboutTerminal";
import ExperienceTerminal from "@/components/Terminal/ExperienceTerminal";
import MainSection from "@/components/About/MainSection";
import ProjectsTerminal from "@/components/Terminal/ProjectsTerminal";
import SkillSection from "@/components/About/SkillSection";
import StickySection from "@/components/About/StickySection";
import { useIsInViews } from "@/hooks/useIsInViews";

const About = () => {
  const intro = useRef<HTMLDetailsElement>(null);
  const experience = useRef<HTMLDetailsElement>(null);
  const projects = useRef<HTMLDetailsElement>(null);
  const isInViews = useIsInViews(intro, experience, projects);

  return (
    <>
      <section>
        <AboutTerminal visible={isInViews[0]} />
        <ExperienceTerminal visible={isInViews[1] && !isInViews[0]} />
        <ProjectsTerminal visible={isInViews[2] && !isInViews[1]} />
      </section>
      <div className="flex flex-col items-center">
        <MainSection ref={intro} />
        <StickySection
          ref={experience}
          headline="Experience"
          subhead="Where did I work?"
        />
        <StickySection
          ref={projects}
          headline="Projects"
          subhead="My projects"
        />
        <SkillSection />
      </div>
    </>
  );
};

export default About;
