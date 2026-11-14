import { EnResume } from "@/entities/resume";
import { SideLinks } from "@/pages/resume";

export const ResumePage = async () => {
  return (
    <main>
      <SideLinks />
      <div className="a4:pt-6 a4:pb-[5.5rem] animate-resume-visible font-arial flex items-center justify-center pb-20 print:p-0">
        <div className="a4:rounded-3xl overflow-clip">
          <EnResume />
        </div>
      </div>
    </main>
  );
};
