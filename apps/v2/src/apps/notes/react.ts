import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { NotesApp } from "./NotesApp";

// Select only this window and the shared default. Unsubscribing never ends a run.
export function useNotes(app: NotesApp, windowId: string) {
  const note = useSyncExternalStore(
    app.subscribe,
    useCallback(() => app.getSnapshot().windows[windowId], [app, windowId]),
  );
  const defaultText = useSyncExternalStore(
    app.subscribe,
    useCallback(() => app.getSnapshot().defaultText, [app]),
  );
  const commands = useMemo(
    () => ({
      newWindow: () => app.ports.newWindow(),
      replaceText: (text: string) => app.replaceText(windowId, text),
      setDefaultText: (text: string) => app.setDefaultText(text),
      loadSample: () => app.loadSample(windowId),
    }),
    [app, windowId],
  );
  return { note, defaultText, ...commands };
}
