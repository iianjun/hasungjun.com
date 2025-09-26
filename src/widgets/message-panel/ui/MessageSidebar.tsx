"use client";

import Image from "next/image";
import React from "react";
import { useAppSelector } from "@/shared/lib";

export const MessageSidebar = () => {
  const lastMessage = useAppSelector(
    (state) => state.message.lastMessage || "",
  );
  return (
    <aside className="hidden w-80 flex-col border-r border-r-black bg-[#303030] px-[.625rem] sm:flex">
      <div className="flex h-[3.125rem] items-center gap-2 px-[.625rem]">
        <button className="h-3 w-3 rounded-xl bg-[#ed6a5e]"></button>
        <button className="h-3 w-3 rounded-xl bg-[#f5bf4f]"></button>
        <button className="h-3 w-3 rounded-xl bg-[#61c454]"></button>
      </div>
      <div className="my-[.625rem] flex h-16 w-full cursor-pointer gap-[.375rem] rounded-lg bg-[#1f7bf6] px-[1.125rem] py-2">
        <div className="flex flex-shrink-0 items-center">
          <Image
            width={40}
            height={40}
            className="h-10 w-10 rounded-[50%] bg-[#cac4bd]"
            src="/sticker-5.png"
            alt="memoji"
          />
        </div>
        <div className="flex-grow-0">
          <p className="line-clamp-1 text-[0.8125rem] font-bold text-white">
            Hasung Jun
          </p>
          <p className="line-clamp-2 text-xs leading-tight break-all whitespace-break-spaces text-[#d7e5fd]">
            {lastMessage}
          </p>
        </div>
      </div>
    </aside>
  );
};
