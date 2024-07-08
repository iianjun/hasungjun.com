import Image from "next/image";
import Link from "next/link";
import Resume from "@/components/Resume";
import styles from "@/styles/resume.module.scss";

export default function ResumePage() {
  return (
    <main className="relative min-h-screen">
      <section>
        <aside>
          <div className={styles.links}>
            <Link
              className={styles.download}
              href="/resume_hasung_jun.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={30}
                height={30}
                src={"/svg/download.svg"}
                alt="download"
              />
            </Link>
            <Link
              className={styles.github}
              href="https://github.com/iianjun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={30}
                height={30}
                src={"/svg/github.svg"}
                alt="github"
              />
            </Link>
            <Link
              className={styles.linkedin}
              href="https://www.linkedin.com/in/hasungjun/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                width={30}
                height={30}
                src={"/svg/linkedin.svg"}
                alt="linkedin"
              />
            </Link>
          </div>
        </aside>
        <div className="flex justify-center items-center pt-10 pb-[8.8rem]">
          <Resume />
        </div>
      </section>
    </main>
  );
}
