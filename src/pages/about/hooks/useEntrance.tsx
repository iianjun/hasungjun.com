import { RefObject, useEffect, useRef } from "react";

import { useIsInViews } from "@/shared/lib";

export const useEntrance = <T extends HTMLElement>(): RefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const [isInView] = useIsInViews(ref);

  useEffect(() => {
    if (!isInView) return;
    const element = ref.current;
    if (!element) return;
    const beginScrollOffset = window.innerHeight / 2;
    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const top = element.getBoundingClientRect().top;
        const bottom = window.innerHeight + top;
        if (bottom < 0) {
          element.style.opacity = "0";
        } else if (beginScrollOffset < top) {
          element.style.opacity = "1";
        } else if (bottom < beginScrollOffset) {
          element.style.opacity = `${1 - (beginScrollOffset - bottom) / beginScrollOffset}`;
        } else {
          element.style.opacity = `${Math.min((beginScrollOffset - top) / beginScrollOffset, 1)}`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isInView]);

  return ref;
};
