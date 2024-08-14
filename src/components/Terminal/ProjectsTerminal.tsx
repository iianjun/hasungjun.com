import FloatingTerminal from "@/components/FloatingTerminal";
import { FloatingTerminalProps } from "@/components/FloatingTerminal";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProjectsTerminal: React.FC<FloatingTerminalProps> = ({ ...rest }) => {
  return (
    <FloatingTerminal {...rest}>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <div className="flex gap-4">
            <h2 className="text-[1.6rem] font-medium text-white">Tiny Desk</h2>
            <Link
              href="https://github.com/janarosmonaliev/tinydesk_legacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/svg/github.svg"
                width={24}
                height={24}
                alt="GitHub"
              />
            </Link>
            <Link
              href="https://www.tinydesk.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/svg/link.svg" width={24} height={24} alt="link" />
            </Link>
          </div>
          <p className="text-[1.6rem] text-slate-400">
            TinyDesk is designed to provide a quick and efficient way for users
            to organize their bookmarks on modern browsers. The project
            emphasizes allowing users to customize their start page with
            advanced options not typically available by default in most
            browsers. This project was guided by{" "}
            <Link
              href="https://www.linkedin.com/in/alexckuhn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline"
            >
              Alex Khun
            </Link>
            , an ex-Apple Engineer. Under his mentorship, I took on the role of
            Product Owner, where I managed the schedule, set timelines, and
            prioritized tasks. I also contributed to both the front-end and
            back-end, maintaining, fixing, and developing features such as a
            to-do list, notes, bookmarks, a weather widget, and more.
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <div className="flex gap-4">
            <h2 className="text-[1.6rem] font-medium text-white">Suni</h2>
            <Link
              href="https://github.com/iianjun/Suni"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/svg/github.svg"
                width={24}
                height={24}
                alt="GitHub"
              />
            </Link>
            <Link
              href="https://apps.apple.com/us/app/suni-for-suny/id1554029990"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/svg/link.svg" width={24} height={24} alt="link" />
            </Link>
          </div>
          <p className="text-[1.6rem] text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            luctus venenatis lectus magna fringilla. Sodales neque sodales ut
            etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
            odio facilisis mauris sit amet massa.
          </p>
        </section>
      </div>
    </FloatingTerminal>
  );
};

export default ProjectsTerminal;
