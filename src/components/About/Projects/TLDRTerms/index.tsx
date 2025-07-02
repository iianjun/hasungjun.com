import Logo from "@/components/About/Projects/TLDRTerms/Logo";
import React from "react";

const TLDRTerms = () => {
  return (
    <section className="h-[1200svh]">
      <div className="from-background to-tldr-background bg-linear-to-b">
        <Logo />
      </div>
      <div className="from-tldr-background to-background bg-linear-to-b">
        <div className="h-[600svh]"></div>
      </div>
    </section>
  );
};

export default TLDRTerms;
