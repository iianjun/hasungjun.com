import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { useIsInView } from "@/hooks/useIsInView";

const MAX_SCROLL = typeof window === "object" ? window.innerHeight / 2 : 0;

const HeroGroup = () => {
  const [group, groupInView] = useIsInView<HTMLDivElement>({
    options: { rootMargin: "0px 0px -50% 0px" },
  });
  const [left, leftInView] = useIsInView<HTMLImageElement>({
    options: { rootMargin: "0px 0px -50% 0px" },
  });
  const right = useRef<HTMLImageElement | null>(null);

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
    const handleScroll = () => {
      if (leftInView) {
        const top = leftElement?.getBoundingClientRect().top || -1;
        const initialViewPoint = window.innerHeight / 2;
        if (initialViewPoint > top) {
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [left, leftInView]);

  return (
    <section className="relative">
      <div
        className="mb-[4.375rem] mt-[3.125rem] h-[37.5rem] duration-600 ease-linear will-change-[opacity]"
        ref={group}
      >
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
          className="absolute bottom-0 left-[18%]"
          src="/tinydesk/hero-macbook-landing.png"
          alt="hero-macbook-landing"
          style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
        />
        <Image
          width={474}
          height={289}
          ref={right}
          priority
          style={{ transform: "matrix(1, 0, 0, 1, 0, 0)" }}
          className="absolute bottom-0 right-[18%]"
          src="/tinydesk/hero-macbook-widgets.png"
          alt="hero-macbook-widgets"
        />
      </div>
    </section>
  );
};

export default HeroGroup;
