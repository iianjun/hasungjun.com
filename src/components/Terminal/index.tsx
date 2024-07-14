"use client";

import React, { HTMLAttributes, PropsWithChildren } from "react";

import classNames from "classnames";

const Terminal: React.FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-col bg-[#282a35] sm:rounded-[.6rem] sm:border sm:border-[#5f5f5f] sm:shadow-modal",
        className,
      )}
    >
      <div className="relative flex h-[2.6rem] items-center border-b border-black bg-[#383838] px-[.6rem] sm:rounded-t-[.6rem]">
        <div className="flex gap-[.8rem]">
          <div className="h-[1.2rem] w-[1.2rem] rounded-full bg-[#ed6a5e]"></div>
          <div className="h-[1.2rem] w-[1.2rem] rounded-full bg-[#f5bf4f]"></div>
          <div className="h-[1.2rem] w-[1.2rem] rounded-full bg-[#61c454]"></div>
        </div>
        <h6 className="absolute left-1/2 -translate-x-1/2 text-[1.4rem] text-[#b4b4b4]">
          hasungjun
        </h6>
      </div>
      {children}
    </div>
  );
};
export default Terminal;
