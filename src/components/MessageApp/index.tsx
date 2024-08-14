import Main from "@/components/MessageApp/Main";
import React from "react";
import Sidebar from "@/components/MessageApp/Sidebar";
const MessageApp = () => {
  return (
    <div className="flex h-[calc(100svh-5rem)] overflow-hidden md:h-[60svh] md:rounded-[.625rem] md:border md:border-[#5f5f5f]">
      <Sidebar />
      <Main />
    </div>
  );
};

export default MessageApp;
