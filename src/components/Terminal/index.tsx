"use client";

import { DIRECTORIES, LINK_HASH } from "@/constants/terminal";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import dayjs from "dayjs";
import localFont from "next/font/local";
import styles from "@/styles/terminal.module.scss";
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

    return (
      <>
        <div className={styles.history}>
          <span className={styles["history-prefix"]}></span>
          <p
            className={classNames(styles["history-text"], {
              "!text-[#ec675e]": !history.isSuccess,
              "!text-[#89f498]": history.isSuccess,
            })}
          >
            {[history.command, ...(history.directories || [])]
              .filter(Boolean)
              .join(" ")}
          </p>
        </div>
        <div className={styles["history-result"]}>
          {(() => {
            switch (history.command) {
              case "help":
                return (
                  <div className="text-white text-[1.6rem]">
                    <p>Version 1.0.0</p>
                    <br />
                    <p>All commands:</p>
                    <div className="pl-12 flex gap-12">
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
                  <div className="grid grid-cols-4 w-full">
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
                  window.open(
                    LINK_HASH[history.directories[0] as keyof typeof LINK_HASH],
                    "_blank",
                  );
                  return <p>Redirect completed</p>;
                } else {
                  router.push(`${history.directories[0]}`);
                  return null;
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
const Terminal: React.FC = () => {
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

  useEffect(() => {
    if (done) {
      inputRef.current?.focus();
    }
  }, [done]);

  return (
    <div
      className={classNames(styles.container, d2coding.className)}
      onClick={() => inputRef.current?.focus()}
    >
      <div className={styles.header}>
        <div className="flex gap-[.8rem]">
          <div className={classNames(styles.btn, "bg-[#ed6a5e]")}></div>
          <div className={classNames(styles.btn, "bg-[#f5bf4f]")}></div>
          <div className={classNames(styles.btn, "bg-[#61c454]")}></div>
        </div>
        <h6 className="text-[1.4rem] text-[#b4b4b4] absolute left-1/2 -translate-x-1/2">
          hasungjun
        </h6>
      </div>
      <div className="overflow-auto">
        <div className="p-1 inline-flex flex-col">
          {typedTexts.map((typedText, index) => (
            <p
              key={index}
              className={classNames(styles.text, {
                [styles["with-cursor"]]: textIndex === index && !done,
              })}
            >
              {typedText}
            </p>
          ))}
        </div>
        {histories.map((history, index) => (
          <Command history={history} key={index} />
        ))}
        {done && (
          <div className={styles["input-wrap"]}>
            <span className={styles["command-line-prefix"]}></span>
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
                className={styles.input}
                ref={inputRef}
                autoFocus
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default Terminal;
