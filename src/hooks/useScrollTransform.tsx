import { RefObject, useEffect, useRef } from "react";

/**
 *
 * @param { num: number of scroll content, stuckOffset: offset when the content is stuck }
 * @param { container: ref to the container, scrollContent: ref to the scroll content }
 */
export const useScrollTransform = (
  { num, stuckOffset }: { num: number; stuckOffset: number },
  [container, scrollContent]: [
    RefObject<HTMLDetailsElement | null>,
    RefObject<HTMLDivElement | null>,
  ],
) => {
  const topOffset = useRef(0);

  useEffect(() => {
    if (!container.current) return;
    const bodyHeight = document.body.scrollHeight;
    const sectionHeight = container.current.scrollHeight;
    topOffset.current = bodyHeight - sectionHeight;
  }, [container]);

  useEffect(() => {
    const handleScroll = () => {
      if (!container.current || !scrollContent.current) return;
      const value = window.scrollY - topOffset.current - stuckOffset;
      const sectionHeight = container.current.scrollHeight || 0;
      if (value < -stuckOffset) {
        scrollContent.current.setAttribute(
          "style",
          `transform: matrix(1, 0, 0, 1, 0, ${stuckOffset}); opacity: 0`,
        );
        return;
      }
      const imgContainers = Array.from(scrollContent.current.children);
      if (value <= 0) {
        scrollContent.current.setAttribute(
          "style",
          `transform: matrix(1, 0, 0, 1, 0, ${-value}); opacity: ${(value + stuckOffset) / stuckOffset}`,
        );
        for (const item of imgContainers) {
          item?.setAttribute("style", "transform: matrix(1, 0, 0, 1, 0, 0)");
          item.firstElementChild?.setAttribute("style", "opacity: 0");
        }
      }
      const scrollHeight = sectionHeight - stuckOffset - window.innerHeight;
      const skillsWidth = scrollContent.current.scrollWidth;
      if (value > 0) {
        const to = -skillsWidth + window.screen.width / 2;
        const ratio = scrollHeight / to;
        const imageRatio = scrollHeight / num;
        const toScaleIndex = Math.floor(value / imageRatio);
        const remainder = value / imageRatio - toScaleIndex;
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
        scrollContent.current.setAttribute(
          "style",
          `transform: matrix(1, 0, 0, 1, ${value / ratio}, 0); opacity: 1`,
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [container, scrollContent, num, stuckOffset]);
};
