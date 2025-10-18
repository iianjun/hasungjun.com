"use client";

import { hideDock, showDock } from "@/features/dock-toggle";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

import Image from "next/image";
import React from "react";

export const TopNavBar = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.dock.show);
  return (
    <nav className="fixed top-0 z-20 flex h-[3.125rem] w-full items-center justify-start px-5 backdrop-blur-md lg:hidden">
      <button
        onClick={() => {
          dispatch(show ? hideDock() : showDock());
        }}
      >
        <Image
          width={30}
          height={30}
          src="/dock/dock-icon.svg"
          alt="dock-icon"
        />
      </button>
    </nav>
  );
};
