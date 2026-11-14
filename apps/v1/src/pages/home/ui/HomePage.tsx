"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Command from "./Command";
import { CommandHistory } from "../model/types";
import { DIRECTORIES } from "../config/constants";
import { Terminal } from "@/shared/ui";
import { cn } from "@/shared/lib";
import dayjs from "dayjs";
import useTypedText from "../hooks/useTypedText";

export const HomePage = () => {
  const [command, setCommand] = useState<string>("");
  const [histories, setHistories] = useState<CommandHistory[]>([]);

  const text = useMemo(() => {
    return [
      `Last login: ${dayjs().format("ddd MMM DD hh:mm:ss")}`,
      `Type help to see available commands.`,
    ];
  }, []);
  const { typedTexts, done, textIndex, skipAnimation } = useTypedText(text, 50);
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
      className={
        "h-[calc(100svh-5rem)] w-screen font-mono text-base text-white md:h-[80svh] md:w-[90vw] lg:h-[70svh] lg:w-[60vw] xl:w-[50vw]"
      }
      onClick={() => {
        skipAnimation();
        inputRef.current?.focus();
      }}
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
            <span className="border-l-terminal-arrow-bg h-0 w-0 border-t-[.625rem] border-b-[.625rem] border-l-[.625rem] border-t-transparent border-b-transparent"></span>
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
                aria-label="Enter command to navigate"
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
