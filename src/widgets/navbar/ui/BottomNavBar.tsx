"use client";

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
      id="nav-dock"
      className={cn("animate-nav-fade-up bottom-0 w-full pb-[.625rem]", {
        "lg:animate-nav-fade-right lg:top-0 lg:left-0 lg:h-full lg:w-fit lg:flex-col lg:pl-[.625rem]":
          position === "left",
        hidden: !isLg && !isShow && position === "left",
      })}
    >
      <ul
        className={cn(
          "border-nav-border bg-nav-dock-bg/40 flex rounded-[1.25rem] border p-2 backdrop-blur-md",
          {
            "lg:w-left-nav lg:flex-col": position === "left",
          },
        )}
      >
        {ITEMS.map((item, index) => (
          <li
            key={item.type}
            className={cn("group", {
              "pr-0": position === "left",
              "pb-3":
                position === "left" && ITEMS.length - 1 !== index && !isShow,
              "pr-3":
                (position === "bottom" || isShow) && ITEMS.length - 1 !== index,
            })}
          >
            <div className="ease-smooth relative h-12.5 w-12.5 transition-all duration-100 group-active:-mt-4 group-active:h-[3.75rem] group-active:w-[3.75rem] md:group-hover:-mt-[.625rem] md:group-hover:h-[3.75rem] md:group-hover:w-[3.75rem]">
              {item.as === "link" && item.link ? (
                <Link
                  href={item.link}
                  target={item.link.startsWith("/") ? undefined : "_blank"}
                  rel={
                    item.link.startsWith("/")
                      ? undefined
                      : "noopener noreferrer"
                  }
                >
                  <Image
                    fill
                    sizes="3.125rem"
                    src={item.src}
                    alt={t(item.type)}
                  />
                </Link>
              ) : (
                <button onClick={() => handleClick("language")}>
                  <Image
                    fill
                    sizes="3.125rem"
                    src={item.src}
                    alt={t(item.type)}
                  />
                </button>
              )}

              <span
                className={cn(
                  "bg-nav-tooltip-bg invisible absolute transform rounded-lg border border-black px-3 py-1 text-center text-xs whitespace-nowrap text-white shadow-[inset_0_0_0_1px_#47484a] group-active:visible md:group-hover:visible",
                  {
                    "top-1/2 left-[calc(100%_+_1rem)] -translate-y-1/2":
                      position === "left",
                    "bottom-[calc(100%_+_1rem)] left-1/2 -translate-x-1/2":
                      position === "bottom",
                  },
                )}
                role="tooltip"
              >
                {t(item.type)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};
