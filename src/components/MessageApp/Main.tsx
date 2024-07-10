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
  const [error, setError] = useState<{ required: boolean; inValid: boolean }>({
    required: false,
    inValid: false,
  });
  const [messages, setMessages] = useState<string[]>([]);
  const [deliveredIndex, setDeliveredIndex] = useState<number>(-1);
  const [notDeliveredIndexes, setNotDeliveredIndexes] = useState<number[]>([]);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();
  useTextareaAutoSize(textarea, message);

  const handleSubmit = async () => {
    if (error.inValid || error.required) return;
    if (!from) {
      setError({ required: true, inValid: false });
      return;
    }
    dispatch(setLastMessage(message));
    setMessages((prev) => [...prev, message]);
    setMessage("");
    try {
      const { status } = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ from, message }),
      });
      if (status !== 200) throw new Error("Failed to send message");
      setDeliveredIndex(messages.length);
    } catch (e) {
      console.error(e);
      setNotDeliveredIndexes((prev) => [...prev, messages.length]);
    }
  };

  return (
    <section className="flex w-[55.4rem] flex-col bg-[#3a3a3a]">
      <div className="flex h-20 items-center gap-2 border-b border-black px-8 text-[1.3rem]">
        <label
          htmlFor="from"
          className={classNames("font-medium text-[#929292]", {
            "text-[#eb5545]": error.required,
            "text-[#929292]": !error.required,
          })}
        >
          From:
        </label>
        <input
          name="from"
          type="email"
          autoComplete="off"
          spellCheck="false"
          className={classNames(
            "flex-1 bg-transparent caret-[#1f7bf6] outline-none",
            {
              "text-[#eb5545]": error.inValid,
              "text-white": !error.inValid,
            },
          )}
          value={from}
          onBlur={() => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError({
              required: !!!from,
              inValid: !emailPattern.test(from),
            });
          }}
          onChange={(e) => {
            setError({ required: false, inValid: false });
            setFrom(e.target.value);
          }}
        />
      </div>
      <div className="flex-1 bg-[#1e1e1e]">
        <div className="flex h-full flex-col">
          <ul className="flex flex-1 flex-col justify-end">
            {messages.map((message, index) => (
              <Bubble
                key={index}
                message={message}
                showDelivered={deliveredIndex === index}
                isNotDelivered={notDeliveredIndexes.includes(index)}
              />
            ))}
          </ul>
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
