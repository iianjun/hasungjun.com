import type { Clock } from "../core/types";
import { Dock } from "./Dock";
import { MenuBar } from "./MenuBar";
import { Workspace } from "./Workspace";
import styles from "./desktop.module.css";

export function DesktopView({ clock }: { clock: Clock }) {
  return (
    <main className={styles.desktop} aria-label="Desktop">
      <div className={styles.wallpaper} aria-hidden="true">
        <div className={`${styles.ribbon} ${styles.ribbonOne}`} />
        <div className={`${styles.ribbon} ${styles.ribbonTwo}`} />
        <div className={`${styles.ribbon} ${styles.ribbonThree}`} />
      </div>
      <MenuBar clock={clock} />
      <Workspace />
      <Dock />
    </main>
  );
}
