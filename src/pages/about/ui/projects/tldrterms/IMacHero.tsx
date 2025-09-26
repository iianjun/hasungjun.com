"use client";

import { MotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import ScrollLogo from "@/pages/about/ui/projects/tldrterms/ScrollLogo";
import { TLDRTermsTypographyLogoIcon } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { motion } from "framer-motion";

const MAX_WIDTH = 888;
const LG_SCREEN_BREAKPOINT = 1024;
const TOP_NAV_HEIGHT = 50;
export default function IMacHero({ y }: { y: MotionValue<number> }) {
  const [typoSectionHeight, setTypoSectionHeight] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const monitorStyle = {
    scale: useTransform(y, [0.5, 0.75], [2, 1]),
    opacity: useTransform(y, [0.5, 0.6], [0, 1]),
  };

  const textStyle = {
    opacity: useTransform(y, [isOverflowing ? 0.7 : 0.6, 0.75], [0, 1]),
    translateY: useTransform(y, [isOverflowing ? 0.6 : 0.5, 0.75], [100, 0]),
  };

  const calculateTypoSectionHeight = useCallback(() => {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    const monitorWidth =
      screenWidth > MAX_WIDTH ? MAX_WIDTH : screenWidth * 0.9;
    const monitorHeight = monitorWidth * (2287 / 3082);
    const remainingHeight = screenHeight - monitorHeight;
    setIsOverflowing(remainingHeight < 100);
    setTypoSectionHeight(
      screenWidth < LG_SCREEN_BREAKPOINT
        ? remainingHeight - TOP_NAV_HEIGHT
        : remainingHeight,
    );
  }, []);

  useEffect(() => {
    calculateTypoSectionHeight();
    const controller = new AbortController();
    window.addEventListener("resize", calculateTypoSectionHeight, {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
    };
  }, [calculateTypoSectionHeight]);

  return (
    <>
      <ScrollLogo y={y} />
      <div
        className={cn(
          "2 relative mx-auto mt-12.5 w-[90svw] max-w-[calc(64rem-(var(--spacing-left-nav)*2))] space-y-4 pt-5 md:mt-0 md:space-y-6 md:pt-13.5 lg:pt-6",
          {
            "z-[2] !pt-0 pl-5": isOverflowing,
          },
        )}
        style={{
          height: `${(typoSectionHeight / 16).toFixed(0)}rem`,
          marginTop: isOverflowing
            ? `calc(${(typoSectionHeight / 16).toFixed(0)}rem + 1.25rem)`
            : undefined,
        }}
      >
        <motion.h3
          style={textStyle}
          className="w-fit"
          transition={{
            duration: 0,
          }}
        >
          <Link
            href="https://www.tldrterms.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TLDRTermsTypographyLogoIcon
              className={cn("h-fit w-25 text-slate-100", {
                "md:w-40": !isOverflowing,
                "w-30": isOverflowing,
              })}
            />
          </Link>
          <span className="sr-only">TL;DR Terms</span>
        </motion.h3>
        <motion.h4
          style={textStyle}
          className={cn(
            "text-lg leading-normal font-bold whitespace-nowrap text-slate-200 sm:text-xl",
            {
              "md:text-2xl": !isOverflowing,
            },
          )}
          transition={{
            duration: 0,
          }}
        >
          Understand Website Terms
          <span className="block text-blue-500">Without The Legal Jargon</span>
        </motion.h4>
      </div>
      <motion.div
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
    </>
  );
}
