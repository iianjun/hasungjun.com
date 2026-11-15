import type { Clock } from "./clock";
import type { DesktopSession } from "./DesktopSession";
import { Dock } from "./Dock";
import { MenuBar } from "./MenuBar";
import { Workspace } from "./Workspace";
import styles from "./desktop.module.css";

// Layout only. Each shell module subscribes to the session by itself.
export function DesktopView({
  session,
  clock,
}: {
  session: DesktopSession;
  clock: Clock;
}) {
  return (
    <main className={styles.desktop} aria-label="Desktop">
      <div className={styles.wallpaper} aria-hidden="true">
        <div className={`${styles.ribbon} ${styles.ribbonOne}`} />
        <div className={`${styles.ribbon} ${styles.ribbonTwo}`} />
        <div className={`${styles.ribbon} ${styles.ribbonThree}`} />
      </div>
      <MenuBar session={session} clock={clock} />
      <Workspace session={session} />
      <Dock session={session} />
    </main>
  );
}
