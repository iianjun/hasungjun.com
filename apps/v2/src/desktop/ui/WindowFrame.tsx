import { memo, type ReactNode } from "react";
import { useWindowFrame } from "../bridge/react";
import styles from "./desktop.module.css";

export const WindowFrame = memo(function WindowFrame({
  id,
  title,
  minimized,
  active,
  order,
  children,
}: {
  id: string;
  title: string;
  minimized: boolean;
  active: boolean;
  order: number;
  children: ReactNode;
}) {
  const { ref, send, moveHandle, resizeHandle } = useWindowFrame(id);
  return (
    <section
      ref={ref}
      id={id}
      className={styles.desktopWindow}
      role="region"
      aria-label={title}
      tabIndex={-1}
      hidden={minimized}
      data-active={active}
      data-window-id={id}
      style={{ zIndex: order + 1 }}
      onPointerDownCapture={() => {
        if (!active) send({ type: "focus", id });
      }}
      onFocusCapture={() => {
        if (!active) send({ type: "focus", id });
      }}
    >
      <header className={styles.windowTitlebar} {...moveHandle}>
        <div className={styles.trafficLights} data-window-controls>
          <button
            className={styles.close}
            aria-label={`Close ${title}`}
            onClick={() => send({ type: "close", id })}
          >
            ×
          </button>
          <button
            className={styles.minimize}
            aria-label={`Minimize ${title}`}
            onClick={() => send({ type: "minimize", id })}
          >
            −
          </button>
          <button
            className={styles.maximize}
            aria-label="Full screen unavailable"
            disabled
          >
            +
          </button>
        </div>
        <h1>{title}</h1>
        <span className={styles.titleSpacer} />
      </header>
      {children}
      <button
        className={styles.resizeHandle}
        {...resizeHandle}
        aria-label={`Resize ${title}`}
        onClick={(e) => {
          if (e.detail === 0) send({ type: "begin", id, mode: "resizing" });
        }}
      >
        ⌟
      </button>
    </section>
  );
});
