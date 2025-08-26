"use client";

import {
  AnimatePresence,
  MotionValue,
  motion,
  useTransform,
} from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { TLDRTermsTypographyLogoIcon } from "@/icons";

export default function IMacHero({ y }: { y: MotionValue<number> }) {
  const monitorStyle = {
    scale: useTransform(y, [0.5, 0.85], [2, 1]),
    opacity: useTransform(y, [0.5, 0.54], [0, 1]),
  };

  const textStyle = {
    opacity: useTransform(y, [0.52, 0.85], [0, 1]),
    translateY: useTransform(y, [0.52, 0.85], [100, 0]),
  };

  return (
    <div className="sticky top-0 min-h-svh overflow-hidden">
      <div className="relative mx-6 max-w-[calc(64rem-(var(--spacing-left-nav)*2))] md:mx-auto lg:w-full xl:w-3/5 xl:max-w-5xl">
        <div className="mt-10 inline-block space-y-2 py-10 md:space-y-6 lg:mt-0">
          <motion.h3
            style={textStyle}
            className="z-[1] w-fit"
            transition={{
              duration: 0,
            }}
          >
            <Link
              className=""
              href="https://www.tldrterms.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TLDRTermsTypographyLogoIcon className="h-fit w-25 text-slate-100 md:w-40" />
            </Link>
            <span className="sr-only">TL;DR Terms</span>
          </motion.h3>
          <motion.h4
            style={textStyle}
            className="z-[1] text-lg leading-normal font-bold whitespace-nowrap text-slate-200 sm:text-xl md:text-2xl"
            transition={{
              duration: 0,
            }}
          >
            Understand Website Terms
            <span className="block text-blue-500">
              Without The Legal Jargon
            </span>
          </motion.h4>
        </div>
        <AnimatePresence>
          <div className="relative z-[2]">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={monitorStyle}
            >
              <Image
                src="/tldrterms/xdr-display.png"
                alt="imac"
                className="!relative w-full"
                fill
                priority
                quality={100}
              />
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
