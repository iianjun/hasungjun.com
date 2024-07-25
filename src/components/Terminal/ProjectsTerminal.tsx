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
          <h2 className="text-[1.6rem] font-medium text-white">Tiny Desk</h2>
          <p className="text-[1.6rem] text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            luctus venenatis lectus magna fringilla. Sodales neque sodales ut
            etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
            odio facilisis mauris sit amet massa.
          </p>
          <div className="flex gap-4">
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
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="text-[1.6rem] font-medium text-white">Suni</h2>
          <p className="text-[1.6rem] text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            luctus venenatis lectus magna fringilla. Sodales neque sodales ut
            etiam sit. Egestas congue quisque egestas diam. Sagittis eu volutpat
            odio facilisis mauris sit amet massa.
          </p>
          <div className="flex gap-4">
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
        </section>
      </div>
    </FloatingTerminal>
  );
};

export default ProjectsTerminal;
