"use client";

import AboutTerminal from "@/components/Terminal/AboutTerminal";
import ExperienceTerminal from "@/components/Terminal/ExperienceTerminal";
import MainSection from "@/components/About/MainSection";
import ProjectsSection from "@/components/About/Projects/ProjectsSection";
import React from "react";
import SkillSection from "@/components/About/SkillSection";
import StickySection from "@/components/About/StickySection";
import { useEntrance } from "@/hooks/useEntrance";
import { useIsInViews } from "@/hooks/useIsInViews";

const About = () => {
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
        <StickySection
          ref={experience}
          headline="Experience"
          subhead="My Professional Journey"
          content="Explore my professional journey that have shaped my career. In each role, I’ve developed pixel-perfect designs and seamless user experiences while delivering efficient solutions."
        />
        <ProjectsSection />
        <SkillSection />
      </div>
    </>
  );
};

export default About;
