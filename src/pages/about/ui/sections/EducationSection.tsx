import React from "react";
import { useTranslations } from "next-intl";

interface Props {
  ref?: React.Ref<HTMLDetailsElement>;
}
const EdcuationSection = ({ ref }: Props) => {
  const t = useTranslations("about.experience");
  return (
    <section
      className={"mx-auto h-svh w-full md:w-auto md:max-w-[26.25rem]"}
      ref={ref}
    >
      <div className="sticky top-0 flex flex-col gap-3 px-6 py-[4.75rem] md:px-0 md:py-[3.125rem] lg:py-10">
        <h2 className="animate-fade-in-up text-4xl font-bold text-slate-200 opacity-0 md:text-6xl">
          Experience
        </h2>
        <h3 className="animate-delay-200 animate-fade-in-up translate-y-6 text-lg font-semibold text-slate-400 opacity-0 md:text-xl">
          {t("subheading")}
        </h3>
        <p className="animate-delay-400 animate-fade-in-up translate-y-6 text-base text-slate-400 opacity-0 md:text-lg">
          {t("content")}
        </p>
      </div>
    </section>
  );
};

export default EdcuationSection;
