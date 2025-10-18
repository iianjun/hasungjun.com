"use client";

import { Dock, DockItem } from "@/widgets/dock/ui/Dock";
import React, { useEffect, useState } from "react";
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
  src: string;
  link?: Route;
  as: "link" | "button";
}[] = [
  { type: "terminal", src: "/dock/dock-terminal.svg", link: "/", as: "link" },
  { type: "about", src: "/dock/dock-about.png", link: "/about", as: "link" },
  { type: "resume", src: "/dock/dock-resume.svg", link: "/resume", as: "link" },
  {
    type: "messages",
    src: "/dock/dock-messages.svg",
    link: "/messages",
    as: "link",
  },
  {
    type: "linkedIn",
    src: "/dock/dock-linkedin.svg",
    link: "https://www.linkedin.com/in/hasungjun/",
    as: "link",
  },
  {
    type: "gitHub",
    src: "/dock/dock-github.svg",
    link: "https://github.com/iianjun",
    as: "link",
  },
  {
    type: "language",
    src: "/dock/dock-language.svg",
    as: "button",
  },
] as const;

export const BottomNavBar: React.FC<{ position?: "left" | "bottom" }> = ({
  position = "bottom",
}) => {
  const t = useTranslations("nav");
  const [mounted, setMounted] = useState(false);
  const isShow = useAppSelector((state) => state.dock.show);
  const dispatch = useAppDispatch();
  const isLg = useMediaQuery("(min-width: 1024px)");
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (type: string) => {
    const buttonTypes = ["language"];
    if (!buttonTypes.includes(type)) return;
    switch (type) {
      case "language":
        toggleLocale();
        break;
    }
  };

  if (!mounted) return null;
  return (
    <nav
      className={cn(
        "animate-nav-fade-up xs:w-auto fixed bottom-0 z-[11] flex w-full justify-center pb-[.625rem]",
        {
          "lg:animate-nav-fade-right lg:top-0 lg:left-0 lg:h-full lg:w-fit lg:flex-col lg:pl-[.625rem]":
            !horizontal,
          "left-1/2 -translate-x-1/2": horizontal,
          hidden: !isLg && !isShow && position === "left",
        },
      )}
    >
      <Dock position={horizontal ? "bottom" : "left"}>
        {ITEMS.map((item) => (
          <DockItem key={item.type} label={t(item.type)}>
            {item.as === "link" && item.link ? (
              <Link
                href={item.link}
                target={item.link.startsWith("/") ? undefined : "_blank"}
                rel={
                  item.link.startsWith("/") ? undefined : "noopener noreferrer"
                }
              >
                <Image
                  fill
                  sizes="3.125rem"
                  src={item.src}
                  alt={t(item.type)}
                  className="object-contain"
                />
              </Link>
            ) : (
              <button onClick={() => handleClick("language")}>
                <Image
                  fill
                  sizes="3.125rem"
                  src={item.src}
                  alt={t(item.type)}
                  className="object-contain"
                />
              </button>
            )}
          </DockItem>
        ))}
      </Dock>
    </nav>
  );
};
