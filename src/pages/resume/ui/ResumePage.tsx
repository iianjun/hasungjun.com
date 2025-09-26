import Image from "next/image";
import Link from "next/link";
import Resume from "@/entities/resume/ui/Resume";
import { Route } from "next";

export const ResumePage = () => {
  return (
    <main className="relative h-svh">
      <aside className="top-2 left-4 flex h-[3.125rem] items-center px-4 md:fixed md:top-auto md:bottom-[1.875rem] md:left-[1.875rem] md:block md:h-auto md:px-0">
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
              href={"/resume_hasung_jun.pdf" as Route}
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
};
