import React from "react";

export const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-svh overflow-x-hidden pt-0 md:flex md:justify-center md:pt-[10%] xl:pt-[5%]">
      <div className="md:border-app-border flex h-[calc(100svh-5rem)] overflow-hidden md:h-[60svh] md:rounded-[.625rem] md:border">
        {children}
      </div>
    </main>
  );
};
