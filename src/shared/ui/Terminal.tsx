"use client";

import React, { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/shared/lib";

export const Terminal = ({
  children,
  className,
  keepBorder = false,
  hideShadow = false,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  keepBorder?: boolean;
  hideShadow?: boolean;
}) => {
  return (
    <div
      className={cn("bg-terminal-bg flex flex-col", className, {
        "border-app-border rounded-[.375rem] border": keepBorder,
        "md:border-app-border md:rounded-[.375rem] md:border": !keepBorder,
        "md:shadow-modal": !hideShadow,
      })}
      {...rest}
    >
      <div
        className={cn(
          "bg-app-header-bg relative flex h-[1.625rem] flex-shrink-0 items-center border-b border-black px-[.375rem]",
          {
            "md:rounded-t-[.375rem]": !keepBorder,
            "rounded-t-[.375rem]": keepBorder,
          },
        )}
      >
        <div className="flex gap-2">
          <div className="bg-app-red-btn-bg h-3 w-3 rounded-full"></div>
          <div className="bg-app-yellow-btn-bg h-3 w-3 rounded-full"></div>
          <div className="bg-app-green-btn-bg h-3 w-3 rounded-full"></div>
        </div>
        <p className="text-gray-light absolute left-1/2 -translate-x-1/2 text-sm">
          hasungjun
        </p>
      </div>
      {children}
    </div>
  );
};
