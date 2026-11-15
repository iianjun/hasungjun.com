import { memo } from "react";
import type { NotesApp } from "./NotesApp";
import { useNotes } from "./react";
import styles from "./notes.module.css";

export const NotesView = memo(function NotesView({
  app,
  windowId,
  active,
}: {
  app: NotesApp;
  windowId: string;
  active: boolean;
}) {
  const {
    note,
    defaultText,
    newWindow,
    replaceText,
    setDefaultText,
    loadSample,
  } = useNotes(app, windowId);
  if (!note) return null;
  return (
    <div className="app-content" data-content="notes" data-active={active}>
      <aside className={styles.notesSidebar}>
        <span className={styles.sidebarHeading}>On My Desktop</span>
        <div className={styles.selectedFolder}>
          ▤ <strong>Notes</strong>
          <span>1</span>
        </div>
        <p>Only on this visit</p>
      </aside>
      <div className={styles.noteEditor}>
        <div className="app-toolbar">
          <button onClick={newWindow} aria-label="New Notes window">
            ＋
          </button>
          <span>All Notes</span>
          <button
            onClick={() => {
              void loadSample();
            }}
            disabled={note.status === "loading"}
          >
            Sample
          </button>
        </div>
        <div className={styles.noteDate}>November 14, 2026 at 9:41 AM</div>
        <textarea
          aria-label="Note text"
          placeholder="Start a note…"
          value={note.text}
          onChange={(e) => replaceText(e.target.value)}
          spellCheck={false}
        />
        <footer className="app-footer">
          <label>
            New notes{" "}
            <input
              aria-label="Default note text"
              value={defaultText}
              placeholder="Blank"
              onChange={(e) => setDefaultText(e.target.value)}
            />
          </label>
          <span role="status">
            {note.status === "loading"
              ? "Loading…"
              : note.status === "error"
                ? "Could not load. Try again."
                : `${note.text.length} characters`}
          </span>
        </footer>
      </div>
    </div>
  );
});
