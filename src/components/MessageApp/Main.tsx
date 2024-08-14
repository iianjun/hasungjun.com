"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import Bubble from "@/components/MessageApp/Bubble";
import Image from "next/image";
import classNames from "classnames";
import { setLastMessage } from "@/redux/action/msgActions";
import { useAppDispatch } from "@/hooks/useRedux";
import { useResize } from "@/hooks/useResize";
import { useTextareaAutoSize } from "@/hooks/useTextareaAutoSize";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [loading, setLoading] = useState<boolean>(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const messageContainer = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  useTextareaAutoSize(textarea, message);

  const [header, headerHeight] = useResize<HTMLDivElement>();
  const [send, sendHeight] = useResize<HTMLDivElement>();
  const [container, containerHeight] = useResize<HTMLDivElement>();

  const handleSubmit = async () => {
    if (error.inValid || error.required || !message) return;
    if (!from) {
      setError({ required: true, inValid: false });
      return;
    }

    dispatch(setLastMessage(message));
    setMessages((prev) => [...prev, message]);
    setMessage("");
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const maxHeight = useMemo(() => {
    return containerHeight - headerHeight - sendHeight;
  }, [containerHeight, headerHeight, sendHeight]);

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [maxHeight, loading]);

  return (
    <section
      className="relative flex w-full flex-col justify-between bg-[#1e1e1e] md:w-[34.625rem]"
      style={{
        paddingBottom: sendHeight,
      }}
      ref={container}
    >
      <div
        className="flex flex-shrink-0 flex-col items-center gap-1 border-b border-black bg-[#3a3a3a] px-5 py-[.625rem] text-[1rem] sm:h-[3.125rem] sm:flex-row sm:py-0 sm:text-[.8125rem]"
        ref={header}
      >
        <div className="flex flex-col items-center gap-[.375rem] sm:hidden">
          <Image
            width={50}
            height={50}
            className="h-[3.125rem] w-[3.125rem] rounded-[50%] bg-[#cac4bd]"
            src="/sticker-5.png"
            alt="memoji"
          />
          <p className="line-clamp-1 text-[0.75rem] font-semibold text-white">
            Hasung Jun
          </p>
        </div>
        <div className="flex w-full gap-[0.375rem]">
          <label
            htmlFor="from"
            className={classNames("font-medium text-[#929292]", {
              "text-[#eb5545]": error.required,
              "text-[#929292]": !error.required,
            })}
          >
            From:
          </label>
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              if (!!!from || !emailPattern.test(from)) return;
              textarea.current?.focus();
            }}
          >
            <input
              name="from"
              type="email"
              autoComplete="off"
              spellCheck="false"
              className={classNames(
                "w-full bg-transparent caret-[#1f7bf6] outline-none",
                {
                  "text-[#eb5545]": error.inValid,
                  "text-white": !error.inValid,
                },
              )}
              value={from}
              onBlur={() => {
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
          </form>
        </div>
      </div>
      <div
        className="flex flex-col overflow-auto"
        ref={messageContainer}
        style={{
          maxHeight,
        }}
      >
        <ul>
          {messages.map((message, index) => (
            <Bubble
              key={index}
              message={message}
              showDelivered={deliveredIndex === index}
              isNotDelivered={notDeliveredIndexes.includes(index)}
            />
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 w-full px-5 py-4" ref={send}>
        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <textarea
            placeholder="Send message"
            ref={textarea}
            rows={1}
            className="w-full flex-1 resize-none rounded-2xl border border-[#2f2f2f] bg-transparent px-[.625rem] py-[0.15625rem] text-[1rem] text-white placeholder-[#535353] caret-[#1f7bf6] outline-none sm:text-[.8125rem]"
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
    </section>
  );
};

export default Main;
