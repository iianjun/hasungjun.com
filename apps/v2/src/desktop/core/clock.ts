import type { Clock } from "./types";

const MINUTE = 60_000;
const currentMinute = () => Math.floor(Date.now() / MINUTE) * MINUTE;

export function createSystemClock(): Clock {
  const listeners = new Set<() => void>();
  let minute = currentMinute();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const tick = () => {
    const next = currentMinute();
    if (next !== minute) {
      minute = next;
      for (const listener of listeners) listener();
    }
    // Re-arm from the wall clock so timer drift and sleep correct themselves.
    timer = setTimeout(tick, MINUTE - (Date.now() % MINUTE));
  };
  return {
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1) tick();
      return () => {
        listeners.delete(listener);
        if (!listeners.size) clearTimeout(timer);
      };
    },
    now: () => (listeners.size ? minute : (minute = currentMinute())),
  };
}
