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
    };
    window.addEventListener("scroll", animate);
    return () => window.removeEventListener("scroll", animate);
  }, [animation]);

  return (
    <div
      className="fixed -bottom-[10%] left-0 right-0 z-[2] m-0 w-full -translate-x-1/4 scale-50 p-0"
      ref={ref}
    >
      <div
        className={classNames("absolute bottom-0 left-0 right-0", {
          "translate-y-full": !visible,
          "translate-y-0": visible,
        })}
        data-floating-animation
      >
        <div className="px-40 xl:aspect-[3/1] 2xl:aspect-[3.7/1]">
          <div className="h-full max-h-screen w-full">
            <Terminal className="h-full w-full">{children}</Terminal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingTerminal;
