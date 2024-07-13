"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";

import Terminal from "@/components/Terminal";
import classNames from "classnames";

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
  const startIncreaseScrollY = useRef(0);
  useEffect(() => {
    if (!animation) return;
    const animate = () => {
      if (!ref.current) return;
      const calc = (window.scrollY / window.innerHeight) * 100;
      const translateX = Math.min(-25 + calc, 0);
      const scaleValue = Math.min(50 + calc * 2, 100);
      const yScale = -10;
      const translateY = Math.min(yScale + calc, 0);
      ref.current.style.transform = `translateX(${translateX}%) scale(${scaleValue}%)`;
      ref.current.style.bottom = `${translateY}%`;
      //once it is fully scaled and startIncreaseScrollY is not set
      if (scaleValue >= 100 && startIncreaseScrollY.current === 0) {
        startIncreaseScrollY.current = window.scrollY;
      } else if (scaleValue < 100 && startIncreaseScrollY.current !== 0) {
        startIncreaseScrollY.current = 0;
      }
      if (scaleValue >= 100 && terminal.current) {
        terminal.current.style.height = `calc(50vh + ${window.scrollY - startIncreaseScrollY.current}px)`;
      }
    };
    window.addEventListener("scroll", animate);
    return () => window.removeEventListener("scroll", animate);
  }, [animation]);

  return (
    <div
      className={classNames("fixed left-0 right-0 z-[2] m-0 w-full p-0", {
        "-bottom-[10%] -translate-x-1/4 scale-50": animation,
        "bottom-0 translate-x-0 scale-100": !animation,
      })}
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
          className="max-w-screen h-[60svh] max-h-[60svh] px-40"
          ref={terminal}
        >
          <Terminal className="h-full w-full">{children}</Terminal>
        </div>
      </div>
    </div>
  );
};

export default FloatingTerminal;
