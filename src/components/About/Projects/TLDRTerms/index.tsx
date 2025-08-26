import React, { useRef } from "react";

import ScrollLogo from "@/components/About/Projects/TLDRTerms/ScrollLogo";
import { useScroll } from "framer-motion";

const TLDRTerms = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <section className="relative h-[400svh]" ref={ref}>
      <div className="from-background to-tldr-background absolute h-1/3 w-full bg-linear-to-b"></div>
      <div className="bg-tldr-background absolute top-1/3 h-1/3 w-full"></div>
      <div className="from-tldr-background to-background absolute top-2/3 h-1/3 min-h-svh w-full bg-linear-to-b"></div>
      <ScrollLogo y={scrollYProgress} />
      {/* <IMacHero y={scrollYProgress} /> */}
    </section>
  );
};

export default TLDRTerms;
