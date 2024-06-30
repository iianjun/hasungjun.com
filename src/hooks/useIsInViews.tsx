import { RefObject, useEffect, useState } from "react";
export const useIsInViews = (...refs: RefObject<HTMLElement>[]) => {
  const [isInViews, setIsInViews] = useState<boolean[]>(
    new Array(refs.length).fill(false),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const index = refs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) {
            setIsInViews((prev) => {
              const updatedInView = [...prev];
              updatedInView[index] = entry.isIntersecting;
              return updatedInView;
            });
          }
        });
      },
    );

    refs.forEach((ref) => {
      ref.current && observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        ref.current && observer.unobserve(ref.current);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isInViews;
};
