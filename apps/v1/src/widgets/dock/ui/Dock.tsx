"use client";

import {
  DocContextType,
  DockItemProps,
  DockLabelProps,
  DockProps,
  DockProviderProps,
} from "../model/types";
import { cn, useMediaQuery } from "@/shared/lib";
import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useRef,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MAGNIFICATION = 80;
const DISTANCE = 150;

const DockContext = createContext<DocContextType | undefined>(undefined);
function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}
function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("useDock must be used within an DockProvider");
  }
  return context;
}

function Dock({
  children,
  position = "bottom",
  enableAnimations = true,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const isVertical = position === "left";
  const isXs = useMediaQuery("(max-width: 30rem)");

  const shouldAnimate = enableAnimations && !isXs;

  const reset = useEffectEvent(() => {
    isHovered.set(0);
    mouseX.set(Infinity);
    mouseY.set(Infinity);
  });

  useEffect(() => {
    reset();
  }, [position]);

  return (
    <motion.div
      key={position}
      style={{
        scrollbarWidth: "none",
      }}
      className={cn("flex", {
        "my-2 max-h-full flex-col items-start": isVertical,
        "mx-2 max-w-full items-end": !isVertical,
        "w-full": isXs,
      })}
    >
      <motion.div
        onMouseMove={
          shouldAnimate
            ? ({ clientX, clientY }) => {
                isHovered.set(1);
                if (isVertical) {
                  mouseY.set(clientY);
                } else {
                  mouseX.set(clientX);
                }
              }
            : undefined
        }
        onMouseLeave={() => {
          if (!shouldAnimate) return;
          isHovered.set(0);
          if (isVertical) {
            mouseY.set(Infinity);
          } else {
            mouseX.set(Infinity);
          }
        }}
        className={cn(
          "border-nav-border bg-nav-dock-bg/40 xs:gap-4 flex gap-2 rounded-[1.25rem] border backdrop-blur-md",
          {
            "h-fit flex-col items-start px-2 py-2": isVertical,
            "w-fit items-end px-2 py-2": !isVertical,
            "w-full": isXs,
          },
        )}
        style={isVertical ? { width: 68 } : { height: isXs ? "100%" : 68 }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, mouseY, isVertical, isXs }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, label }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const { mouseX, mouseY, isVertical, isXs } = useDock();

  const isHovered = useMotionValue(0);

  // Cache bounding rect — update only on resize, not every frame
  useEffect(() => {
    const updateRect = () => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        rectRef.current = { x: r.x, y: r.y, width: r.width, height: r.height };
      }
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  const mouseDistance = useTransform(isVertical ? mouseY : mouseX, (val) => {
    const domRect = rectRef.current;
    if (isVertical) {
      return val - domRect.y - domRect.height / 2;
    }
    return val - domRect.x - domRect.width / 2;
  });

  const sizeTransform = useTransform(
    mouseDistance,
    [-DISTANCE, 0, DISTANCE],
    [50, MAGNIFICATION, 50],
  );

  const size = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={isVertical ? { height: size } : { width: isXs ? "100%" : size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={
        "relative inline-flex aspect-square items-center justify-center"
      }
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <DockLabel isHovered={isHovered}>{label}</DockLabel>
      <DockIcon>{children}</DockIcon>
    </motion.div>
  );
}

function DockLabel({ children, isHovered }: DockLabelProps) {
  const { isVertical } = useDock();

  const springConfig = { stiffness: 300, damping: 25 };
  const opacity = useSpring(isHovered, springConfig);
  const offset = useSpring(
    useTransform(isHovered, (v) => v * (isVertical ? 10 : -10)),
    springConfig,
  );

  return (
    <motion.div
      style={{
        opacity,
        pointerEvents: "none",
        ...(isVertical ? { x: offset, y: "-50%" } : { x: "-50%", y: offset }),
      }}
      className={cn(
        "bg-nav-tooltip-bg absolute w-fit rounded-md border border-neutral-900 px-2 py-0.5 text-xs whitespace-pre text-white shadow-[inset_0_0_0_1px_#47484a]",
        {
          "top-1/2 left-full": isVertical,
          "bottom-full left-1/2": !isVertical,
        },
      )}
      role="tooltip"
    >
      {children}
    </motion.div>
  );
}

function DockIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}

export { Dock, DockIcon, DockItem, DockLabel };
