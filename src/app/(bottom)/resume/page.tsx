import Image from "next/image";
import Link from "next/link";
import Resume from "@/components/Resume";

export default function ResumePage() {
  return (
    <main className="relative h-svh">
      <aside className="left-6 top-4 flex h-20 items-center px-6 md:fixed md:bottom-12 md:left-12 md:top-auto md:block md:h-auto md:px-0">
        <ul className="resume-aside flex gap-12 md:flex-col-reverse md:justify-start">
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
