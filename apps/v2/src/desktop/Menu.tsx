import styles from "./desktop.module.css";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

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
// An open menu at `left`/`top` in the positioned parent. `label` names the menu; a new
// label is a different menu, so switching menus starts with no highlighted row.
export type MenuSpec = Readonly<{
  label: string;
  entries: readonly MenuEntry[];
  left: number;
  top: number;
}>;

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

// Choosing a row blinks its highlight off and on, then runs the command and the menu
// starts to fade. Reference R3: release in 3.317–3.333 s, highlight back on in
// 3.383–3.400 s, fade from 3.438 s (fitted), so off 67 ms and the blink ends at 113 ms
// (±8 ms, one 60 Hz frame).
const BLINK_OFF_MS = 67;
const BLINK_DONE_MS = 113;

/**
 * A macOS pull-down menu. Pass the open menu, or null to close it.
 *
 * Opening and switching to another menu are instant. Closing fades the last menu out
 * (reference R1, R3, R5); while it fades it shows what it showed when it closed, takes
 * no input and is hidden from assistive technology. Choosing a row blinks the row,
 * then runs the command and asks the caller to close. A chosen command always runs,
 * even when the caller replaces the menu during the blink.
 *
 * It owns the column layout (a mark column appears for every row once any row has a
 * mark) and the single highlighted row shared by pointer and keyboard (disabled rows
 * highlight under the pointer but cannot be chosen). The pointer chooses on release,
 * so a press on a title can drag to a row and release on it, as in macOS. While it is
 * open the arrow keys, Home, End, Return and Escape go to it. Escape gives focus back
 * to whatever had it when the menu opened; choosing a row leaves focus to the command.
 */
export function Menu({ menu, onClose }: { menu: MenuSpec | null; onClose(): void }) {
  // `fading` is the menu that was open when `menu` became null. Each opening is a new
  // panel, so a menu reopened while it fades starts fresh.
  const [state, setState] = useState<{
    open: MenuSpec | null;
    fading: MenuSpec | null;
    opening: number;
  }>({ open: menu, fading: null, opening: 0 });
  if (menu !== state.open)
    setState({
      open: menu,
      fading: menu ? null : (state.open ?? state.fading),
      opening: state.opening + (menu && !state.open ? 1 : 0),
    });
  const shown = menu ?? state.fading;
  if (!shown) return null;
  return (
    <Panel
      key={`${state.opening} ${shown.label}`}
      {...shown}
      closing={!menu}
      onClose={onClose}
      onFaded={() => setState((now) => ({ ...now, fading: null }))}
    />
  );
}

function Panel({
  label,
  entries,
  left,
  top,
  closing,
  onClose,
  onFaded,
}: MenuSpec & { closing: boolean; onClose(): void; onFaded(): void }) {
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [blinking, setBlinking] = useState(false);
  const element = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  // The command waiting for the blink to end.
  const pending = useRef<{ run(): void; timers: number[] } | null>(null);
  const items = entries.flatMap((entry, index) =>
    entry === "separator" ? [] : [{ entry, index }],
  );
  const idle = !closing && !blinking;
  const choose = (item: Item, index: number) => {
    if (item.disabled || !idle) return;
    setBlinking(true);
    setHighlighted(null);
    const run = () => {
      pending.current = null;
      item.onSelect();
      onClose();
    };
    pending.current = {
      run,
      timers: [
        window.setTimeout(() => setHighlighted(index), BLINK_OFF_MS),
        window.setTimeout(run, BLINK_DONE_MS),
      ],
    };
  };
  const latest = useRef({ items, highlighted, choose, idle, close: onClose });
  latest.current = { items, highlighted, choose, idle, close: onClose };
  useEffect(() => {
    const opener = document.activeElement;
    const keydown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const { items, highlighted, choose, idle } = latest.current;
      if (!idle) {
        // The blinking menu still owns its keys; a fading one owns none.
        if (pending.current && /^(ArrowDown|ArrowUp|Home|End|Enter|Escape| )$/.test(event.key)) {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
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
        choose(current.entry, current.index);
      } else return;
      // The open menu takes the key, so window and app handlers never see it.
      event.preventDefault();
      event.stopPropagation();
      if (next === undefined) return;
      setHighlighted(next);
      rows.current[next]?.focus();
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      // Replaced during the blink: the chosen command still runs.
      const waiting = pending.current;
      if (!waiting) return;
      waiting.timers.forEach((timer) => window.clearTimeout(timer));
      pending.current = null;
      waiting.run();
    };
  }, []);
  // The fade is a CSS animation. Without one (reduced motion) the menu goes at once.
  useLayoutEffect(() => {
    if (!closing) return;
    const animations = element.current?.getAnimations() ?? [];
    if (!animations.length) return onFaded();
    let current = true;
    Promise.all(animations.map((animation) => animation.finished)).then(
      () => current && onFaded(),
      () => {},
    );
    return () => {
      current = false;
    };
  }, [closing, onFaded]);
  const marked = items.some(({ entry }) => entry.mark);
  return (
    <div
      ref={element}
      className={styles.menu}
      data-marks={marked || undefined}
      data-closing={closing || undefined}
      inert={closing}
      aria-hidden={closing || undefined}
      role="menu"
      aria-label={label}
      style={{ left, top }}
      // A press on the menu leaves keyboard focus where it was, as in macOS.
      onPointerDown={(event) => event.preventDefault()}
      onPointerLeave={() => idle && setHighlighted(null)}
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
            onPointerMove={() => idle && highlighted !== index && setHighlighted(index)}
            onPointerUp={(event) => {
              if (event.button === 0) choose(entry, index);
            }}
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
