"use client";

import { DIRECTORIES, LINK_HASH } from "@/constants/terminal";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

import { Route } from "next";
import Terminal from "@/components/Terminal";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import useTypedText from "@/hooks/useTypedText";

const d2coding = localFont({
  src: "../../fonts/D2Coding.woff2",
});

interface CommandHistory {
  command: "help" | "ls" | "cd" | string;
  isSuccess: boolean;
  directories?: string[];
}

const Command: React.FC<{ history: CommandHistory }> = memo(
  ({ history }) => {
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
          <span className="h-0 w-0 border-t-[.625rem] border-b-[.625rem] border-l-[.625rem] border-t-transparent border-b-transparent border-l-[#76c4fa]"></span>
          <p
            className={cn({
              "!text-[#ec675e]": !history.isSuccess,
              "!text-[#89f498]": history.isSuccess,
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
                    <p>
                      cd: no such file or directory: {history.directories[0]}
                    </p>
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
  },
  () => true,
);
Command.displayName = "Command";

const HomePage = () => {
  const [command, setCommand] = useState<string>("");
  const [histories, setHistories] = useState<CommandHistory[]>([]);

  const text = useMemo(() => {
    return [
      `Last login: ${dayjs().format("ddd MMM DD hh:mm:ss")}`,
      `Type help to see available commands.`,
    ];
  }, []);
  const { typedTexts, done, textIndex } = useTypedText(text, 50);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapper.current) {
      wrapper.current.scrollTop = wrapper.current.scrollHeight;
    }
  }, [histories]);

  useEffect(() => {
    if (done) {
      inputRef.current?.focus();
    }
  }, [done]);

  return (
    <Terminal
      className={cn(
        d2coding.className,
        "h-[calc(100svh-5rem)] w-screen text-base text-white md:h-[80svh] md:w-[90vw] lg:h-[70svh] lg:w-[60vw] xl:w-[50vw]",
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={wrapper} className="overflow-auto">
        <div className="inline-flex flex-col p-[.15625rem]">
          {typedTexts.map((typedText, index) => (
            <p
              key={index}
              className={cn(
                "inline w-fit border-r-[.5rem] border-r-transparent leading-normal break-all",
                {
                  "animate-blink-caret": textIndex === index && !done,
                },
              )}
            >
              {typedText}
            </p>
          ))}
        </div>
        {histories.map((history, index) => (
          <Command history={history} key={index} />
        ))}
        {done && (
          <div className="flex w-full gap-2">
            <span className="h-0 w-0 border-t-[.625rem] border-b-[.625rem] border-l-[.625rem] border-t-transparent border-b-transparent border-l-[#76c4fa]"></span>
            <form
              className="flex w-full"
              onSubmit={(e) => {
                e.preventDefault();
                const [change, ...directories] = command.trim().split(" ");
                if (change === "cd") {
                  setHistories((prev) => [
                    ...prev,
                    {
                      command: change,
                      isSuccess:
                        DIRECTORIES.includes(directories[0]) &&
                        directories.length === 1,
                      directories: directories,
                    },
                  ]);
                } else if (["help", "ls"].includes(command)) {
                  setHistories((prev) => [
                    ...prev,
                    {
                      command: command.trim() as "help" | "ls",
                      isSuccess: true,
                    },
                  ]);
                } else {
                  setHistories((prev) => [
                    ...prev,
                    {
                      command: command.trim(),
                      isSuccess: false,
                    },
                  ]);
                }
                setCommand("");
              }}
            >
              <input
                className="w-full flex-1 bg-transparent font-bold break-words break-all outline-none"
                ref={inputRef}
                autoFocus
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </Terminal>
  );
};

export default HomePage;
