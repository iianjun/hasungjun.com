import { RefObject, useEffect, useEffectEvent, useRef } from "react";

/**
 *
 * @param { num: number of scroll content, stuckOffset: offset when the content is stuck }
 * @param { container: ref to the container, scrollContent: ref to the scroll content }
 */
export const useScrollTransform = (
  { num }: { num: number },
  [container, scrollContent]: [
    RefObject<HTMLDetailsElement | null>,
    RefObject<HTMLDivElement | null>,
  ],
) => {
  const topOffset = useRef(0);
  const stuckOffset = useRef(0);
  const updateTopOffset = useEffectEvent(() => {
    if (!container.current) return;
    const bodyHeight = document.body.scrollHeight;
    const sectionHeight = container.current.scrollHeight;
    topOffset.current = bodyHeight - sectionHeight;
  });

  const updateStuckOffset = useEffectEvent(() => {
    stuckOffset.current = window.innerHeight / 2;
  });

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener("resize", updateTopOffset, controller);
    window.addEventListener("resize", updateStuckOffset, controller);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    updateTopOffset();
    updateStuckOffset();
  }, []);

  useEffect(() => {
    let rafId = 0;

    const setStyle = (
      el: Element | null | undefined,
      transform: string,
      opacity?: string,
      zIndex?: string,
    ) => {
      if (!el) return;
      const s = (el as HTMLElement).style;
      s.transform = transform;
      if (opacity !== undefined) s.opacity = opacity;
      if (zIndex !== undefined) s.zIndex = zIndex;
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!container.current || !scrollContent.current) return;
        const currentScroll = window.scrollY - topOffset.current;
        const sc = scrollContent.current.style;
        if (currentScroll < 0) {
          sc.transform = `matrix(1, 0, 0, 1, 0, ${stuckOffset.current.toFixed(2)})`;
          sc.opacity = "0";
          return;
        }
        const imgContainers = Array.from(scrollContent.current.children);
        // Going up animation & opacity
        if (currentScroll <= stuckOffset.current) {
          sc.transform = `matrix(1, 0, 0, 1, 0, ${(stuckOffset.current - currentScroll).toFixed(2)})`;
          sc.opacity = (currentScroll / stuckOffset.current).toFixed(2);
          for (const item of imgContainers) {
            setStyle(item, "matrix(1, 0, 0, 1, 0, 0)");
            setStyle(item.firstElementChild, "", "0");
          }
        }
        //Going left
        else {
          const sectionHeight = container.current.scrollHeight;
          const scrollableHeight =
            sectionHeight - stuckOffset.current - window.innerHeight;

          const skillsWidth = scrollContent.current.scrollWidth - 100;
          const toLeftPerScrollRatio = scrollableHeight / skillsWidth;
          const scrollSinceStuck = currentScroll - stuckOffset.current;
          const toLeft = -scrollSinceStuck / toLeftPerScrollRatio;
          sc.transform = `matrix(1, 0, 0, 1, ${toLeft}, 0)`;
          sc.opacity = "1";
          const imageRatio = scrollableHeight / num;
          const toScaleIndex = Math.floor(scrollSinceStuck / imageRatio);
          const remainder = scrollSinceStuck / imageRatio - toScaleIndex;
          const scale = 0.6 * remainder;

          // End state — lock final item, reset the rest
          if (toScaleIndex === num) {
            for (let i = 0; i < imgContainers.length; i++) {
              const item = imgContainers[i];
              if (i === num - 1) {
                setStyle(item, "matrix(1.6, 0, 0, 1.6, 0, 0)", undefined, "2");
                setStyle(item.firstElementChild, "", "1");
              } else {
                setStyle(item, "matrix(1, 0, 0, 1, 0, 0)", undefined, "1");
                setStyle(item.firstElementChild, "", "0");
              }
            }
          } else {
            for (let i = 0; i < imgContainers.length; i++) {
              const item = imgContainers[i];
              const tooltip = item.firstElementChild;
              const dist = i - toScaleIndex;

              switch (dist) {
                case 0: {
                  const s = toScaleIndex === 0 ? 1 + scale : 1.3 + scale / 2;
                  const op =
                    toScaleIndex === 0 ? remainder : remainder / 2 + 0.5;
                  setStyle(
                    item,
                    `matrix(${s}, 0, 0, ${s}, 0, 0)`,
                    undefined,
                    "2",
                  );
                  setStyle(tooltip, "", `${op}`);
                  break;
                }
                case -1: {
                  const s = 1.6 - scale;
                  setStyle(item, `matrix(${s}, 0, 0, ${s}, 0, 0)`);
                  setStyle(tooltip, "", `${1 - remainder}`);
                  break;
                }
                case 1: {
                  const s = 1 + scale / 2;
                  setStyle(item, `matrix(${s}, 0, 0, ${s}, 0, 0)`);
                  setStyle(tooltip, "", `${remainder / 2}`);
                  break;
                }
                default:
                  setStyle(item, "matrix(1, 0, 0, 1, 0, 0)", undefined, "1");
                  setStyle(tooltip, "", "0");
              }
            }
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [container, scrollContent, num, stuckOffset]);
};
