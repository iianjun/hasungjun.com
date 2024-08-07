import { MutableRefObject, useEffect, useRef } from "react";

import { useIsInViews } from "./useIsInViews";

export const useEntrance = <
  T extends HTMLElement,
>(): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null);
  const [isInView] = useIsInViews(ref);

  useEffect(() => {
    const element = ref.current;
    const beginScrollOffset = window.innerHeight / 2;
    const handleScroll = () => {
      const top = element?.getBoundingClientRect().top || -1;
      const bottom = window.innerHeight + top;
      if (bottom < 0) {
        element?.setAttribute("style", "opacity: 0");
        return;
      } else if (beginScrollOffset < top) {
        element?.setAttribute("style", "opacity: 1");
        return;
      }
      if (!isInView || !element) return;
      if (bottom < beginScrollOffset) {
        requestAnimationFrame(() => {
          const value = 1 - (beginScrollOffset - bottom) / beginScrollOffset;
          element.style.opacity = `${value}`;
        });
      } else {
        requestAnimationFrame(() => {
          const value = Math.min(
            (beginScrollOffset - top) / beginScrollOffset,
            1,
          );
          element.style.opacity = `${value}`;
        });
      }
    };
    if (isInView) {
      window.addEventListener("scroll", handleScroll);
    } else {
      // element?.setAttribute("style", "opacity: 0");
      window.removeEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isInView]);

  return ref;
};
