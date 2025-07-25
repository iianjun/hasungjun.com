"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useId, useRef } from "react";

const GRADIENT_COLORS = ["#2b7fff", "#2b7fff", "#9810fa"];
const STROKE_WIDTH = 5;
const SIZE = {
  width: 668,
  height: 735,
};
const AnimatedGradient = ({
  id,
  x1,
  x2,
}: {
  id: string;
  x1: MotionValue<number>;
  x2: MotionValue<number>;
}) => (
  <motion.linearGradient
    id={id}
    gradientUnits="userSpaceOnUse"
    // Pass the motion values directly as attributes
    x1={x1}
    x2={x2}
  >
    <stop stopColor={GRADIENT_COLORS[0]} stopOpacity="0" />
    <stop stopColor={GRADIENT_COLORS[1]} />
    <stop offset="1" stopColor={GRADIENT_COLORS[2]} stopOpacity="0" />
  </motion.linearGradient>
);

const ScrollLogo = () => {
  const borderId = useId();
  const dotId = useId();
  const commaId = useId();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const borderX1 = useTransform(scrollYProgress, [0, 1], [0, SIZE.width * 2]);
  const borderX2 = useTransform(scrollYProgress, [0, 1], [0, SIZE.width]);

  const dotX1 = useTransform(scrollYProgress, [0.2, 0.7], [0, SIZE.width * 2]);
  const dotX2 = useTransform(scrollYProgress, [0.2, 0.7], [0, SIZE.width]);

  const commaX1 = useTransform(
    scrollYProgress,
    [0.4, 0.9],
    [0, SIZE.width * 2],
  );
  const commaX2 = useTransform(scrollYProgress, [0.4, 0.9], [0, SIZE.width]);

  return (
    <>
      <div className="h-svh" />
      <div ref={ref} className="relative h-[300svh]">
        <div className="sticky top-1/2 mx-auto h-76 w-69 -translate-y-1/2 md:h-110 md:w-100">
          <svg viewBox={`0 0 ${SIZE.width} ${SIZE.height}`} fill="none">
            <path
              d={
                "M536.756 734.049C525.626 733.583 514.322 734.039 503.17 734.041L164.546 734.063C147.18 734.075 129.06 734.909 111.898 731.817C54.574 721.491 4.9916 673.373 0.385597 613.957C-0.399603 603.829 0.25559 593.411 0.26699 583.247L0.266792 149.279C0.275392 109.173 4.45179 80.0652 32.302 47.6406C58.33 17.3388 90.128 3.39182 129.446 0.271422C137.234 -0.315178 145.464 0.23022 153.298 0.24002L518 0.238616C529.98 0.230816 541.778 0.0358251 553.688 1.73003C611.276 9.92223 656.444 61.2314 665.614 117.241C667.932 131.389 667.602 145.881 667.596 160.165L667.594 573.185C667.602 586.495 667.926 599.927 666.15 613.153C656.774 682.959 602.404 723.809 536.756 734.049ZM136.888 89.4132C92.486 92.6672 88.45 125.197 88.452 161.585L88.458 564.757C88.462 598.477 89.72 638.775 134.27 645.021C145.58 646.605 158.042 645.545 169.498 645.523L497.886 645.497C508.27 645.495 518.896 645.019 529.258 645.501C578.108 637.265 577.216 602.279 577.212 562.609L577.22 161.529C577.222 151.349 577.53 140.705 575.83 130.651C569.352 92.3732 534.406 89.3372 504.148 89.3852H159.208C151.854 89.3772 144.204 88.9072 136.888 89.4132Z"
              }
              stroke={`url(#${borderId})`}
              strokeLinecap="round"
              strokeWidth={STROKE_WIDTH}
            />
            <path
              d={
                "M169.064 169.993H268.832C275.402 169.867 281.956 169.893 288.526 169.993V290.663H188.758H169.064C168.31 277.611 169.044 264.047 169.046 250.951L169.064 169.993Z"
              }
              stroke={`url(#${dotId})`}
              strokeLinecap="round"
              strokeWidth={STROKE_WIDTH}
            />
            <path
              d={
                "M296.562 530.355C347.03 488.585 357.1 441.613 356.826 380.821H433.156C433.81 452.073 407.732 502.369 356.826 548.907C348.376 555.163 339.934 560.931 330.528 565.715C319.918 553.405 306.486 543.217 296.562 530.355Z"
              }
              stroke={`url(#${commaId})`}
              strokeLinecap="round"
              strokeWidth={STROKE_WIDTH}
            />
            <defs>
              <AnimatedGradient id={borderId} x1={borderX1} x2={borderX2} />
              <AnimatedGradient id={dotId} x1={dotX1} x2={dotX2} />
              <AnimatedGradient id={commaId} x1={commaX1} x2={commaX2} />
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
};

export default ScrollLogo;
