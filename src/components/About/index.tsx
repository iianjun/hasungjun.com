"use client";

import AboutTerminal from "@/components/Terminal/AboutTerminal";
import ExperienceTerminal from "@/components/Terminal/ExperienceTerminal";
import MainSection from "@/components/About/MainSection";
import ProjectsTerminal from "@/components/Terminal/ProjectsTerminal";
import React from "react";
import SkillSection from "@/components/About/SkillSection";
import StickySection from "@/components/About/StickySection";
import { useEntrance } from "@/hooks/useEntrance";
import { useIsInViews } from "@/hooks/useIsInViews";

const About = () => {
  const intro = useEntrance<HTMLDetailsElement>();
  const experience = useEntrance<HTMLDetailsElement>();
  const projects = useEntrance<HTMLDetailsElement>();
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
          subhead="My Professional Journey"
          content="Explore my professional journey that have shaped my career. In each role, I’ve developed pixel-perfect designs and seamless user experiences while delivering efficient solutions."
        />
        <StickySection
          ref={projects}
          headline="Projects"
          subhead="Bringing Ideas to Life"
          content="Discover the projects that highlight my journey as a developer, from concept to execution. Each project reflects my dedication to delivering great user experiences and efficient solutions."
        />
        <SkillSection />
      </div>
    </>
  );
};

export default About;
