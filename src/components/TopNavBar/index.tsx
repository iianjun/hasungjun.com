"use client";

import { hideDock, showDock } from "@/redux/action/dockAction";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import Image from "next/image";
import React from "react";

const TopNavBar = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.dockReducer.show);
  return (
    <nav className="fixed top-0 z-20 flex h-[50px] w-full items-center justify-start px-8 backdrop-blur-md lg:hidden">
      <button
        onClick={() => {
          dispatch(show ? hideDock() : showDock());
        }}
      >
        <Image
          width={30}
          height={30}
          src="/svg/dock-icon.svg"
          alt="dock-icon"
        />
      </button>
    </nav>
  );
};

export default TopNavBar;
