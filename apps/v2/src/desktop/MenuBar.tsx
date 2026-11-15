import styles from "./desktop.module.css";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { applications } from "../applications";
import type { Clock } from "./clock";
import type { DesktopSession } from "./DesktopSession";
import { Menu, type MenuEntry } from "./Menu";
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

// The window list icon (SF Symbol "macwindow"), drawn to reference 11: an 11×9 frame
// with three dots. The 11px box puts it 1px above the row centre, as in the reference.
const windowIcon = (
  <svg viewBox="0 0 11 11" width="11" height="11" fill="none" stroke="currentColor" aria-hidden="true">
    <rect x="0.5" y="0.5" width="10" height="8" rx="2" />
    <path d="M2 2.5h0.9M3.5 2.5h0.9M5 2.5h0.9" strokeWidth="0.9" />
  </svg>
);

type Title = "app" | "window";

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
  // The open menu and its left edge: 5px left of its title frame, on a whole point as
  // macOS places menu windows (reference 06: title at 43.5, menu at 38).
  const [open, setOpen] = useState<{ title: Title; left: number } | null>(null);
  const menuRoot = useRef<HTMLDivElement>(null);
  const active = snapshot.windows.find((w) => w.id === snapshot.activeId);
  const appId = snapshot.frontmostAppId ?? applications[0]?.id ?? "";
  const definition = applications.find((app) => app.id === appId);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menuRoot.current?.contains(event.target)
      )
        setOpen(null);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  const close = () => setOpen(null);
  const toggle = (title: Title) => (event: MouseEvent<HTMLButtonElement>) =>
    setOpen(
      open?.title === title
        ? null
        : { title, left: Math.floor(event.currentTarget.getBoundingClientRect().left) - 5 },
    );
  const send = (command: ShellCommand) => () => session.send(command);
  const entries: Record<Title, MenuEntry[]> = {
    app: [
      { label: "New Window", onSelect: send({ type: "new", appId }) },
      "separator",
      {
        label: `Quit ${definition?.title ?? ""}`,
        disabled: !snapshot.running.some((run) => run.appId === appId),
        onSelect: send({ type: "quit", appId }),
      },
    ],
    window: [
      {
        label: "Minimize",
        disabled: !active,
        onSelect: () => active && session.send({ type: "minimize", id: active.id }),
      },
      ...(["moving", "resizing"] as const).map((mode) => ({
        label: mode === "moving" ? "Move with Keyboard" : "Resize with Keyboard",
        disabled: !active,
        onSelect: () =>
          active &&
          session.send({ type: "begin", id: active.id, mode, token: nextInputToken() }),
      })),
      {
        label: "Close Window",
        disabled: !active,
        onSelect: () => active && session.send({ type: "close", id: active.id }),
      },
      ...(snapshot.windows.length ? ["separator" as const] : []),
      ...snapshot.windows.map((w) => ({
        label: w.title,
        icon: windowIcon,
        mark: w.id === active?.id ? ("check" as const) : w.minimized ? ("diamond" as const) : undefined,
        onSelect: send({ type: "restore", id: w.id }),
      })),
    ],
  };
  return (
    <>
    <div className={styles.menuBarScrim} aria-hidden="true" />
    <header className={styles.menuBar}>
      <div
        className={styles.menuLeft}
        ref={menuRoot}
        onKeyDown={(event) => {
          if (event.key === "Tab") close();
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
          aria-expanded={open?.title === "app"}
          onClick={toggle("app")}
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
          aria-expanded={open?.title === "window"}
          onClick={toggle("window")}
        >
          Window
        </button>
        <span className={styles.menuDecoration} aria-disabled="true">
          Help
        </span>
        {open && (
          <Menu
            label={`${open.title} commands`}
            entries={entries[open.title]}
            left={open.left}
            top={31}
            onClose={close}
          />
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
