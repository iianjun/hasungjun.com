"use client";

import { useEffect, useState } from "react";

const useTypedText = (texts: string[], speed: number = 100) => {
  const [typedTexts, setTypedTexts] = useState<string[]>([]);
  const [done, setDone] = useState<boolean>(false);
  const [textIndex, setTextIndex] = useState<number>(0);
  useEffect(() => {
    setTypedTexts(texts);
    setDone(true);
    return;
    let charIndex = 0;
    let textIndex = 0;
    const intervalId = setInterval(() => {
      charIndex++;
      if (charIndex - 1 < texts[textIndex].length) {
        setTypedTexts((prev) => {
          const newTexts = [...prev];
          newTexts[textIndex] =
            (newTexts[textIndex] || "") + texts[textIndex][charIndex - 1];
          return newTexts;
        });
      } else if (textIndex < texts.length - 1) {
        textIndex++;
        setTextIndex(textIndex);
        charIndex = 0;
      } else {
        clearInterval(intervalId);
        setDone(true);
      }
    }, speed);

    return () => {
      clearInterval(intervalId);
      setTypedTexts([]);
      setDone(false);
      setTextIndex(0);
    };
  }, [texts, speed]);

  return { typedTexts, done, textIndex };
};

export default useTypedText;
