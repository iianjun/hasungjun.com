import React from "react";
import ScrollLogo from "@/components/About/Projects/TLDRTerms/ScrollLogo";
import TLDRTermsContent from "@/components/About/Projects/TLDRTerms/Content";

const TLDRTerms = () => {
  return (
    <section className="h-[1200svh]">
      <div className="from-background to-tldr-background bg-linear-to-b">
        <ScrollLogo />
      </div>
      <div className="bg-tldr-background">
        <TLDRTermsContent />
      </div>
      {/*  */}
      <div className="from-tldr-background to-background min-h-svh bg-linear-to-b"></div>
    </section>
  );
};

export default TLDRTerms;
