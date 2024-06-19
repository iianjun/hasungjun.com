"use client";

import { useEffect, useState } from "react";

const useTypedText = (text: string, speed: number = 100) => {
  const [typedText, setTypedText] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex++;
      setTypedText((prev) => `${prev}${text[currentIndex - 1]}`);
      if (currentIndex === text.length) {
        clearInterval(intervalId);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return { typedText, done };
};

export default useTypedText;
