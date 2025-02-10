import { RefObject, useEffect, useRef, useState } from "react";

export const useResize = <T extends HTMLElement>(): [
  RefObject<T | null>,
  number,
] => {
  const [height, setHeight] = useState(0);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setHeight(entry.target.clientHeight);
    });

    if (observeTarget) {
      resizeObserver.observe(observeTarget);
    }

    return () => {
      if (observeTarget) {
        resizeObserver.unobserve(observeTarget);
      }
    };
  }, [ref]);

  return [ref, height];
};
