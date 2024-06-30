import Resume from "@/components/Resume";
import styles from "@/styles/resume.module.scss";

export default function ResumePage() {
  return (
    <main className="grid grid-cols-2 h-full relative">
      <Resume />
    </main>
  );
}
