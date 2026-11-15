import styles from "./desktop.module.css";
import { useEffect, useRef, useState, type ReactNode } from "react";

// A key equivalent. The part draws the modifiers in macOS order whatever the
// order given here.
export type Shortcut = Readonly<{
  key: string;
  modifiers: readonly ("control" | "option" | "shift" | "command")[];
}>;
export type MenuEntry =
  | "separator"
  | Readonly<{
      label: string;
      shortcut?: Shortcut;
      // State in the mark column: ✓ on (the active window), ◇ a minimized window.
      mark?: "check" | "diamond";
      icon?: ReactNode;
      disabled?: boolean;
      onSelect(): void;
    }>;
type Item = Exclude<MenuEntry, "separator">;

// The marks drawn to reference 11: a checkmark and a diamond taller than wide.
const marks = {
  check: (
    <svg viewBox="0 0 10 9" width="10" height="9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0.9 5L3.6 8.1L9.1 0.9" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 9 11" width="9" height="11" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M4.5 0.75L8.1 5.5L4.5 10.25L0.9 5.5Z" />
    </svg>
  ),
};

const modifierOrder = ["control", "option", "shift", "command"] as const;
const modifierGlyph = {
  control: ["⌃", "Control"],
  option: ["⌥", "Alt"],
  shift: ["⇧", "Shift"],
  command: ["⌘", "Meta"],
} as const;

/**
 * A macOS pull-down menu at `left`/`top` in its positioned parent. It owns the
 * column layout (a mark column appears for every row once any row has a mark), the
 * single highlighted row shared by pointer and keyboard (disabled rows highlight under
 * the pointer but cannot be chosen), and the rule that choosing a row closes the menu.
 * While it is open the arrow keys, Home, End, Return and Escape go to it, as in macOS.
 * Escape gives focus back to whatever had it when the menu opened; choosing a row
 * leaves focus to the command.
 */
export function Menu({
  label,
  entries,
  left,
  top,
  onClose,
}: {
  label: string;
  entries: readonly MenuEntry[];
  left: number;
  top: number;
  onClose(): void;
}) {
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const items = entries.flatMap((entry, index) =>
    entry === "separator" ? [] : [{ entry, index }],
  );
  const choose = (item: Item) => {
    if (item.disabled) return;
    item.onSelect();
    onClose();
  };
  const latest = useRef({ items, highlighted, choose, close: onClose });
  latest.current = { items, highlighted, choose, close: onClose };
  useEffect(() => {
    const opener = document.activeElement;
    const keydown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const { items, highlighted, choose } = latest.current;
      const enabled = items.filter(({ entry }) => !entry.disabled);
      const at = enabled.findIndex(({ index }) => index === highlighted);
      let next: number | undefined;
      if (event.key === "ArrowDown")
        next = enabled[at < 0 ? 0 : (at + 1) % enabled.length]?.index;
      else if (event.key === "ArrowUp")
        next = enabled[at < 0 ? enabled.length - 1 : (at - 1 + enabled.length) % enabled.length]?.index;
      else if (event.key === "Home") next = enabled[0]?.index;
      else if (event.key === "End") next = enabled.at(-1)?.index;
      else if (event.key === "Escape") {
        latest.current.close();
        if (opener instanceof HTMLElement) opener.focus();
      } else if (event.key === "Enter" || event.key === " ") {
        const current = items.find(({ index }) => index === highlighted);
        if (!current) return;
        choose(current.entry);
      } else return;
      // The open menu takes the key, so window and app handlers never see it.
      event.preventDefault();
      event.stopPropagation();
      if (next === undefined) return;
      setHighlighted(next);
      rows.current[next]?.focus();
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);
  const marked = items.some(({ entry }) => entry.mark);
  return (
    <div
      className={styles.menu}
      data-marks={marked || undefined}
      role="menu"
      aria-label={label}
      style={{ left, top }}
      onPointerLeave={() => setHighlighted(null)}
    >
      {entries.map((entry, index) => {
        if (entry === "separator")
          return <div key={index} className={styles.menuSeparator} role="separator" />;
        const modifiers = modifierOrder
          .filter((m) => entry.shortcut?.modifiers.includes(m))
          .map((m) => modifierGlyph[m]);
        return (
          <div
            key={index}
            ref={(row) => {
              rows.current[index] = row;
            }}
            className={styles.menuItem}
            role={entry.mark ? "menuitemcheckbox" : "menuitem"}
            aria-checked={entry.mark ? entry.mark === "check" : undefined}
            aria-disabled={entry.disabled || undefined}
            aria-keyshortcuts={
              entry.shortcut &&
              [...modifiers.map(([, name]) => name), entry.shortcut.key].join("+")
            }
            data-highlighted={highlighted === index || undefined}
            tabIndex={-1}
            onPointerMove={() => highlighted !== index && setHighlighted(index)}
            onClick={() => choose(entry)}
          >
            {entry.mark && (
              <span className={styles.menuMark} aria-hidden="true">
                {marks[entry.mark]}
              </span>
            )}
            <span className={styles.menuLabel}>
              {entry.icon && (
                <span className={styles.menuIcon} aria-hidden="true">
                  {entry.icon}
                </span>
              )}
              {entry.label}
            </span>
            {entry.shortcut && (
              <span className={styles.menuShortcut} aria-hidden="true">
                <span>{modifiers.map(([glyph]) => glyph).join("")}</span>
                <span>{entry.shortcut.key}</span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
