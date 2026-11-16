import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ProviderExoticComponent,
  type ProviderProps,
} from "react";
import type { ShapesApp } from "../core/ShapesApp";

const ShapesContext = createContext<ShapesApp | null>(null);

export const ShapesProvider: ProviderExoticComponent<ProviderProps<ShapesApp>> =
  ShapesContext;

export function useShapes(windowId: string) {
  const app = useContext(ShapesContext);
  if (!app) throw new Error("Shapes UI rendered outside ShapesProvider");
  const drawing = useSyncExternalStore(
    app.subscribe,
    useCallback(() => app.getSnapshot().windows[windowId], [app, windowId]),
  );
  const color = useSyncExternalStore(
    app.subscribe,
    useCallback(() => app.getSnapshot().color, [app]),
  );
  const commands = useMemo(
    () => ({
      addShape: (kind: Parameters<ShapesApp["addShape"]>[1]) =>
        app.addShape(windowId, kind),
      clear: () => app.clear(windowId),
      setDefaultColor: (color: string) => app.setDefaultColor(color),
    }),
    [app, windowId],
  );
  return { drawing, color, ...commands };
}
