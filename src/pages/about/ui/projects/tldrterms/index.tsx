"use client";

import React, { useRef } from "react";

import Description from "./Description";
import IMacHero from "./IMacHero";
import ScrollLogo from "./ScrollLogo";
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";

const TLDRTerms = () => {
  const ref = useRef<HTMLDetailsElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref}>
      <div className="relative mb-49 h-[400rem] md:mb-51.5">
        <div className="from-background to-tldr-background absolute h-1/3 w-full bg-linear-to-b"></div>
        <div className="bg-tldr-background absolute top-1/3 h-1/3 w-full"></div>
        <div className="from-tldr-background to-background absolute top-2/3 h-1/3 min-h-dvh w-full bg-linear-to-b"></div>
        <div className="sticky top-0 min-h-dvh overflow-hidden">
          <ScrollLogo y={scrollYProgress} />
          <IMacHero y={scrollYProgress} />
        </div>
      </div>
      <div className="py-24 md:py-28.5">
        <motion.div className="mx-auto w-[87.5%] max-w-105 pb-12 md:max-w-[78.75rem] md:pb-16 lg:pb-20">
          <h4 className="lg:text-5.5xl max-w-3/4 min-w-1/2 text-[1.75rem] font-semibold text-white md:text-5xl">
            Take a closer look.
          </h4>
        </motion.div>
        <Description />
      </div>
    </section>
  );
};

export default TLDRTerms;
