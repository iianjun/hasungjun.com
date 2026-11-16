import { useLayoutEffect, useRef } from "react";
import { useDesktop } from "../bridge/react";
import { WindowFrame } from "./WindowFrame";
import styles from "./desktop.module.css";

export function Workspace() {
  const { snapshot, renderWindow } = useDesktop();
  const previousActive = useRef<string | null>(null);
  useLayoutEffect(() => {
    const focused = document.activeElement;
    const activeChanged = previousActive.current !== snapshot.activeId;
    previousActive.current = snapshot.activeId;
    const focusInHiddenWindow =
      focused instanceof HTMLElement && focused.closest("[hidden]") !== null;
    if (!snapshot.activeId && !activeChanged && !focusInHiddenWindow) return;
    const destination = snapshot.activeId
      ? document.getElementById(snapshot.activeId)
      : document.querySelector<HTMLButtonElement>("[data-dock] button");
    if (!destination?.contains(focused))
      destination?.focus({ preventScroll: true });
  }, [snapshot]);
  return (
    <>
      <div className={styles.workspace} aria-label="Windows">
        {snapshot.windows.map((w, index) => {
          const content = renderWindow(w, snapshot.activeId === w.id);
          if (content === null) return null;
          return (
            <WindowFrame
              key={w.id}
              id={w.id}
              title={w.title}
              minimized={w.minimized}
              active={snapshot.activeId === w.id}
              order={index}
            >
              {content}
            </WindowFrame>
          );
        })}
      </div>
      {snapshot.input.phase !== "idle" && (
        <div className={styles.inputGuide} role="status">
          {snapshot.input.phase === "moving" ? "Move" : "Resize"} · Arrow keys
          10 px · Shift 1 px · Enter to finish · Esc to cancel
        </div>
      )}
      {snapshot.error && (
        <div className={styles.errorNotice} role="alert">
          {snapshot.error}
        </div>
      )}
    </>
  );
}
