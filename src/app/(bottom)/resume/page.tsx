import Image from "next/image";
import Link from "next/link";
import Resume from "@/components/Resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Hasung Jun",
};

export default async function ResumePage() {
  return (
    <main className="relative h-svh">
      <aside className="left-4 top-2 flex h-[3.125rem] items-center px-4 md:fixed md:bottom-[1.875rem] md:left-[1.875rem] md:top-auto md:block md:h-auto md:px-0">
        <ul className="resume-aside flex gap-[1.875rem] md:flex-col-reverse md:justify-start">
          <li className="relative">
            <Link
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
          </li>
          <li className="relative">
            <Link
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
          </li>
          <li className="relative">
            <Link
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
          </li>
        </ul>
      </aside>
      <section>
        <Resume />
      </section>
    </main>
  );
}
