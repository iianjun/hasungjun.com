"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import AnimatedLineLogo from "@/components/About/Projects/TLDRTerms/AnimatedLineLogo";
import Image from "next/image";
import Link from "next/link";
import { TLDRTermsTypographyLogoIcon } from "@/icons";
import { useIsInView } from "@/hooks/useIsInView";
import { useRef } from "react";

const animationProgressRange = [0, 2 / 3];

export default function IMacHero() {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [container, isInView] = useIsInView<HTMLDivElement>({
    options: {
      rootMargin: `0px 0px -100% 0px`,
    },
  });
  const { scrollYProgress } = useScroll({
    target: scrollContainer,
    offset: ["start start", "end end"],
  });

  const monitorStyle = {
    scale: useTransform(scrollYProgress, animationProgressRange, [2, 1]),
  };

  const textStyle = {
    opacity: useTransform(scrollYProgress, [1 / 2, 2 / 3], [0, 1]),
    translateY: useTransform(scrollYProgress, animationProgressRange, [96, 0]),
  };

  return (
    <div ref={scrollContainer} className="min-h-[200svh]">
      <div className="sticky top-0">
        <div ref={container} className="relative mx-auto w-3/5 max-w-[1100px]">
          <div className="space-y-2 py-10 md:space-y-6">
            <motion.h3
              style={textStyle}
              className="z-[1]"
              transition={{
                duration: 0,
              }}
            >
              <Link
                href="https://www.tldrterms.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TLDRTermsTypographyLogoIcon className="h-fit w-[15%] max-w-90 text-slate-100" />
              </Link>
              <span className="sr-only">TL;DR Terms</span>
            </motion.h3>
            <motion.h4
              style={textStyle}
              className="z-[1] text-lg leading-normal font-bold text-slate-200 sm:text-xl md:text-2xl"
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
            {isInView && (
              <motion.div
                className="relative z-[2] mr-[-5%] ml-[-5%]"
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
                <AnimatedLineLogo className="absolute top-[38.7%] left-1/2 z-3 w-[30%] -translate-1/2 xl:w-69" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
