import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useIsInView } from "@/shared/lib";

const IS_DEV = process.env.NODE_ENV === "development";
export default function ViewLoader() {
  const didRun = useRef(false);
  const [ref, isInView] = useIsInView<HTMLDivElement>({
    options: {
      threshold: 0.5,
    },
  });
  const [progress, setProgress] = useState(IS_DEV ? 100 : 0);

  useEffect(() => {
    if (!isInView || didRun.current || IS_DEV) return;
    didRun.current = true;
    let start: number;
    let rafId: number;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const next = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(next);
      if (next < 100) {
        rafId = requestAnimationFrame(animate);
      }
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  const isDone = progress === 100;

  return (
    <motion.div
      ref={ref}
      className="flex-center absolute inset-0 z-10 rounded-3xl bg-black"
      animate={{
        visibility: isDone ? "hidden" : "visible",
        opacity: isDone ? 0 : 1,
      }}
      transition={{
        duration: 0.4,
        delay: 0.5,
      }}
    >
      <div className="bg-progress/40 relative h-2 w-35 rounded-full">
        <motion.div
          className={`h-full rounded-full bg-white`}
          initial={false}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}
