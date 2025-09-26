import React, { useEffect, useRef } from "react";
import { useIsInView, useMediaQuery } from "@/shared/lib";

import Image from "next/image";

const MAX_SCROLL = typeof window === "object" ? window.innerHeight / 2 : 0;

const HeroGroup = () => {
  const [group, groupInView] = useIsInView<HTMLDivElement>({
    options: { rootMargin: "0px 0px -50% 0px" },
  });
  const [left, leftInView] = useIsInView<HTMLDivElement>({
    options: { rootMargin: "0px 0px -50% 0px" },
  });
  const right = useRef<HTMLDivElement | null>(null);
  const isSm = useMediaQuery("(min-width: 48rem)");
  useEffect(() => {
    const groupElement = group.current;
    if (!groupElement) return;
    if (groupInView) {
      groupElement.style.opacity = "1";
    } else {
      groupElement.style.opacity = "0";
    }
  }, [group, groupInView]);

  useEffect(() => {
    const leftElement = left.current;
    const rightElement = right.current;
    if (!leftElement || !rightElement) return;
    const controller = new AbortController();
    const handleScroll = () => {
      if (leftInView) {
        const top = leftElement?.getBoundingClientRect().top || -1;
        const initialViewPoint = window.innerHeight / 2;
        if (initialViewPoint > top && isSm) {
          const currentScroll = Math.min(initialViewPoint - top, MAX_SCROLL);
          const value = Math.min(currentScroll * 0.083, 40);
          requestAnimationFrame(() => {
            leftElement.style.transform = `matrix(1, 0, 0, 1, ${value}, 0)`;
            rightElement.style.transform = `matrix(1, 0, 0, 1, -${value}, 0)`;
          });
        }
      } else {
        requestAnimationFrame(() => {
          leftElement.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
          rightElement.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, controller);
    return () => {
      controller.abort();
    };
  }, [left, leftInView, isSm]);

  return (
    <div className="overflow-hidden">
      <div
        className="relative mt-12.5 mb-17.5 h-61 transition-opacity duration-600 will-change-[opacity] md:h-100.5 lg:h-150"
        ref={group}
      >
        <div className="absolute left-1/2 h-53 w-62.5 -translate-x-1/2 md:h-100.5 md:w-119 lg:h-148.5 lg:w-176">
          <Image
            src="/tinydesk/hero-mac.png"
            priority
            fill
            alt="hero-mac"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div
          ref={left}
          className="absolute bottom-0 left-[calc(50%-8.5rem)] h-32.25 w-56 -translate-x-1/2 md:left-[calc(50%-14rem)] md:h-[12.59375rem] md:w-87.25 lg:left-[calc(50%-20rem)] lg:h-68.5 lg:w-118.5"
          style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
        >
          <Image
            fill
            src="/tinydesk/hero-macbook-landing.png"
            alt="hero-macbook-landing"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div
          ref={right}
          className="absolute right-[calc(50%-8.5rem)] bottom-0 h-34.25 w-56 translate-x-1/2 md:right-[calc(50%-14rem)] md:h-53.25 md:w-87.25 lg:right-[calc(50%-20rem)] lg:h-72.25 lg:w-118.5"
          style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
        >
          <Image
            fill
            src="/tinydesk/hero-macbook-widgets.png"
            alt="hero-macbook-widgets"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* <Image
          width={474}
          height={289}
          ref={right}
          priority
          style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          className="absolute right-[8%] bottom-0"
          src="/tinydesk/hero-macbook-widgets.png"
          alt="hero-macbook-widgets"
        /> */}
      </div>
    </div>
  );
};

export default HeroGroup;
