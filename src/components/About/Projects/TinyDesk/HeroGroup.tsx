import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { useIsInView } from "@/hooks/useIsInView";

// 594 -> -300

const HeroGroup = () => {
  const MAX_SCROLL = typeof window === "object" ? window.innerHeight / 2 : 0;
  const [left, leftInView] = useIsInView<HTMLImageElement>({
    options: { rootMargin: "0px 0px -50% 0px" },
  });
  const right = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const leftElement = left.current;
    const rightElement = right.current;
    const handleScroll = () => {
      if (leftInView) {
        const top = leftElement?.getBoundingClientRect().top || -1;
        const initialViewPoint = window.innerHeight / 2;
        if (initialViewPoint > top) {
          const currentScroll = Math.min(initialViewPoint - top, MAX_SCROLL);
          const value = Math.min(currentScroll * 0.083, 40);
          leftElement?.setAttribute(
            "style",
            `transform: matrix(1, 0, 0, 1, ${value}, 0)`,
          );
          rightElement?.setAttribute(
            "style",
            `transform: matrix(1, 0, 0, 1, -${value}, 0)`,
          );
        }
      } else {
        leftElement?.setAttribute(
          "style",
          `transform: matrix(1, 0, 0, 1, 0, 0);`,
        );
        rightElement?.setAttribute(
          "style",
          `transform: matrix(1, 0, 0, 1, 0, 0);`,
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [left, leftInView, MAX_SCROLL]);

  return (
    <section className="relative">
      <div className="mb-[4.375rem] mt-[3.125rem] h-[37.5rem]">
        <Image
          className="absolute left-1/2 -translate-x-1/2"
          src="/tinydesk/hero-mac.png"
          priority
          alt="hero-mac"
          width={710}
          height={600}
        />
        <Image
          width={474}
          height={273}
          ref={left}
          className="absolute bottom-0 left-[18%] -translate-x-[18%]"
          src="/tinydesk/hero-macbook-landing.png"
          alt="hero-macbook-landing"
        />
        <Image
          width={474}
          height={289}
          ref={right}
          priority
          className="absolute bottom-0 right-[18%] translate-x-[18%]"
          src="/tinydesk/hero-macbook-widgets.png"
          alt="hero-macbook-widgets"
        />
      </div>
    </section>
  );
};

export default HeroGroup;
