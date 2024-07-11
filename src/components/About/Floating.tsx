"use client";

import React, { useEffect, useRef } from "react";

const Floating = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div
      className="pointer-events-none fixed -bottom-[10%] left-0 right-0 z-[2] m-0 w-full -translate-x-1/4 scale-50 p-0 leading-[0]"
      data-floating-animation
      ref={ref}
    >
      <div className="absolute bottom-0 left-0 right-0 translate-y-0">
        <div className="aspect-[4/1] h-full w-full px-40">
          <div className="h-full w-full rounded-t-[2rem] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Floating;
