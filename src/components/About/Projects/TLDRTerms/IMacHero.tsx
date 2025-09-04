"use client";

import { MotionValue, useTransform } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import ScrollLogo from "@/components/About/Projects/TLDRTerms/ScrollLogo";
import { TLDRTermsTypographyLogoIcon } from "@/icons";
import { motion } from "framer-motion";

export default function IMacHero({ y }: { y: MotionValue<number> }) {
  const monitorStyle = {
    scale: useTransform(y, [0.6, 0.85], [2, 1]),
    opacity: useTransform(y, [0.6, 0.7], [0, 1]),
  };

  const textStyle = {
    opacity: useTransform(y, [0.7, 0.85], [0, 1]),
    translateY: useTransform(y, [0.6, 0.85], [100, 0]),
  };

  return (
    <div className="sticky top-0 min-h-svh overflow-hidden">
      <ScrollLogo y={y} />
      <div className="mx-auto w-[90svw] max-w-[calc(64rem-(var(--spacing-left-nav)*2))]">
        <div className="mt-10 inline-block space-y-2 py-10 md:space-y-6 lg:mt-0">
          <motion.h3
            style={textStyle}
            className="z-[1] w-fit"
            transition={{
              duration: 0,
            }}
          >
            <Link
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
      </div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={monitorStyle}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <div className="aspect-[3082/2287] w-[90svw] max-w-[calc(64rem-(var(--spacing-left-nav)*2))]">
          <Image
            src="/tldrterms/xdr-display.png"
            alt="imac"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}
