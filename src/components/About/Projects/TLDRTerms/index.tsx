import React, { useRef } from "react";

import Description from "@/components/About/Projects/TLDRTerms/Description";
import IMacHero from "@/components/About/Projects/TLDRTerms/IMacHero";
import { useScroll } from "framer-motion";

const TLDRTerms = () => {
  const ref = useRef<HTMLDetailsElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <section ref={ref}>
      <div className="relative mb-17.5 h-[400svh]">
        <div className="from-background to-tldr-background absolute h-1/3 w-full bg-linear-to-b"></div>
        <div className="bg-tldr-background absolute top-1/3 h-1/3 w-full"></div>
        <div className="from-tldr-background to-background absolute top-2/3 h-1/3 min-h-svh w-full bg-linear-to-b"></div>
        <IMacHero y={scrollYProgress} />
      </div>
      <Description />
    </section>
  );
};

export default TLDRTerms;
