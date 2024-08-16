import { useEffect, useRef, useState } from "react";
export const useIsInView = <T extends HTMLElement>({
  callback,
  options = {},
}: {
  callback?: (_: IntersectionObserverEntry) => void;
  options: IntersectionObserverInit;
}) => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        callback && callback(entry);
        setIsInView(entry.isIntersecting);
      },
      options,
    );
    ref.current && observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, isInView] as const;
};
