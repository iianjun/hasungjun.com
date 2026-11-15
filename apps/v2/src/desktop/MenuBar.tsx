import styles from "./desktop.module.css";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { applications } from "../applications";
import type { Clock } from "./clock";
import type { DesktopSession } from "./DesktopSession";
import type { ShellCommand } from "./types";
import { nextInputToken } from "./react";

const clockFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
// macOS shows "Sun Nov 15  7:59 PM": the en-US parts without commas or "at", a wider
// gap before the time, and a narrow no-break space before PM. Chrome's Intl puts a
// plain space there, so the separators are written here.
const formatClock = (time: number) => {
  const part = Object.fromEntries(
    clockFormat.formatToParts(time).map(({ type, value }) => [type, value]),
  );
  return {
    date: `${part.weekday} ${part.month} ${part.day}`,
    time: `${part.hour}:${part.minute} ${part.dayPeriod}`,
  };
};

// The system font has the Apple logo at U+F8FF only on Apple platforms.
const appleLogo = /Mac|iPhone|iPad/.test(navigator.platform) ? "" : "";

// Status icons drawn to the 2026-11-15 reference (Wi-Fi, charging battery, Control
// Center). Boxes are whole pixels because Chrome snaps an svg box to them.
const statusIcons = (
  <>
    <svg viewBox="0 0 17 13" width="17" height="13" fill="#fff" stroke="#fff" opacity="0.9" aria-hidden="true">
      <path d="M1.23 4.21A11.5 11.5 0 0 1 15.57 4.21" fill="none" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M4.25 7.36A7.17 7.17 0 0 1 12.55 7.36" fill="none" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M8.4 11.37L7.59 10.57A2.75 2.75 0 0 1 9.21 10.57Z" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
    <svg viewBox="0 0 27 15" width="27" height="15" fill="#fff" aria-hidden="true">
      <mask id="menubar-battery-bolt-gap" maskUnits="userSpaceOnUse">
        <rect width="27" height="15" fill="#fff" />
        <path d="M14.35 -0.15L7.9 8.15L12.05 7.75L10.3 13.6L17.3 5.45L12.45 6.25Z" stroke="#000" strokeWidth="2.6" strokeLinejoin="round" />
      </mask>
      <rect x="0.5" y="1" width="23" height="12" rx="4.2" opacity="0.944" mask="url(#menubar-battery-bolt-gap)" />
      <path d="M24.5 5.1h-0.3a1.9 1.9 0 0 1 0 3.8h0.3z" opacity="0.52" />
      <path d="M14.35 -0.15L7.9 8.15L12.05 7.75L10.3 13.6L17.3 5.45L12.45 6.25Z" stroke="#fff" strokeWidth="0.6" strokeLinejoin="round" opacity="0.9" />
    </svg>
    <svg viewBox="0 0 14 14" width="14" height="14" fill="#fff" opacity="0.9" aria-hidden="true">
      <path d="M3.11 0.88h6.98a2.56 2.56 0 0 1 0 5.12h-6.98a2.56 2.56 0 0 1 0 -5.12z" fill="none" stroke="#fff" strokeWidth="1.2" />
      <path d="M3.27 1.85h2a1.57 1.57 0 0 1 0 3.15h-2a1.57 1.57 0 0 1 0 -3.15z" />
      <path fillRule="evenodd" d="M2.89 7.72h7.37a2.89 2.89 0 0 1 0 5.78h-7.37a2.89 2.89 0 0 1 0 -5.78zM8.18 8.85h2.15a1.72 1.72 0 0 1 0 3.45h-2.15a1.72 1.72 0 0 1 0 -3.45z" />
    </svg>
  </>
);

export function MenuBar({
  session,
  clock,
}: {
  session: DesktopSession;
  clock: Clock;
}) {
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const time = useSyncExternalStore(clock.subscribe, clock.now);
  const shown = formatClock(time);
  const [menu, setMenu] = useState<"app" | "window" | null>(null);
  const menuRoot = useRef<HTMLDivElement>(null);
  const active = snapshot.windows.find((w) => w.id === snapshot.activeId);
  const appId = snapshot.frontmostAppId ?? applications[0]?.id ?? "";
  const definition = applications.find((app) => app.id === appId);
  useEffect(() => {
    if (!menu) return;
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRoot.current?.contains(event.target)
      )
        setMenu(null);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [menu]);
  const execute = (command: ShellCommand) => {
    setMenu(null);
    session.send(command);
  };
  return (
    <>
    <div className={styles.menuBarScrim} aria-hidden="true" />
    <header className={styles.menuBar}>
      <div
        className={styles.menuLeft}
        ref={menuRoot}
        onKeyDown={(event) => {
          if (event.metaKey || event.ctrlKey || event.altKey) return;
          if (event.key === "Tab") {
            setMenu(null);
            return;
          }
          if (event.key === "Escape") {
            setMenu(null);
            menuRoot.current
              ?.querySelector<HTMLButtonElement>(`[data-menu="${menu}"]`)
              ?.focus();
            return;
          }
          if (
            !menu ||
            !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)
          )
            return;
          const items = [
            ...(menuRoot.current?.querySelectorAll<HTMLButtonElement>(
              '[role="menu"] button:not(:disabled)',
            ) ?? []),
          ];
          if (!items.length) return;
          event.preventDefault();
          const index = items.findIndex(
            (item) => item === document.activeElement,
          );
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? items.length - 1
                : (index + (event.key === "ArrowUp" ? -1 : 1) + items.length) %
                  items.length;
          items[next]?.focus();
        }}
      >
        <span
          className={styles.appleMark}
          aria-label="Apple menu unavailable"
          aria-disabled="true"
        >
          {appleLogo}
        </span>
        <button
          className={styles.appMenuName}
          data-menu="app"
          aria-haspopup="menu"
          aria-expanded={menu === "app"}
          onClick={() => setMenu(menu === "app" ? null : "app")}
        >
          {definition?.title ?? "Desktop"}
        </button>
        <span className={styles.menuDecoration} aria-disabled="true">
          File
        </span>
        <span className={styles.menuDecoration} aria-disabled="true">
          Edit
        </span>
        <button
          data-menu="window"
          aria-haspopup="menu"
          aria-expanded={menu === "window"}
          onClick={() => setMenu(menu === "window" ? null : "window")}
        >
          Window
        </button>
        <span className={styles.menuDecoration} aria-disabled="true">
          Help
        </span>
        {menu && (
          <div
            className={`${styles.commandMenu} ${styles[menu]}`}
            role="menu"
            aria-label={`${menu} commands`}
          >
            {menu === "app" && (
              <>
                <span className={styles.menuCaption}>{definition?.title}</span>
                <button
                  role="menuitem"
                  onClick={() => execute({ type: "new", appId })}
                >
                  New Window <span>＋</span>
                </button>
                <hr />
                <button
                  role="menuitem"
                  disabled={!snapshot.running.some((run) => run.appId === appId)}
                  onClick={() => execute({ type: "quit", appId })}
                >
                  Quit {definition?.title}
                </button>
              </>
            )}
            {menu === "window" && (
              <>
                <button
                  role="menuitem"
                  disabled={!active}
                  onClick={() =>
                    active && execute({ type: "minimize", id: active.id })
                  }
                >
                  Minimize
                </button>
                <button
                  role="menuitem"
                  disabled={!active}
                  onClick={() =>
                    active &&
                    execute({
                      type: "begin",
                      id: active.id,
                      mode: "moving",
                      token: nextInputToken(),
                    })
                  }
                >
                  Move with Keyboard
                </button>
                <button
                  role="menuitem"
                  disabled={!active}
                  onClick={() =>
                    active &&
                    execute({
                      type: "begin",
                      id: active.id,
                      mode: "resizing",
                      token: nextInputToken(),
                    })
                  }
                >
                  Resize with Keyboard
                </button>
                <button
                  role="menuitem"
                  disabled={!active}
                  onClick={() =>
                    active && execute({ type: "close", id: active.id })
                  }
                >
                  Close Window
                </button>
                <hr />
                {snapshot.windows.map((w) => (
                  <button
                    key={w.id}
                    role="menuitem"
                    onClick={() => execute({ type: "restore", id: w.id })}
                  >
                    {w.id === active?.id ? "✓ " : ""}
                    {w.title}
                    {w.minimized ? " · Minimized" : ""}
                  </button>
                ))}
                {!snapshot.windows.length && (
                  <span className={styles.menuCaption}>No open windows</span>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className={styles.menuStatus} aria-label="System status preview">
        {statusIcons}
        <time dateTime={new Date(time).toISOString()}>
          <span>{shown.date}</span>
          <span>{shown.time}</span>
        </time>
      </div>
    </header>
    </>
  );
}
