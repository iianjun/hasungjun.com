import { FloatingTerminal, type FloatingTerminalProps } from "@/shared/ui";

import { ExperienceSection } from "@/features/experience";
import React from "react";
import { useTranslations } from "next-intl";

const ExperienceTerminal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  const t = useTranslations("about.experience");

  const getComponent = (key: string) => {
    if (t.has(`${key}Description`)) {
      return t(`${key}Description`);
    }
    return t.rich(`${key}List`, {
      li: (chunks) => <li className="text-base text-slate-400">{chunks}</li>,
    });
  };
  return (
    <FloatingTerminal {...rest}>
      <div className="flex flex-col gap-6">
        <ExperienceSection
          period={t("aicyPeriod")}
          jobTitle={t("fullStack")}
          company="Aicy"
          description={getComponent("aicy")}
        />
        <ExperienceSection
          period={t("workonwardPeriod")}
          jobTitle={t("fullStack")}
          company="WorkOnward"
          description={getComponent("workonward")}
        />
        <ExperienceSection
          period={t("softSquaredPeriod")}
          jobTitle={`${t("frontend")} (${t("contract")})`}
          company={t("softSquared")}
          description={getComponent("softSquared")}
        />
      </div>
    </FloatingTerminal>
  );
};

export default ExperienceTerminal;
