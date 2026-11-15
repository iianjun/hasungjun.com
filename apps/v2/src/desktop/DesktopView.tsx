import type { DesktopSession } from "./DesktopSession";
import { Dock } from "./Dock";
import { MenuBar } from "./MenuBar";
import { Workspace } from "./Workspace";
import styles from "./desktop.module.css";

// Layout only. Each shell module subscribes to the session by itself.
export function DesktopView({
  session,
  theme,
  onThemeChange,
}: {
  session: DesktopSession;
  theme: string;
  onThemeChange(theme: string): void;
}) {
  return (
    <main className={styles.desktop} data-theme={theme} aria-label="Desktop">
      <div className={styles.wallpaper} aria-hidden="true">
        <div className={`${styles.ribbon} ${styles.ribbonOne}`} />
        <div className={`${styles.ribbon} ${styles.ribbonTwo}`} />
        <div className={`${styles.ribbon} ${styles.ribbonThree}`} />
      </div>
      <MenuBar session={session} theme={theme} onThemeChange={onThemeChange} />
      <Workspace session={session} />
      <Dock session={session} />
    </main>
  );
}
