import { useCallback, useRef, useState } from "react";

import { PlusIcon } from "@/icons";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
function Control() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <motion.li
      className={"group relative h-14 backdrop-blur-lg"}
      animate={{
        height: clicked ? height : undefined,
        width: clicked ? "374px" : undefined,
      }}
    >
      <div className="flex-center pointer-events-none absolute h-full w-full">
        <span className="bg-control/72 group-hover:bg-control/92 z-[-1] h-full w-full rounded-[1.75rem] transition-colors ease-linear"></span>
      </div>
      <motion.button
        onClick={() => setClicked((prev) => !prev)}
        className={cn(
          "z-[1] flex h-14 cursor-pointer items-center gap-3.5 rounded-[1.75rem] pr-7 pl-3.5 font-semibold text-white",
        )}
        animate={{
          opacity: clicked ? 1 : 0,
        }}
      >
        <PlusIcon />
        Ceramic Shield
      </motion.button>
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
        <div className="h-full w-full overflow-hidden">
          <div
            className={cn("invisible max-w-[374px] p-7", {
              visible: clicked,
            })}
            ref={useCallback((node: HTMLDivElement | null) => {
              contentRef.current = node;
              if (node) {
                setHeight(node.clientHeight);
              }
            }, [])}
          >
            <p className="text-[1.0625rem] text-white">
              <strong>Ceramic Shield.</strong> Protects the back of iPhone 17
              Pro, making it 4x more resistant to cracks. New Ceramic Shield 2
              on the front has 3x better scratch resistance.
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
export default function Description() {
  return (
    <div className="relative mx-auto mb-10 flex h-190 w-full max-w-7xl items-center">
      <div className="absolute z-[-1] h-full w-full bg-black xl:rounded-3xl"></div>
      <div className="ml-[min(6rem,8vw)]">
        <ul className="flex flex-col gap-4">
          <Control />
          {/* <Control>Problem</Control>
          <Control>Tech</Control>
          <Control>Impact</Control> */}
        </ul>
      </div>
      <div className="flex-center h-full w-full flex-1 px-10 text-slate-400">
        TL;DR Terms is a full-stack web application that empowers users to make
        informed decisions about digital services by providing AI-powered
        analysis of privacy policies and terms of service documents. Users
        simply input a URL, and the application generates a comprehensive grade
        and breakdown of potential privacy concerns.
      </div>
    </div>
  );
}
