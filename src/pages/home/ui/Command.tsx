"use client";

import { DIRECTORIES, LINK_HASH } from "@/pages/home/config/constants";

import { CommandHistory } from "@/pages/home/model/types";
import { Route } from "next";
import { cn } from "@/shared/lib";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Command({ history }: { history: CommandHistory }) {
  const router = useRouter();

  useEffect(() => {
    if (history.command !== "cd") return;
    if (
      !history.directories ||
      !!!history.directories.length ||
      !DIRECTORIES.includes(history.directories[0]) ||
      history.directories.length > 1
    )
      return;
    if (["github", "linkedin"].includes(history.directories[0])) {
      window.open(
        LINK_HASH[history.directories[0] as keyof typeof LINK_HASH],
        "_blank",
      );
      return;
    }
    return router.push(`${history.directories[0]}` as Route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <>
      <div className="flex gap-2">
        <span className="border-l-terminal-arrow-bg h-0 w-0 border-t-[.625rem] border-b-[.625rem] border-l-[.625rem] border-t-transparent border-b-transparent"></span>
        <p
          className={cn({
            "text-terminal-command-error": !history.isSuccess,
            "text-terminal-command-success": history.isSuccess,
          })}
        >
          {[history.command, ...(history.directories || [])]
            .filter(Boolean)
            .join(" ")}
        </p>
      </div>
      <div className="leading-6 whitespace-pre-wrap">
        {(() => {
          switch (history.command) {
            case "help":
              return (
                <div>
                  <p>Version 1.0.0</p>
                  <br />
                  <p>All commands:</p>
                  <div className="flex gap-[1.875rem] pl-[1.875rem]">
                    <div className="flex flex-col">
                      <p>help</p>
                      <p>ls</p>
                      <p>cd [directory]</p>
                    </div>
                    <div className="flex flex-col">
                      <p>See available commands</p>
                      <p>See list directories</p>
                      <p>Change directories</p>
                    </div>
                  </div>
                </div>
              );
            case "ls":
              return (
                <div className="grid w-full grid-cols-4">
                  {DIRECTORIES.map((directory) => (
                    <p key={directory}>{directory}</p>
                  ))}
                </div>
              );
            case "cd":
              if (!history.directories || !!!history.directories.length) {
                return <p>cd: missing directory</p>;
              } else if (!DIRECTORIES.includes(history.directories[0])) {
                return (
                  <p>cd: no such file or directory: {history.directories[0]}</p>
                );
              } else if (history.directories.length > 1) {
                return <p>cd: string not in pwd</p>;
              } else if (
                ["github", "linkedin"].includes(history.directories[0])
              ) {
                return <p>Redirect completed</p>;
              } else {
                return <></>;
              }
            default:
              return <p>command not found: {history.command}</p>;
          }
        })()}
      </div>
    </>
  );
}
