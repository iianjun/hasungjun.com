import Resume from "@/entities/resume/ui/Resume";
import SideLinks from "@/pages/resume/ui/SideLinks";

export const ResumePage = () => {
  return (
    <main>
      <SideLinks />
      <div className="a4:pt-6 a4:pb-[5.5rem] animate-resume-visible font-arial flex items-center justify-center pb-20 print:p-0">
        <Resume />
      </div>
    </main>
  );
};
