"use client";

import { Dock, DockItem } from "@/widgets/dock/ui/Dock";
import {
  DockGitHubIcon,
  DockLanguageIcon,
  DockLinkedInIcon,
  DockMessagesIcon,
  DockResumeIcon,
  DockTerminalIcon,
} from "@/shared/ui";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import { cn } from "@/shared/lib";
import { hideDock } from "@/features/dock-toggle";
import { useLocale } from "@/entities/locale/hooks/useLocale";
import { useMediaQuery } from "@/shared/lib";
import { useTranslations } from "next-intl";

const ITEMS: {
  type: string;
  src?: string;
  link?: Route;
  as: "link" | "button";
  isLCP?: boolean;
  icon?: React.ReactNode;
  label: string;
}[] = [
  {
    type: "terminal",
    link: "/",
    as: "link",
    icon: <DockTerminalIcon width={"100%"} height={"100%"} />,
    label: "Go to Home",
  },
  {
    type: "about",
    src: "/dock/dock-about.webp",
    link: "/about",
    as: "link",
    isLCP: true,
    label: "Go to about page",
  },
  {
    type: "resume",
    icon: <DockResumeIcon width={"100%"} height={"100%"} />,
    link: "/resume",
    as: "link",
    label: "Go to resume page",
  },
  {
    type: "messages",
    icon: <DockMessagesIcon width={"100%"} height={"100%"} />,
    link: "/messages",
    as: "link",
    label: "Go to messages page",
  },
  {
    type: "linkedIn",
    icon: <DockLinkedInIcon width={"100%"} height={"100%"} />,
    link: "https://www.linkedin.com/in/hasungjun/",
    as: "link",
    label: "Go to my LinkedIn",
  },
  {
    type: "gitHub",
    icon: <DockGitHubIcon width={"100%"} height={"100%"} />,
    link: "https://github.com/iianjun",
    as: "link",
    label: "Go to my GitHub",
  },
  {
    type: "language",
    icon: <DockLanguageIcon width={"100%"} height={"100%"} />,
    as: "button",
    label: "Change language",
  },
] as const;

export default function BottomNavBar({
  position = "bottom",
}: {
  position?: "left" | "bottom";
}) {
  const ref = useRef<HTMLElement>(null);
  const t = useTranslations("nav");
  const isShow = useAppSelector((state) => state.dock.show);
  const dispatch = useAppDispatch();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  useEffect(() => {
    const navRef = ref.current;
    const didMnt = !!navRef;
    setIsAnimationReady(didMnt);
  }, []);

  const horizontal = position === "bottom" || (position === "left" && !isLg);
  const { toggleLocale } = useLocale();

  useEffect(() => {
    if (!isLg) {
      dispatch(hideDock());
    }
    return () => {
      dispatch(hideDock());
    };
  }, [dispatch, isLg]);

  const handleClick = (type: string) => {
    const buttonTypes = ["language"];
    if (!buttonTypes.includes(type)) return;
    switch (type) {
      case "language":
        toggleLocale();
        break;
    }
  };

  const renderItemContent = (item: (typeof ITEMS)[number]) => {
    if (item.src) {
      return (
        <Image
          fill
          {...(item.isLCP
            ? {
                priority: true,
                fetchPriority: "high",
              }
            : {})}
          sizes="3.125rem"
          src={item.src}
          alt={t(item.type)}
          className="object-contain"
        />
      );
    }
    return item.icon;
  };

  return (
    <nav
      ref={ref}
      className={cn(
        "xs:w-auto fixed bottom-0 z-[11] flex w-full justify-center pb-[.625rem]",
        {
          "lg:animate-nav-fade-right lg:top-0 lg:left-0 lg:h-full lg:w-fit lg:flex-col lg:pl-[.625rem]":
            !horizontal,
          "left-1/2 -translate-x-1/2": horizontal,
          hidden: !isLg && !isShow && position === "left",
          "animate-nav-fade-up": isAnimationReady,
        },
      )}
    >
      <Dock
        position={horizontal ? "bottom" : "left"}
        enableAnimations={isAnimationReady}
      >
        {ITEMS.map((item) => (
          <DockItem key={item.type} label={t(item.type)}>
            {item.as === "link" && item.link ? (
              <Link
                href={item.link}
                className="relative h-full w-full"
                target={item.link.startsWith("/") ? undefined : "_blank"}
                rel={
                  item.link.startsWith("/") ? undefined : "noopener noreferrer"
                }
                aria-label={item.label}
              >
                {renderItemContent(item)}
              </Link>
            ) : (
              <button
                className="relative h-full w-full"
                onClick={() => handleClick(item.type)}
                aria-label={item.label}
              >
                {renderItemContent(item)}
              </button>
            )}
          </DockItem>
        ))}
      </Dock>
    </nav>
  );
}
