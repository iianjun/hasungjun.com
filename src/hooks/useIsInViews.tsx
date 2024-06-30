import { RefObject, useEffect, useState } from "react";
export const useIsInViews = ([...refs]: RefObject<Element>[]) => {
  const [isInViews, setIsInViews] = useState<boolean[]>(
    new Array(refs.length).fill(false),
  );
  useEffect(() => {
    refs.map((ref, i) => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInViews((prev) => {
          const newIsInViews = [...prev];
          newIsInViews[i] = entry.isIntersecting;
          return newIsInViews;
        });
      });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    });
  }, [refs]);
  return { isInViews };
};
