import { MotionValue, SpringOptions } from "framer-motion";

import { PropsWithChildren } from "react";

export interface DockProps extends PropsWithChildren {
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  position?: "left" | "bottom";
  spring?: SpringOptions;
}
export interface DockItemProps extends PropsWithChildren {
  label: string;
}
export interface DockLabelProps extends PropsWithChildren {
  isHovered: MotionValue<number>;
}
export interface DockIconProps extends PropsWithChildren {
  size: MotionValue<number>;
}

export type DocContextType = {
  mouseX: MotionValue;
  mouseY: MotionValue;
  spring: SpringOptions;
  isVertical: boolean;
  isXs: boolean;
};
export type DockProviderProps = {
  children: React.ReactNode;
  value: DocContextType;
};
