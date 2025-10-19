import { FloatingTerminal, FloatingTerminalProps } from "@/shared/ui";

import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const AboutTermimal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  const t = useTranslations("about.background");
  return (
    <FloatingTerminal animation {...rest}>
      <div className="flex flex-col gap-[1.875rem]">
        <section>
          <h2 className="mb-4 text-[1.375rem] text-slate-100 md:text-[1.875rem]">
            Background
          </h2>
          {t.rich("storyTelling", {
            paragraph: (chunks) => (
              <p className="mb-4 text-base text-slate-400 md:text-lg">
                {chunks}
              </p>
            ),
          })}
        </section>
        <section className="flex flex-col gap-[1.375rem]">
          <h2 className="text-[1.375rem] text-slate-100 md:text-[1.875rem]">
            Education
          </h2>
          <div className="flex items-start gap-6 md:items-center">
            <Image
              src="/svg/stony-brook-logo.svg"
              priority
              width={"0"}
              height={"0"}
              className="mt-3 h-auto w-[3.75rem] md:mt-0"
              alt="stony-brook-logo"
            />
            <div>
              <h3 className="mb-1 text-base text-slate-200 md:mb-2 md:text-lg">
                <span>{t("csMajor")}</span>{" "}
                <span className="invisible md:visible"> · </span>{" "}
                <span className="block md:inline">{t("tsmMajor")}</span>
              </h3>
              <h4 className="mb-1 text-base text-slate-400 md:mb-2 md:text-lg">
                Stony Brook University
              </h4>
              <p className="mb-1 text-base text-slate-400 md:mb-2 md:text-lg">
                {t("degree")}
              </p>
              <p className="text-base text-slate-400 md:text-lg">
                {t("graduationDate")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </FloatingTerminal>
  );
};

export default AboutTermimal;
