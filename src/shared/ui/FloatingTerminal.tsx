"use client";

import { PropsWithChildren, useEffect, useRef } from "react";

import { Terminal } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { useMediaQuery } from "@/shared/lib";

export interface FloatingTerminalProps extends PropsWithChildren {
  visible: boolean;
  animation?: boolean;
}
export const FloatingTerminal = ({
  visible,
  animation,
  children,
}: FloatingTerminalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const terminal = useRef<HTMLDivElement>(null);
  const scrollContent = useRef<HTMLDivElement>(null);
  const isLg = useMediaQuery("(min-width: 1024px)");
  useEffect(() => {
    if (!animation) return;
    const animate = () => {
      if (!ref.current || !isLg) return;
      const calc = (window.scrollY / window.innerHeight) * 100;
      const scaleValue = Math.min(50 + calc * 2, 100);
      const yScale = -10;
      const translateY = Math.min(yScale + calc, 0);
      ref.current.setAttribute(
        "style",
        `transform: translateX(-50%) scale(${scaleValue}%); bottom: ${translateY}%`,
      );
    };
    window.addEventListener("scroll", animate);
    return () => window.removeEventListener("scroll", animate);
  }, [animation, isLg]);

  useEffect(() => {
    if (!isLg) {
      ref.current?.setAttribute(
        "style",
        "transform: translateX(-50%) scale(1); bottom: 0%",
      );
      return;
    }
    if (!animation) {
      ref.current?.setAttribute("style", "transform: translateX(-50%)");
      return;
    }
    const calc = (window.scrollY / window.innerHeight) * 100;
    const scaleValue = Math.min(50 + calc * 2, 100);
    const yScale = -10;
    const translateY = Math.min(yScale + calc, 0);
    ref.current?.setAttribute(
      "style",
      `transform: translateX(-50%) scale(${scaleValue}%); bottom: ${translateY}%`,
    );
  }, [isLg, animation]);

  useEffect(() => {
    if (!visible) {
      scrollContent.current?.scrollTo({ top: 0 });
    }
  }, [visible]);

  return (
    <div
      className={
        "fixed right-0 bottom-0 left-1/2 z-[2] m-0 w-full scale-100 p-0"
      }
      ref={ref}
    >
      <div
        className={cn(
          "absolute right-0 bottom-0 left-0 transform transition-transform duration-[.35s] ease-in-out",
          {
            "translate-y-full": !visible,
            "translate-y-0": visible,
          },
        )}
      >
        <div
          className={
            "h-[50svh] max-h-[50svh] w-screen max-w-screen-lg px-6 sm:h-[55svh] sm:max-h-[55svh] lg:mx-auto lg:h-[60svh] lg:max-h-[60svh] lg:w-[80vw]"
          }
          ref={terminal}
        >
          <Terminal
            className="bg-background h-full w-full"
            keepBorder
            hideShadow={!visible}
          >
            <div
              className="hide-scrollbar overflow-auto p-4 lg:p-[1.875rem]"
              ref={scrollContent}
            >
              {children}
            </div>
          </Terminal>
        </div>
      </div>
    </div>
  );
};
