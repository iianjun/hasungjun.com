import Image from "next/image";
import Link from "next/link";
import Resume from "@/components/Resume";

export default function ResumePage() {
  return (
    <main className="relative min-h-screen">
      <section>
        <aside>
          <div className="fixed bottom-12 left-12 flex h-[25rem] animate-fade-in-up-late-opacity flex-col justify-end gap-12">
            <Link
              className="divider-top divider-lg relative"
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
              className="divider-top divider-sm divider-bottom relative"
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
              className="divider-bottom divider-sm relative"
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
        <div className="flex items-center justify-center pb-[8.8rem] pt-10">
          <Resume />
        </div>
      </section>
    </main>
  );
}
