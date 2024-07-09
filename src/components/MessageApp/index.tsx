import Main from "@/components/MessageApp/Main";
import React from "react";
import Sidebar from "@/components/MessageApp/Sidebar";
const MessageApp = () => {
  return (
    <div className="flex h-[60svh] overflow-hidden rounded-2xl border border-[#5f5f5f]">
      <Sidebar />
      <Main />
    </div>
  );
};

export default MessageApp;
