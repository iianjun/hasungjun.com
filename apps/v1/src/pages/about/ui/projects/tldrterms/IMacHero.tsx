"use client";

import { MotionValue, useTransform } from "framer-motion";
import { cn, useMediaQuery, useMounted } from "@/shared/lib";
import { useEffect, useEffectEvent, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Links from "./Links";
import ScrollLogo from "./ScrollLogo";
import { TLDRTermsTypographyLogoIcon } from "@/shared/ui";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const MAX_WIDTH = 820;
const LG_SCREEN_BREAKPOINT = 1024;
const TOP_NAV_HEIGHT = 50;

export default function IMacHero({ y }: { y: MotionValue<number> }) {
  const t = useTranslations("about.projects.tldrterms");
  const isSm = useMediaQuery("(max-width: 40rem)");
  const isMoutned = useMounted();
  const [typoSectionHeight, setTypoSectionHeight] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const monitorStyle = {
    scale: useTransform(y, [0.4, 0.6], [2, 1]),
    opacity: useTransform(y, [0.4, 0.6], [0, 1]),
  };

  const textStyle = {
    opacity: useTransform(y, [isOverflowing ? 0.55 : 0.45, 0.6], [0, 1]),
    translateY: useTransform(y, [isOverflowing ? 0.5 : 0.4, 0.6], [100, 0]),
  };

  const calculateTypoSectionHeight = useEffectEvent(() => {
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
  });

  useEffect(() => {
    calculateTypoSectionHeight();
    const controller = new AbortController();
    window.addEventListener("resize", calculateTypoSectionHeight, {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <ScrollLogo y={y} />
      <div
        className={cn(
          "relative mx-auto mt-12.5 w-[90svw] max-w-[calc(64rem-(var(--spacing-left-nav)*3))] space-y-4 pt-5 md:mt-0 md:space-y-6 md:pt-13.5 lg:pt-6",
          {
            "z-[2] !pt-0 pl-5": isOverflowing,
          },
        )}
        style={{
          height: `${(typoSectionHeight / 16).toFixed(2)}rem`,
          marginTop: isOverflowing
            ? `calc(${(typoSectionHeight / 16).toFixed(2)}rem + 1.25rem)`
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
            aria-label="Go to TL;DR Terms website"
          >
            <TLDRTermsTypographyLogoIcon
              className={cn("h-auto w-25 text-slate-100", {
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
          {t.rich("title", {
            important: (chunks) => (
              <span className="block text-blue-500">{chunks}</span>
            ),
          })}
        </motion.h4>
        {isSm && isMoutned() && (
          <motion.div style={textStyle}>
            <Links className="flex flex-col gap-2.5" />
          </motion.div>
        )}
      </div>
      <motion.div
        style={monitorStyle}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <div className="relative aspect-[3082/2287] w-[90svw] max-w-[calc(64rem-(var(--spacing-left-nav)*3))]">
          <Image
            src="/tldrterms/xdr-display.webp"
            alt="imac"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </>
  );
}
