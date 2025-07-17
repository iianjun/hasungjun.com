import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useId } from "react";

import React from "react";
import { cn } from "@/utils/cn";

const ANIMATION_DURATION = 3;
const STROKE_WIDTH = 5;

const AnimatedLineLogo: React.FC<{ className?: string }> = ({ className }) => {
  const gradientId = useId();

  const stopColor = useMotionValue("#2b7fff");

  useEffect(() => {
    const controls = animate(stopColor, ["#2b7fff", "#9810fa", "#2b7fff"], {
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    });

    return () => controls.stop();
  }, [stopColor]);

  const logoPathMain = `M536.756 734.049C525.626 733.583 514.322 734.039 503.17 734.041L164.546 734.063C147.18 734.075 129.06 734.909 111.898 731.817C54.574 721.491 4.9916 673.373 0.385597 613.957C-0.399603 603.829 0.25559 593.411 0.26699 583.247L0.266792 149.279C0.275392 109.173 4.45179 80.0652 32.302 47.6406C58.33 17.3388 90.128 3.39182 129.446 0.271422C137.234 -0.315178 145.464 0.23022 153.298 0.24002L518 0.238616C529.98 0.230816 541.778 0.0358251 553.688 1.73003C611.276 9.92223 656.444 61.2314 665.614 117.241C667.932 131.389 667.602 145.881 667.596 160.165L667.594 573.185C667.602 586.495 667.926 599.927 666.15 613.153C656.774 682.959 602.404 723.809 536.756 734.049ZM136.888 89.4132C92.486 92.6672 88.45 125.197 88.452 161.585L88.458 564.757C88.462 598.477 89.72 638.775 134.27 645.021C145.58 646.605 158.042 645.545 169.498 645.523L497.886 645.497C508.27 645.495 518.896 645.019 529.258 645.501C578.108 637.265 577.216 602.279 577.212 562.609L577.22 161.529C577.222 151.349 577.53 140.705 575.83 130.651C569.352 92.3732 534.406 89.3372 504.148 89.3852H159.208C151.854 89.3772 144.204 88.9072 136.888 89.4132Z`;
  const logoPathInner1 = `M169.064 169.993H268.832C275.402 169.867 281.956 169.893 288.526 169.993V290.663H188.758H169.064C168.31 277.611 169.044 264.047 169.046 250.951L169.064 169.993Z`;
  const logoPathInner2 = `M296.562 530.355C347.03 488.585 357.1 441.613 356.826 380.821H433.156C433.81 452.073 407.732 502.369 356.826 548.907C348.376 555.163 339.934 560.931 330.528 565.715C319.918 553.405 306.486 543.217 296.562 530.355Z`;

  return (
    <div className={cn("aspect-[10/11] w-69", className)}>
      <svg viewBox="0 0 668 735" className="overflow-visible" fill="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {/* 3. Pass the single animated value to all three stops. */}
            <motion.stop offset="0%" stopColor={stopColor} stopOpacity="0.3" />
            <motion.stop offset="50%" stopColor={stopColor} stopOpacity="1" />
            <motion.stop
              offset="100%"
              stopColor={stopColor}
              stopOpacity="0.3"
            />
          </linearGradient>

          <motion.linearGradient
            id={`${gradientId}-moving`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            animate={{ x1: ["-100%", "100%"], x2: ["0%", "200%"] }}
            transition={{
              duration: ANIMATION_DURATION,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <stop offset="0%" stopColor="#2b7fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#9810fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#2b7fff" stopOpacity="0" />
          </motion.linearGradient>
        </defs>

        {/* ... All your <path> elements remain the same ... */}
        <path
          d={logoPathMain}
          stroke="#2b7fff"
          strokeWidth={STROKE_WIDTH}
          strokeOpacity="0.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathInner1}
          stroke="#2b7fff"
          strokeWidth={STROKE_WIDTH}
          strokeOpacity="0.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathInner2}
          stroke="#2b7fff"
          strokeWidth={STROKE_WIDTH}
          strokeOpacity="0.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathMain}
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathInner1}
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathInner2}
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathMain}
          stroke={`url(#${gradientId}-moving)`}
          strokeWidth={STROKE_WIDTH + 1}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathInner1}
          stroke={`url(#${gradientId}-moving)`}
          strokeWidth={STROKE_WIDTH + 1}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathInner2}
          stroke={`url(#${gradientId}-moving)`}
          strokeWidth={STROKE_WIDTH + 1}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={logoPathMain}
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE_WIDTH * 3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          filter="blur(3px)"
        />
        <path
          d={logoPathInner1}
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE_WIDTH * 3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          filter="blur(3px)"
        />
        <path
          d={logoPathInner2}
          stroke={`url(#${gradientId})`}
          strokeWidth={STROKE_WIDTH * 3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          filter="blur(3px)"
        />
      </svg>
    </div>
  );
};

export default AnimatedLineLogo;
