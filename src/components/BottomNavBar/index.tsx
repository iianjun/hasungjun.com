"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import { cn } from "@/utils/cn";
import { hideDock } from "@/redux/action/dockAction";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ITEMS: {
  name: string;
  src: string;
  link: Route;
}[] = [
  { name: "Terminal", src: "/dock/dock-terminal.svg", link: "/" },
  { name: "About", src: "/dock/dock-about.png", link: "/about" },
  { name: "Resume", src: "/dock/dock-resume.svg", link: "/resume" },
  { name: "Messages", src: "/dock/dock-messages.svg", link: "/messages" },
  {
    name: "LinkedIn",
    src: "/dock/dock-linkedin.svg",
    link: "https://www.linkedin.com/in/hasungjun/",
  },
  {
    name: "GitHub",
    src: "/dock/dock-github.svg",
    link: "https://github.com/iianjun",
  },
];
const BottomNavBar: React.FC<{ position?: "left" | "bottom" }> = ({
  position = "bottom",
}) => {
  const [mounted, setMounted] = useState(false);
  const isShow = useAppSelector((state) => state.dockReducer.show);
  const dispatch = useAppDispatch();
  const isLg = useMediaQuery("(min-width: 1024px)");

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
  if (!mounted) return <></>;
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
          "flex rounded-[1.25rem] border border-[#45474b] bg-[#53535340] p-2 backdrop-blur-md",
          {
            "lg:w-left-nav lg:flex-col": position === "left",
          },
        )}
      >
        {ITEMS.map((item, index) => (
          <li
            key={item.name}
            className={cn("group", {
              "pr-0": position === "left",
              "pb-3":
                position === "left" && ITEMS.length - 1 !== index && !isShow,
              "pr-3":
                (position === "bottom" || isShow) && ITEMS.length - 1 !== index,
            })}
          >
            <div className="ease-smooth relative h-[3.125rem] w-[3.125rem] transition-all duration-100 group-active:-mt-4 group-active:h-[3.75rem] group-active:w-[3.75rem] md:group-hover:-mt-[.625rem] md:group-hover:h-[3.75rem] md:group-hover:w-[3.75rem]">
              <Link
                href={item.link}
                target={item.link.startsWith("/") ? undefined : "_blank"}
                rel={
                  item.link.startsWith("/") ? undefined : "noopener noreferrer"
                }
              >
                <Image
                  width="0"
                  height="0"
                  className="h-full w-full"
                  sizes="3.5rem"
                  src={item.src}
                  alt={item.name}
                />
              </Link>
              <span
                className={cn(
                  "invisible absolute transform rounded-lg border border-black bg-[#27282a] px-3 py-1 text-center text-xs text-white shadow-[inset_0_0_0_1px_#47484a] group-active:visible md:group-hover:visible",
                  {
                    "top-1/2 left-[calc(100%_+_1rem)] -translate-y-1/2":
                      position === "left",
                    "bottom-[calc(100%_+_1rem)] left-1/2 -translate-x-1/2":
                      position === "bottom",
                  },
                )}
                role="tooltip"
              >
                {item.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
