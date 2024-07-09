"use client";

import React, { useRef, useState } from "react";

import Bubble from "@/components/MessageApp/Bubble";
import classNames from "classnames";
import { setLastMessage } from "@/redux/action/msgActions";
import { useAppDispatch } from "@/hooks/useRedux";
import { useTextareaAutoSize } from "@/hooks/useTextareaAutoSize";
const Main = () => {
  const [message, setMessage] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();
  useTextareaAutoSize(textarea, message);

  const handleSubmit = () => {
    if (error || !from) return;
    dispatch(setLastMessage(message));
    setMessages((prev) => [...prev, message]);
    setMessage("");
  };
  return (
    <section className="flex w-[55.4rem] flex-col bg-[#3a3a3a]">
      <div className="flex h-20 items-center gap-2 border-b border-black px-8 text-[1.3rem]">
        <label htmlFor="from" className="font-medium text-[#929292]">
          From:
        </label>
        <input
          name="from"
          type="email"
          autoComplete="off"
          spellCheck="false"
          className={classNames(
            "flex-1 bg-transparent text-white caret-[#1f7bf6] outline-none",
            {
              "text-[#eb5545]": error,
            },
          )}
          value={from}
          onBlur={() => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError(!emailPattern.test(from));
          }}
          onChange={(e) => {
            if (error) setError(false);
            setFrom(e.target.value);
          }}
        />
      </div>
      <div className="flex-1 bg-[#1e1e1e]">
        <div className="flex h-full flex-col justify-end">
          {messages.map((message, index) => (
            <Bubble key={index} message={message} />
          ))}
          <div className="px-8 py-[1.6rem]">
            <form
              ref={form}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <textarea
                placeholder="Send message"
                ref={textarea}
                rows={1}
                className="w-full flex-1 resize-none rounded-3xl border border-[#2f2f2f] bg-transparent px-4 py-1 text-[1.3rem] text-white placeholder-[#535353] caret-[#1f7bf6] outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
