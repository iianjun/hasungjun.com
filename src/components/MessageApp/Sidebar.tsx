"use client";

import Image from "next/image";
import React from "react";
import { useAppSelector } from "@/hooks/useRedux";

const Sidebar = () => {
  const lastMessage = useAppSelector(
    (state) => state.msgReducer.lastMessage || "",
  );
  return (
    <aside className="flex w-[32rem] flex-col border-r border-r-black bg-[#303030] px-4">
      <div className="flex h-20 items-center gap-[.8rem] px-4">
        <button className="h-[1.2rem] w-[1.2rem] rounded-xl bg-[#ed6a5e]"></button>
        <button className="h-[1.2rem] w-[1.2rem] rounded-xl bg-[#f5bf4f]"></button>
        <button className="h-[1.2rem] w-[1.2rem] rounded-xl bg-[#61c454]"></button>
      </div>
      <div className="my-4 flex h-[6.5rem] w-full cursor-pointer gap-[.6rem] rounded-xl bg-[#1f7bf6] px-[1.8rem] py-[.8rem]">
        <div className="flex flex-shrink-0 items-center">
          <Image
            width={40}
            height={40}
            className="h-16 w-16 rounded-[50%] bg-[#cac4bd]"
            src="/sticker-5.png"
            alt="memoji"
          />
        </div>
        <div className="flex-grow-0">
          <p className="line-clamp-1 text-[1.3rem] font-bold text-white">
            Hasung Jun
          </p>
          <p className="line-clamp-2 whitespace-break-spaces break-all text-[1.2rem] leading-tight text-[#d7e5fd]">
            {lastMessage}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
