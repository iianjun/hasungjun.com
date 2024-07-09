import { RefObject, useEffect } from "react";

const MAX_HEIGHT = 205;
const MIN_HEIGHT = 30;
export const useTextareaAutoSize = (
  textAreaRef: RefObject<HTMLTextAreaElement> | null,
  value: string,
) => {
  useEffect(() => {
    if (!textAreaRef?.current) return;
    textAreaRef.current.style.height = "auto";
    if (textAreaRef.current.scrollHeight > MAX_HEIGHT) {
      textAreaRef.current.style.height = `${MAX_HEIGHT}px`;
      return;
    }
    if (textAreaRef.current.scrollHeight < MIN_HEIGHT) return;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 5}px`;
  }, [textAreaRef, value]);
};
