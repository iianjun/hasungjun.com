import { RefObject, useCallback, useEffect, useRef } from "react";

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
  const updateTopOffset = useCallback(() => {
    if (!container.current) return;
    const bodyHeight = document.body.scrollHeight;
    const sectionHeight = container.current.scrollHeight;
    topOffset.current = bodyHeight - sectionHeight;
  }, [container]);

  const updateStuckOffset = useCallback(() => {
    stuckOffset.current = window.innerHeight / 2;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener("resize", updateTopOffset, controller);
    window.addEventListener("resize", updateStuckOffset, controller);
    return () => controller.abort();
  }, [updateTopOffset, updateStuckOffset]);

  useEffect(() => {
    updateTopOffset();
    updateStuckOffset();
  }, [updateTopOffset, updateStuckOffset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!container.current || !scrollContent.current) return;
      const currentScroll = window.scrollY - topOffset.current;
      if (currentScroll < 0) {
        scrollContent.current.setAttribute(
          "style",
          `transform: matrix(1, 0, 0, 1, 0, ${stuckOffset.current.toFixed(2)}); opacity: 0`,
        );
        return;
      }
      const imgContainers = Array.from(scrollContent.current.children);
      // Going up animation & opacity
      if (currentScroll <= stuckOffset.current) {
        scrollContent.current.setAttribute(
          "style",
          `transform: matrix(1, 0, 0, 1, 0, ${(stuckOffset.current - currentScroll).toFixed(2)}); opacity: ${(currentScroll / stuckOffset.current).toFixed(2)}`,
        );
        for (const item of imgContainers) {
          item?.setAttribute("style", "transform: matrix(1, 0, 0, 1, 0, 0)");
          item.firstElementChild?.setAttribute("style", "opacity: 0");
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
        scrollContent.current.setAttribute(
          "style",
          `transform: matrix(1, 0, 0, 1, ${toLeft}, 0); opacity: 1`,
        );
        const imageRatio = scrollableHeight / num;
        const toScaleIndex = Math.floor(scrollSinceStuck / imageRatio);
        const remainder = scrollSinceStuck / imageRatio - toScaleIndex;
        const scale = 0.6 * remainder;
        for (let i = 0; i < imgContainers.length; i++) {
          const item = imgContainers[i];
          const tooltip = item.firstElementChild;
          // At the end
          if (toScaleIndex === num) {
            const current = imgContainers.at(num - 1);
            const currentTooltip = current?.firstElementChild;
            const prev = current?.previousElementSibling;
            const prevTooltip = prev?.firstElementChild;
            current?.setAttribute(
              "style",
              `transform: matrix(1.6, 0, 0, 1.6, 0, 0); z-index: 2`,
            );
            currentTooltip?.setAttribute("style", `opacity: 1`);

            prev?.setAttribute("style", `transform: matrix(1, 0, 0, 1, 0, 0)`);
            prevTooltip?.setAttribute("style", `opacity: 0`);
          }
          //First item
          else if (i === toScaleIndex && toScaleIndex === 0) {
            item.setAttribute(
              "style",
              `transform: matrix(${1 + scale}, 0, 0, ${1 + scale}, 0, 0); z-index: 2`,
            );
            tooltip?.setAttribute("style", `opacity: ${remainder}`);
          }
          // current index item
          else if (i === toScaleIndex) {
            tooltip?.setAttribute("style", `opacity: ${remainder / 2 + 0.5}`);
            item.setAttribute(
              "style",
              `transform: matrix(${1.3 + scale / 2}, 0, 0, ${1.3 + scale / 2}, 0, 0); z-index: 2`,
            );
          }
          // previous index item
          else if (toScaleIndex - 1 === i) {
            item.setAttribute(
              "style",
              `transform: matrix(${1.6 - scale}, 0, 0, ${1.6 - scale}, 0, 0)`,
            );
            tooltip?.setAttribute("style", `opacity: ${1 - remainder}`);
          }
          // next index item
          else if (toScaleIndex + 1 === i) {
            item.setAttribute(
              "style",
              `transform: matrix(${1 + scale / 2}, 0, 0, ${1 + scale / 2}, 0, 0)`,
            );
            tooltip?.setAttribute("style", `opacity: ${remainder / 2}`);
          }
          // rest of the items
          else {
            item.setAttribute(
              "style",
              `transform: matrix(1, 0, 0, 1, 0, 0); z-index: 1`,
            );
            tooltip?.setAttribute("style", "opacity: 0");
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [container, scrollContent, num, stuckOffset]);
};
