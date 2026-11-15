import styles from "./desktop.module.css";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { applications } from "../applications";
import type { DesktopSession } from "./DesktopSession";
import type { ShellCommand } from "./types";
import { nextInputToken } from "./react";

export function MenuBar({
  session,
  theme,
  onThemeChange,
}: {
  session: DesktopSession;
  theme: string;
  onThemeChange(theme: string): void;
}) {
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const [menu, setMenu] = useState<"app" | "window" | "view" | null>(null);
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
          ●<i />
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
          data-menu="view"
          aria-haspopup="menu"
          aria-expanded={menu === "view"}
          onClick={() => setMenu(menu === "view" ? null : "view")}
        >
          View
        </button>
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
            {menu === "view" && (
              <>
                <button
                  role="menuitemradio"
                  aria-checked={theme === "light"}
                  onClick={() => {
                    onThemeChange("light");
                    setMenu(null);
                    menuRoot.current
                      ?.querySelector<HTMLButtonElement>('[data-menu="view"]')
                      ?.focus();
                  }}
                >
                  Light
                </button>
                <button
                  role="menuitemradio"
                  aria-checked={theme === "contrast"}
                  onClick={() => {
                    onThemeChange("contrast");
                    setMenu(null);
                    menuRoot.current
                      ?.querySelector<HTMLButtonElement>('[data-menu="view"]')
                      ?.focus();
                  }}
                >
                  Contrast preview
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
        <span aria-hidden="true">▰</span>
        <span aria-hidden="true">◉</span>
        <span aria-disabled="true">⌕</span>
        <span aria-disabled="true">☷</span>
        <time>Wed Apr 1 9:41 AM</time>
      </div>
    </header>
  );
}
