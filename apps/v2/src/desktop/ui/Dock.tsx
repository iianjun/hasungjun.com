import { useSyncExternalStore } from "react";
import type { DesktopSession } from "../core/DesktopSession";
import { applications } from "../../applications";
import styles from "./desktop.module.css";

export function Dock({ session }: { session: DesktopSession }) {
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const minimized = snapshot.windows.filter((w) => w.minimized);
  return (
    <nav data-dock className={styles.dock} aria-label="Dock">
      {applications.map((app) => (
        <button
          key={app.id}
          data-running={snapshot.running.some((run) => run.appId === app.id)}
          aria-label={`Open ${app.title}`}
          onClick={() => session.send({ type: "dock", appId: app.id })}
        >
          {app.icon}
          <span className={styles.dockTooltip}>{app.title}</span>
          <span className={styles.runningDot} />
        </button>
      ))}
      {minimized.length > 0 && <span className={styles.dockDivider} />}
      {minimized.map((w) => (
        <button
          key={w.id}
          aria-label={`Restore ${w.title}`}
          onClick={() => session.send({ type: "restore", id: w.id })}
        >
          <span className={styles.miniWindow} aria-hidden="true">
            <i />▤
          </span>
          <span className={styles.dockTooltip}>{w.title}</span>
        </button>
      ))}
    </nav>
  );
}
