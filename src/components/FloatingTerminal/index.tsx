"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";

import Terminal from "@/components/Terminal";
import classNames from "classnames";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface FloatingTerminalProps extends PropsWithChildren {
  visible: boolean;
  animation?: boolean;
}
const FloatingTerminal: React.FC<FloatingTerminalProps> = ({
  visible,
  animation,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const terminal = useRef<HTMLDivElement>(null);
  const scrollContent = useRef<HTMLDivElement>(null);
  // const startIncreaseScrollY = useRef(0);
  const isLg = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!animation) return;
    const animate = () => {
      if (!ref.current || !isLg) return;
      const calc = (window.scrollY / window.innerHeight) * 100;
      const scaleValue = Math.min(50 + calc * 2, 100);
      const yScale = -10;
      const translateY = Math.min(yScale + calc, 0);
      ref.current.style.transform = `translateX(-50%) scale(${scaleValue}%)`;
      ref.current.style.bottom = `${translateY}%`;
      //once it is fully scaled and startIncreaseScrollY is not set
      // if (scaleValue >= 100 && startIncreaseScrollY.current === 0) {
      //   startIncreaseScrollY.current = window.scrollY;
      // } else if (scaleValue < 100 && startIncreaseScrollY.current !== 0) {
      //   startIncreaseScrollY.current = 0;
      // }
      // if (scaleValue >= 100 && terminal.current) {
      //   terminal.current.style.height = `calc(50svh + ${window.scrollY - startIncreaseScrollY.current}px)`;
      // }
    };
    window.addEventListener("scroll", animate);
    return () => window.removeEventListener("scroll", animate);
  }, [animation, isLg]);

  useEffect(() => {
    if (!isLg) {
      ref.current?.style.removeProperty("transform");
      ref.current?.style.removeProperty("bottom");
      terminal.current?.style.removeProperty("height");
    }
  }, [isLg]);

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
            "h-[55svh] max-h-[55svh] w-screen px-10 lg:mx-auto lg:h-[60svh] lg:max-h-[60svh] lg:w-[70vw]"
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
