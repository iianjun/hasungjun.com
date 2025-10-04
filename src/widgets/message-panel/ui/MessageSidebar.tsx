"use client";

import Image from "next/image";
import React from "react";
import { useAppSelector } from "@/shared/lib";

export const MessageSidebar = () => {
  const lastMessage = useAppSelector(
    (state) => state.message.lastMessage || "",
  );
  return (
    <aside className="bg-message-sidebar-bg hidden w-80 flex-col border-r border-r-black px-[.625rem] sm:flex">
      <div className="flex h-[3.125rem] items-center gap-2 px-[.625rem]">
        <button className="bg-app-red-btn-bg h-3 w-3 rounded-xl"></button>
        <button className="bg-app-yellow-btn-bg h-3 w-3 rounded-xl"></button>
        <button className="bg-app-green-btn-bg h-3 w-3 rounded-xl"></button>
      </div>
      <div className="bg-message-selected-bg my-[.625rem] flex h-16 w-full cursor-pointer gap-[.375rem] rounded-lg px-[1.125rem] py-2">
        <div className="flex flex-shrink-0 items-center">
          <Image
            width={40}
            height={40}
            className="bg-message-receiver-bg h-10 w-10 rounded-[50%]"
            src="/sticker-5.png"
            alt="memoji"
          />
        </div>
        <div className="flex-grow-0">
          <p className="line-clamp-1 text-[0.8125rem] font-bold text-white">
            Hasung Jun
          </p>
          <p className="text-message-text line-clamp-2 text-xs leading-tight break-all whitespace-break-spaces">
            {lastMessage}
          </p>
        </div>
      </div>
    </aside>
  );
};
