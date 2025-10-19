"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  DocContextType,
  DockIconProps,
  DockItemProps,
  DockLabelProps,
  DockProps,
  DockProviderProps,
} from "../model/types";
import { cn, useMediaQuery } from "@/shared/lib";
import { createContext, useContext, useEffect, useRef, useState } from "react";

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
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  position = "bottom",
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const isVertical = position === "left";
  const isXs = useMediaQuery("(max-width: 30rem)");

  return (
    <motion.div
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
        onMouseMove={({ pageX, pageY }) => {
          if (isXs) return;
          isHovered.set(1);
          if (isVertical) {
            mouseY.set(pageY);
          } else {
            mouseX.set(pageX);
          }
        }}
        onMouseLeave={() => {
          if (isXs) return;
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
        <DockProvider value={{ mouseX, mouseY, spring, isVertical, isXs }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, label }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { mouseX, mouseY, spring, isVertical, isXs } = useDock();

  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(isVertical ? mouseY : mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
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

  const size = useSpring(sizeTransform, spring);

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
      <DockIcon size={size}>{children}</DockIcon>
    </motion.div>
  );
}

function DockLabel({ children, isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { isVertical } = useDock();

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={isVertical ? { opacity: 0, x: 0 } : { opacity: 0, y: 0 }}
          animate={isVertical ? { opacity: 1, x: 10 } : { opacity: 1, y: -10 }}
          exit={isVertical ? { opacity: 0, x: 0 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "bg-nav-tooltip-bg absolute w-fit rounded-md border border-neutral-900 px-2 py-0.5 text-xs whitespace-pre text-white shadow-[inset_0_0_0_1px_#47484a]",
            {
              "top-1/2 left-full": isVertical,
              "bottom-full left-1/2": !isVertical,
            },
          )}
          role="tooltip"
          style={isVertical ? { y: "-50%" } : { x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, size }: DockIconProps) {
  const sizeTransform = useTransform(size, (val) => val);

  return (
    <motion.div
      style={{ width: sizeTransform, height: sizeTransform }}
      className={"flex items-center justify-center"}
    >
      {children}
    </motion.div>
  );
}

export { Dock, DockIcon, DockItem, DockLabel };
