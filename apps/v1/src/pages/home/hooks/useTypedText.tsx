"use client";

import { useEffect, useRef, useState } from "react";

const useTypedText = (texts: string[], speed: number = 100) => {
  const [typedTexts, setTypedTexts] = useState<string[]>([]);
  const [done, setDone] = useState<boolean>(false);
  const [textIndex, setTextIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let charIndex = 0;
    let textIndex = 0;
    intervalRef.current = setInterval(() => {
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
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDone(true);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTypedTexts([]);
      setDone(false);
      setTextIndex(0);
    };
  }, [texts, speed]);

  const skipAnimation = () => {
    if (done) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTypedTexts(texts);
    setTextIndex(texts.length - 1);
    setDone(true);
  };

  return { typedTexts, done, textIndex, skipAnimation };
};

export default useTypedText;
