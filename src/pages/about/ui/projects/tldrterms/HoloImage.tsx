import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import dynamic from "next/dynamic";
import { useMediaQuery } from "@/shared/lib";
import { useRef } from "react";

const Image = dynamic(() => import("next/image"), { ssr: false });
export default function HoloImage() {
  const ref = useRef<HTMLDivElement>(null);
  const isMd = useMediaQuery("(min-width: 48rem)");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glareOpacity = useMotionValue(0);

  // initial mouse enter smooth animation
  const springConfig = { stiffness: 150, damping: 20, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-200, 200], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-200, 200], [-12, 12]);

  const handleMouseEnter = () => {
    animate(glareOpacity, 1, { duration: 0.2 });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();

    mouseX.set(event.clientX - left - width / 2);
    mouseY.set(event.clientY - top - height / 2);

    const glareX = ((event.clientX - left) / width) * 100;
    const glareY = ((event.clientY - top) / height) * 100;
    ref.current.style.setProperty("--glare-x", `${glareX}%`);
    ref.current.style.setProperty("--glare-y", `${glareY}%`);
  };

  const handleMouseLeave = () => {
    animate(glareOpacity, 0, { duration: 0.3, ease: "easeOut" });
    mouseX.set(0);
    mouseY.set(0);
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1500px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="max-h-148 overflow-hidden rounded-2xl leading-0 shadow-[0_0_60px_10px_#232431] md:max-h-none"
        whileHover={{ scale: 1.025 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Image
          src={
            isMd ? "/tldrterms/landing.webp" : "/tldrterms/landing-mobile.webp"
          }
          width={isMd ? 1520 : 528}
          height={isMd ? 865 : 689}
          priority
          alt="TL;DR Terms Landing page"
          style={{ width: "100%", height: "auto" }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glareOpacity,
            background:
              "radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%)",
            mixBlendMode: "overlay",
            borderRadius: "inherit",
          }}
        />
      </motion.div>
    </div>
  );
}
