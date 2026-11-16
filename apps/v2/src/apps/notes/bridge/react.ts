import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ProviderExoticComponent,
  type ProviderProps,
} from "react";
import type { NotesApp } from "../core/NotesApp";

const NotesContext = createContext<NotesApp | null>(null);

export const NotesProvider: ProviderExoticComponent<ProviderProps<NotesApp>> =
  NotesContext;

export function useNotes(windowId: string) {
  const app = useContext(NotesContext);
  if (!app) throw new Error("Notes UI rendered outside NotesProvider");
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
