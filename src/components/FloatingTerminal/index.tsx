"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";

import Terminal from "@/components/Terminal";
import classNames from "classnames";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface FloatingTerminalProps extends PropsWithChildren {
  visible: boolean;
  animation?: boolean;
  autoScale?: boolean;
}
const FloatingTerminal: React.FC<FloatingTerminalProps> = ({
  visible,
  animation,
  autoScale,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const terminal = useRef<HTMLDivElement>(null);
  const scrollContent = useRef<HTMLDivElement>(null);
  const isLg = useMediaQuery("(min-width: 1024px)");
  // TODO: AutoScale
  // const startIncreaseScrollY = useRef(0);
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

  // useEffect(() => {
  //   if (!autoScale) return;
  //   const animate = () => {
  //     if (!terminal.current) return;
  //     terminal.current.style.maxHeight = "90svh";
  //     const calc = (window.scrollY / window.innerHeight) * 100;
  //     const scaleValue = Math.min(50 + calc * 2, 100);
  //     if (scaleValue >= 100 && startIncreaseScrollY.current === 0) {
  //       startIncreaseScrollY.current = window.scrollY;
  //     } else if (scaleValue < 100 && startIncreaseScrollY.current !== 0) {
  //       startIncreaseScrollY.current = 0;
  //     }
  //     if (scaleValue >= 100 && terminal.current) {
  //       terminal.current.style.height = `calc(55svh + ${window.scrollY - startIncreaseScrollY.current}px)`;
  //     }
  //   };
  //   window.addEventListener("scroll", animate);
  //   return () => {
  //     window.removeEventListener("scroll", animate);
  //   };
  // }, [autoScale, visible]);

  useEffect(() => {
    if (!isLg) {
      ref.current?.setAttribute(
        "style",
        "transform: translateX(-50%) scale: 1; bottom: 0%",
      );
      return;
    }
    if (!animation) return;
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
      className={classNames(
        "fixed left-1/2 right-0 z-[2] m-0 w-full -translate-x-1/2 p-0",
        {
          "bottom-0 scale-100 lg:-bottom-[10%] lg:scale-50": animation,
          "bottom-0 scale-100": !animation,
        },
      )}
      ref={ref}
    >
      <div
        className={classNames(
          "absolute bottom-0 left-0 right-0 transform transition-transform duration-[.35s] ease-in-out",
          {
            "translate-y-full": !visible,
            "translate-y-0": visible,
          },
        )}
      >
        <div
          className={
            "h-[55svh] max-h-[55svh] w-screen px-10 lg:mx-auto lg:h-[60svh] lg:max-h-[60svh] lg:w-[50vw]"
          }
          ref={terminal}
        >
          <Terminal className="h-full w-full" keepBorder hideShadow={!visible}>
            <div className="overflow-auto p-12" ref={scrollContent}>
              {children}
            </div>
          </Terminal>
        </div>
      </div>
    </div>
  );
};

export default FloatingTerminal;
