import { useEffect, useRef } from "react";

import { useIsInViews } from "./useIsInViews";

export const useScaleEntrance = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [isInView] = useIsInViews(ref);

  useEffect(() => {
    const element = ref.current;
    const beginScrollOffset = window.innerHeight / 2;
    const handleScroll = () => {
      const top = element?.getBoundingClientRect().top || -1;
      if (!isInView || !element || beginScrollOffset < top) return;
      requestAnimationFrame(() => {
        const value = Math.min(
          (beginScrollOffset - top) / beginScrollOffset,
          1,
        );
        element.style.opacity = `${value}`;
        element.style.transform = `scale(${value})`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isInView]);

  return ref;
};
