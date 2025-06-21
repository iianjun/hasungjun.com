"use client";

import React, { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/utils/cn";

const Terminal: React.FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
    keepBorder?: boolean;
    hideShadow?: boolean;
  }
> = ({ children, className, keepBorder = false, hideShadow = false }) => {
  return (
    <div
      className={cn("flex flex-col bg-[#282a35]", className, {
        "rounded-[.375rem] border border-[#5f5f5f]": keepBorder,
        "md:rounded-[.375rem] md:border md:border-[#5f5f5f]": !keepBorder,
        "md:shadow-modal": !hideShadow,
      })}
    >
      <div
        className={cn(
          "relative flex h-[1.625rem] flex-shrink-0 items-center border-b border-black bg-[#383838] px-[.375rem]",
          {
            "md:rounded-t-[.375rem]": !keepBorder,
            "rounded-t-[.375rem]": keepBorder,
          },
        )}
      >
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ed6a5e]"></div>
          <div className="h-3 w-3 rounded-full bg-[#f5bf4f]"></div>
          <div className="h-3 w-3 rounded-full bg-[#61c454]"></div>
        </div>
        <p className="absolute left-1/2 -translate-x-1/2 text-sm text-[#b4b4b4]">
          hasungjun
        </p>
      </div>
      {children}
    </div>
  );
};
export default Terminal;
