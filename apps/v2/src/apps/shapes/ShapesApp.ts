import type { AppPorts, AppRuntime } from "../../desktop/types";

type Shape = Readonly<{ id: number; color: string; kind: "circle" | "square" }>;
type Drawing = Readonly<{ shapes: readonly Shape[] }>;
type ShapesSnapshot = Readonly<{
  phase: "running" | "disposed";
  color: string;
  windows: Readonly<Record<string, Drawing>>;
}>;

export class ShapesApp implements AppRuntime {
  #snapshot: ShapesSnapshot = Object.freeze({
    phase: "running",
    color: "#7075df",
    windows: Object.freeze({}),
  });
  #listeners = new Set<() => void>();
  #sequence = 0;
  constructor(readonly ports: AppPorts) {}
  getSnapshot = () => this.#snapshot;
  subscribe = (listener: () => void) => {
    if (this.#snapshot.phase === "disposed") return () => {};
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  };
  #publish(snapshot: ShapesSnapshot) {
    this.#snapshot = Object.freeze({
      ...snapshot,
      windows: Object.freeze(snapshot.windows),
    });
    for (const listener of [...this.#listeners]) {
      try {
        listener();
      } catch (error) {
        console.error("Shapes subscriber failed", error);
      }
    }
  }
  openWindow(id: string) {
    if (this.#snapshot.phase !== "running" || this.#snapshot.windows[id])
      return;
    this.#publish({
      ...this.#snapshot,
      windows: {
        ...this.#snapshot.windows,
        [id]: Object.freeze({
          shapes: Object.freeze([
            Object.freeze({
              id: ++this.#sequence,
              kind: "circle",
              color: this.#snapshot.color,
            }),
          ]),
        }),
      },
    });
  }
  setDefaultColor(color: string) {
    if (
      this.#snapshot.phase === "running" &&
      /^#[0-9a-f]{6}$/i.test(color) &&
      color !== this.#snapshot.color
    )
      this.#publish({ ...this.#snapshot, color });
  }
  addShape(id: string, kind: Shape["kind"]) {
    const drawing = this.#snapshot.windows[id];
    if (!drawing || this.#snapshot.phase !== "running") return;
    this.#publish({
      ...this.#snapshot,
      windows: {
        ...this.#snapshot.windows,
        [id]: Object.freeze({
          shapes: Object.freeze([
            ...drawing.shapes,
            Object.freeze({
              id: ++this.#sequence,
              kind,
              color: this.#snapshot.color,
            }),
          ]),
        }),
      },
    });
  }
  clear(id: string) {
    const drawing = this.#snapshot.windows[id];
    if (!drawing?.shapes.length || this.#snapshot.phase !== "running") return;
    this.#publish({
      ...this.#snapshot,
      windows: {
        ...this.#snapshot.windows,
        [id]: Object.freeze({ shapes: Object.freeze([]) }),
      },
    });
  }
  closeWindow(id: string) {
    if (!this.#snapshot.windows[id]) return;
    const windows = { ...this.#snapshot.windows };
    delete windows[id];
    this.#publish({ ...this.#snapshot, windows });
  }
  dispose() {
    if (this.#snapshot.phase === "disposed") return;
    this.#publish({ phase: "disposed", color: "#7075df", windows: {} });
    this.#listeners.clear();
  }
}
