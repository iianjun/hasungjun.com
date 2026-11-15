import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { ShapesApp } from "./ShapesApp";

// Commands retain their receiver and window when React replaces either input.
export function useShapes(app: ShapesApp, windowId: string) {
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
