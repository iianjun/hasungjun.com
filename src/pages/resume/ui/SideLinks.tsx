import {
  OutlineDownloadIcon,
  OutlineGitHubIcon,
  OutlineLinkedInIcon,
} from "@/shared/ui";

import Link from "next/link";
import { Route } from "next";
import { SupportedLocale } from "@/entities/locale";
export default function SideLinks({ locale }: { locale: SupportedLocale }) {
  return (
    <aside className="a4:fixed a4:top-auto a4:bottom-7.5 a4:left-7.5 a4:block a4:h-auto a4:px-0 top-2 left-4 z-[2] flex h-12.5 items-center px-4">
      <ul className="resume-aside a4:flex-col-reverse a4:justify-start flex gap-7.5">
        <li className="relative">
          <Link
            href="https://www.linkedin.com/in/hasungjun/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OutlineLinkedInIcon width={30} height={30} />
          </Link>
        </li>
        <li className="relative">
          <Link
            href="https://github.com/iianjun"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OutlineGitHubIcon width={30} height={30} />
          </Link>
        </li>
        <li className="relative">
          <Link
            href={`/resume_hasung_jun_${locale}.pdf` as Route}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <OutlineDownloadIcon width={30} height={30} />
          </Link>
        </li>
      </ul>
    </aside>
  );
}
