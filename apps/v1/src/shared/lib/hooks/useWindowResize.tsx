"use client";

import { useEffect } from "react";

export function useWindowResize(callback: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    callback();
    const controller = new AbortController();
    window.addEventListener("resize", callback, {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
    };
  }, [callback, enabled]);
}
