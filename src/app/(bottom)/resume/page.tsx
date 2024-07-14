import Image from "next/image";
import Link from "next/link";
import Resume from "@/components/Resume";

export default function ResumePage() {
  return (
    <main className="relative min-h-screen">
      <aside>
        <ul className="resume-aside fixed left-12 top-4 flex gap-12 sm:bottom-12 sm:left-12 sm:top-auto sm:flex-col-reverse sm:justify-start">
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
