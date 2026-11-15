import { Component, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import type { DesktopSession } from "./DesktopSession";
import { applications } from "../applications";
import { WindowFrame } from "./react";
import styles from "./desktop.module.css";

class AppBoundary extends Component<
  { children: ReactNode; session: DesktopSession; runId: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.session.send({ type: "failure", runId: this.props.runId });
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Workspace({ session }: { session: DesktopSession }) {
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const previousActive = useRef<string | null>(null);
  // The only writer of shell keyboard focus. Other shell modules send commands and leave focus alone.
  useLayoutEffect(() => {
    const focused = document.activeElement;
    const activeChanged = previousActive.current !== snapshot.activeId;
    previousActive.current = snapshot.activeId;
    // Without an active window, focus moves only when the last one just went away.
    if (
      !snapshot.activeId &&
      !activeChanged &&
      !(focused instanceof HTMLElement && focused.closest("[hidden]"))
    )
      return;
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
          const app = session.getApp(w.runId);
          const registration = applications.find((a) => a.id === w.appId);
          if (!app || !registration) return null;
          return (
            <WindowFrame
              key={w.id}
              session={session}
              id={w.id}
              title={w.title}
              minimized={w.minimized}
              active={snapshot.activeId === w.id}
              order={index}
            >
              <AppBoundary session={session} runId={w.runId}>
                {registration.render(app, w.id, snapshot.activeId === w.id)}
              </AppBoundary>
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
