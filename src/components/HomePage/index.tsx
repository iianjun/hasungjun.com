"use client";

import { DIRECTORIES, LINK_HASH } from "@/constants/terminal";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

import Terminal from "@/components/Terminal";
import classNames from "classnames";
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
      return router.push(`${history.directories[0]}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    return (
      <>
        <div className="flex gap-[.7rem]">
          <span className="h-0 w-0 border-b-[1rem] border-l-[1rem] border-t-[1rem] border-b-transparent border-l-[#76c4fa] border-t-transparent"></span>
          <p
            className={classNames({
              "!text-[#ec675e]": !history.isSuccess,
              "!text-[#89f498]": history.isSuccess,
            })}
          >
            {[history.command, ...(history.directories || [])]
              .filter(Boolean)
              .join(" ")}
          </p>
        </div>
        <div className="whitespace-pre-wrap leading-[2.4rem]">
          {(() => {
            switch (history.command) {
              case "help":
                return (
                  <div>
                    <p>Version 1.0.0</p>
                    <br />
                    <p>All commands:</p>
                    <div className="flex gap-12 pl-12">
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
      className={classNames(
        d2coding.className,
        "h-[70svh] w-[50svw] min-w-[60rem] text-[1.6rem] text-white",
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={wrapper} className="overflow-auto">
        <div className="inline-flex flex-col p-1">
          {typedTexts.map((typedText, index) => (
            <p
              key={index}
              className={classNames(
                "inline w-fit break-all border-r-[.8rem] border-r-transparent leading-normal",
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
          <div className="flex w-full gap-[.7rem]">
            <span className="h-0 w-0 border-b-[1rem] border-l-[1rem] border-t-[1rem] border-b-transparent border-l-[#76c4fa] border-t-transparent"></span>
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
                className="w-full flex-1 break-words break-all bg-transparent font-bold outline-none"
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
