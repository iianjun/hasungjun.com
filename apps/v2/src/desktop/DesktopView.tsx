import { Component } from "react";
import type { ReactNode } from "react";
import type { DesktopSession } from "./DesktopSession";
import { applications } from "../applications";
import { useDesktop, WindowFrame } from "./react";
import { MenuBar } from "./MenuBar";
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

export function DesktopView({
  session,
  theme,
  onThemeChange,
}: {
  session: DesktopSession;
  theme: string;
  onThemeChange(theme: string): void;
}) {
  const { snapshot, execute } = useDesktop(session);
  return (
    <main className={styles.desktop} data-theme={theme} aria-label="Desktop">
      <div className={styles.wallpaper} aria-hidden="true">
        <div className={`${styles.ribbon} ${styles.ribbonOne}`} />
        <div className={`${styles.ribbon} ${styles.ribbonTwo}`} />
        <div className={`${styles.ribbon} ${styles.ribbonThree}`} />
      </div>
      <MenuBar
        snapshot={snapshot}
        execute={execute}
        theme={theme}
        onThemeChange={onThemeChange}
      />
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
      <nav data-dock className={styles.dock} aria-label="Dock">
        {applications.map((app) => (
          <button
            key={app.id}
            data-running={snapshot.running.includes(app.id)}
            aria-label={`Open ${app.title}`}
            onClick={() => execute({ type: "dock", appId: app.id })}
          >
            {app.icon}
            <span className={styles.dockTooltip}>{app.title}</span>
            <span className={styles.runningDot} />
          </button>
        ))}
        {snapshot.windows.some((w) => w.minimized) && (
          <span className={styles.dockDivider} />
        )}
        {snapshot.windows
          .filter((w) => w.minimized)
          .map((w) => (
            <button
              key={w.id}
              aria-label={`Restore ${w.title}`}
              onClick={() => execute({ type: "restore", id: w.id })}
            >
              <span className={styles.miniWindow} aria-hidden="true">
                <i />▤
              </span>
              <span className={styles.dockTooltip}>{w.title}</span>
            </button>
          ))}
      </nav>
    </main>
  );
}
