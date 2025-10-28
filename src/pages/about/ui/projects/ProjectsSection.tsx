import React from "react";
import TLDRTerms from "@/pages/about/ui/projects/tldrterms";
import TinyDesk from "@/pages/about/ui/projects/tinydesk";
import { useTranslations } from "next-intl";

const ProjectsSection = () => {
  const t = useTranslations("about.projects");
  return (
    <section>
      <div className="mx-auto h-[50svh] w-full md:w-auto md:max-w-[26.25rem]">
        <div className="flex flex-col gap-3 px-6 py-[4.75rem] md:px-0 md:py-[3.125rem] lg:pt-10 lg:pb-[11.25rem]">
          <h2 className="animate-fade-in-up text-4xl font-bold text-slate-200 opacity-0 md:text-6xl">
            Projects
          </h2>
          <p className="animate-delay-200 animate-fade-in-up translate-y-6 text-lg font-semibold text-slate-400 opacity-0 md:text-xl">
            {t("subheading")}
          </p>
          <p className="animate-delay-400 animate-fade-in-up translate-y-6 text-base text-slate-400 opacity-0 md:text-lg">
            {t("content")}
          </p>
        </div>
      </div>
      <TinyDesk />
      <TLDRTerms />
    </section>
  );
};

export default ProjectsSection;
