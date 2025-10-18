import { ResumeWrapper } from "@/entities/resume";
import { SideLinks } from "@/pages/resume";
import { getLocale } from "@/entities/locale";

export const ResumePage = async () => {
  const locale = await getLocale();

  return (
    <main>
      <SideLinks locale={locale} />
      <div className="a4:pt-6 a4:pb-[5.5rem] animate-resume-visible font-arial flex items-center justify-center pb-20 print:p-0">
        <div className="a4:rounded-3xl overflow-clip">
          <ResumeWrapper locale={locale} />
        </div>
      </div>
    </main>
  );
};
