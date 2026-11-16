import styles from "../ui/desktop.module.css";
import { memo, useEffect, useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { DesktopSession } from "../core/DesktopSession";
import type { AppDefinition, AppRuntime } from "../core/types";

// React presentation extends the shell's framework-independent app contract.
export type Application = AppDefinition & {
  readonly icon: ReactNode;
  render(app: AppRuntime, id: string, active: boolean): ReactNode;
};

// Pointer and keyboard entry points share one token sequence.
let inputSequence = 0;
export const nextInputToken = () => ++inputSequence;

export const WindowFrame = memo(function WindowFrame({
  session,
  id,
  title,
  minimized,
  active,
  order,
  children,
}: {
  session: DesktopSession;
  id: string;
  title: string;
  minimized: boolean;
  active: boolean;
  order: number;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    // Geometry properties have one writer; React never writes these style properties.
    const paint = () => {
      const rect = session.getRect(id);
      if (!rect) return;
      element.style.transform = `translate3d(${rect.x}px, ${rect.y}px, 0)`;
      element.style.width = `${rect.width}px`;
      element.style.height = `${rect.height}px`;
    };
    paint();
    return session.subscribeGeometry(paint);
  }, [session, id]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    let drag:
      | {
          pointer: number;
          token: number;
          x: number;
          y: number;
          dx: number;
          dy: number;
          handle: HTMLElement;
        }
      | undefined;
    const flush = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (drag)
        session.send({
          type: "update",
          token: drag.token,
          dx: drag.dx,
          dy: drag.dy,
        });
    };
    const release = (cancel: boolean) => {
      const current = drag;
      if (!current) return;
      if (!cancel) flush();
      cancelAnimationFrame(frame);
      frame = 0;
      drag = undefined;
      if (cancel) {
        const input = session.getSnapshot().input;
        if (input.phase !== "idle" && input.token === current.token)
          session.send({ type: "cancel" });
      } else session.send({ type: "finish", token: current.token });
      if (current.handle.hasPointerCapture(current.pointer))
        current.handle.releasePointerCapture(current.pointer);
    };
    const down = (event: PointerEvent) => {
      if (
        event.button !== 0 ||
        !event.isPrimary ||
        !(event.target instanceof HTMLElement)
      )
        return;
      const handle = event.target.closest<HTMLElement>(
        "[data-drag], [data-resize]",
      );
      if (
        !handle ||
        (event.target.closest("button") && !handle.hasAttribute("data-resize"))
      )
        return;
      event.preventDefault();
      const token = nextInputToken();
      session.send({
        type: "begin",
        id,
        mode: handle.hasAttribute("data-resize") ? "resizing" : "moving",
        token,
      });
      if (session.getSnapshot().input.phase === "idle") return;
      drag = {
        pointer: event.pointerId,
        token,
        x: event.clientX,
        y: event.clientY,
        dx: 0,
        dy: 0,
        handle,
      };
      handle.setPointerCapture(event.pointerId);
      element.focus({ preventScroll: true });
    };
    const move = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      drag.dx = event.clientX - drag.x;
      drag.dy = event.clientY - drag.y;
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const up = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      drag.dx = event.clientX - drag.x;
      drag.dy = event.clientY - drag.y;
      release(false);
    };
    const cancel = () => {
      release(true);
      const input = session.getSnapshot().input;
      if (input.phase !== "idle" && input.id === id)
        session.send({ type: "cancel" });
    };
    const key = (event: KeyboardEvent) => {
      const input = session.getSnapshot().input;
      if (
        input.phase === "idle" ||
        input.id !== id ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return;
      if (event.key === "Escape" || event.key === "Tab") {
        cancel();
        if (event.key === "Escape") event.preventDefault();
        return;
      }
      if (drag) return;
      if (event.key === "Enter") {
        event.preventDefault();
        session.send({ type: "finish", token: input.token });
        return;
      }
      if (
        !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
      )
        return;
      const rect = session.getRect(id);
      if (!rect) return;
      event.preventDefault();
      const step = event.shiftKey ? 1 : 10;
      const dx =
        (input.phase === "moving"
          ? rect.x - input.origin.x
          : rect.width - input.origin.width) +
        (event.key === "ArrowLeft"
          ? -step
          : event.key === "ArrowRight"
            ? step
            : 0);
      const dy =
        (input.phase === "moving"
          ? rect.y - input.origin.y
          : rect.height - input.origin.height) +
        (event.key === "ArrowUp"
          ? -step
          : event.key === "ArrowDown"
            ? step
            : 0);
      session.send({ type: "update", token: input.token, dx, dy });
    };
    const visibility = () => {
      if (document.hidden) cancel();
    };
    // Shell commands can cancel an input before the next animation frame.
    const detach = session.subscribe(() => {
      const input = session.getSnapshot().input;
      if (drag && (input.phase === "idle" || input.token !== drag.token))
        release(true);
    });
    element.addEventListener("pointerdown", down);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerup", up);
    element.addEventListener("pointercancel", cancel);
    element.addEventListener("lostpointercapture", cancel);
    window.addEventListener("keydown", key);
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      detach();
      cancel();
      cancelAnimationFrame(frame);
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", up);
      element.removeEventListener("pointercancel", cancel);
      element.removeEventListener("lostpointercapture", cancel);
      window.removeEventListener("keydown", key);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [session, id]);
  return (
    <section
      ref={root}
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
        if (!active) session.send({ type: "focus", id });
      }}
      onFocusCapture={() => {
        if (!active) session.send({ type: "focus", id });
      }}
    >
      <header className={styles.windowTitlebar} data-drag>
        <div className={styles.trafficLights} data-window-controls>
          <button
            className={styles.close}
            aria-label={`Close ${title}`}
            onClick={() => session.send({ type: "close", id })}
          >
            ×
          </button>
          <button
            className={styles.minimize}
            aria-label={`Minimize ${title}`}
            onClick={() => session.send({ type: "minimize", id })}
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
        data-resize
        aria-label={`Resize ${title}`}
        onClick={(e) => {
          if (e.detail === 0)
            session.send({
              type: "begin",
              id,
              mode: "resizing",
              token: nextInputToken(),
            });
        }}
      >
        ⌟
      </button>
    </section>
  );
});
