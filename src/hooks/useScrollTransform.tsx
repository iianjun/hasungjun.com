import { RefObject, useEffect, useRef } from "react";

/**
 *
 * @param { num: number of scroll content, stuckOffset: offset when the content is stuck }
 * @param { container: ref to the container, scrollContent: ref to the scroll content }
 */
export const useScrollTransform = (
  { num, stuckOffset }: { num: number; stuckOffset: number },
  [container, scrollContent]: [
    RefObject<HTMLDetailsElement>,
    RefObject<HTMLDivElement>,
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
      if (value < -stuckOffset) return;
      const imgContainers = Array.from(scrollContent.current.children);
      if (value <= 0) {
        scrollContent.current.style.transform = `matrix(1, 0, 0, 1, 0, ${-value})`;
        scrollContent.current.style.opacity = `${(value + stuckOffset) / stuckOffset}`;
        for (const item of imgContainers) {
          (item as HTMLElement).style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
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
        for (let i = 0; i < imgContainers.length; i++) {
          const scale = 0.6 * remainder;
          // At the end
          if (toScaleIndex === num) {
            (imgContainers[num - 1] as HTMLElement).style.transform =
              `matrix(1.6, 0, 0, 1.6, 0, 0)`;
            (imgContainers[num - 1] as HTMLElement).style.zIndex = "2";
            (imgContainers[num - 2] as HTMLElement).style.transform =
              `matrix(1, 0, 0, 1, 0, 0)`;
          }
          //First item
          else if (i === toScaleIndex && toScaleIndex === 0) {
            (imgContainers[i] as HTMLElement).style.transform =
              `matrix(${1 + scale}, 0, 0, ${1 + scale}, 0, 0)`;
            (imgContainers[i] as HTMLElement).style.zIndex = "2";
          }
          // current index item
          else if (i === toScaleIndex) {
            (imgContainers[i] as HTMLElement).style.transform =
              `matrix(${1.3 + scale / 2}, 0, 0, ${1.3 + scale / 2}, 0, 0)`;
            (imgContainers[i] as HTMLElement).style.zIndex = "2";
          }
          // previous index item
          else if (toScaleIndex - 1 === i) {
            (imgContainers[i] as HTMLElement).style.transform =
              `matrix(${1.6 - scale}, 0, 0, ${1.6 - scale}, 0, 0)`;
          }
          // next index item
          else if (toScaleIndex + 1 === i) {
            (imgContainers[i] as HTMLElement).style.transform =
              `matrix(${1 + scale / 2}, 0, 0, ${1 + scale / 2}, 0, 0)`;
          }
          // rest of the items
          else {
            (imgContainers[i] as HTMLElement).style.transform =
              `matrix(1, 0, 0, 1, 0, 0)`;
            (imgContainers[i] as HTMLElement).style.zIndex = "1";
          }
        }
        scrollContent.current.style.transform = `matrix(1, 0, 0, 1, ${value / ratio}, 0)`;
        scrollContent.current.style.opacity = "1";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [container, scrollContent, num, stuckOffset]);
};
