import type { AppPorts, AppRuntime } from "../../desktop/DesktopSession";

type Note = Readonly<{ text: string; status: "ready" | "loading" | "error" }>;
type NotesSnapshot = Readonly<{
  phase: "running" | "disposed";
  defaultText: string;
  windows: Readonly<Record<string, Note>>;
}>;

export class NotesApp implements AppRuntime {
  #snapshot: NotesSnapshot = Object.freeze({
    phase: "running",
    defaultText: "",
    windows: Object.freeze({}),
  });
  #listeners = new Set<() => void>();
  #requests = new Map<string, AbortController>();
  readonly ports: AppPorts;
  #load: (signal: AbortSignal) => Promise<string>;
  constructor(ports: AppPorts, load: (signal: AbortSignal) => Promise<string>) {
    this.ports = ports;
    this.#load = load;
  }
  getSnapshot = () => this.#snapshot;
  subscribe = (listener: () => void) => {
    if (this.#snapshot.phase === "disposed") return () => {};
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  };
  #publish(snapshot: NotesSnapshot) {
    this.#snapshot = Object.freeze({
      ...snapshot,
      windows: Object.freeze(snapshot.windows),
    });
    for (const listener of [...this.#listeners]) {
      try {
        listener();
      } catch (error) {
        console.error("Notes subscriber failed", error);
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
          text: this.#snapshot.defaultText,
          status: "ready",
        }),
      },
    });
  }
  replaceText(id: string, text: string) {
    if (!this.#snapshot.windows[id] || this.#snapshot.phase !== "running")
      return;
    const request = this.#requests.get(id);
    this.#requests.delete(id);
    request?.abort();
    const note = this.#snapshot.windows[id];
    if (!note || this.getSnapshot().phase !== "running") return;
    if (note.text === text && note.status === "ready") return;
    this.#publish({
      ...this.#snapshot,
      windows: {
        ...this.#snapshot.windows,
        [id]: Object.freeze({ text, status: "ready" }),
      },
    });
  }
  setDefaultText(text: string) {
    if (
      this.#snapshot.phase === "running" &&
      this.#snapshot.defaultText !== text
    )
      this.#publish({ ...this.#snapshot, defaultText: text });
  }
  async loadSample(id: string) {
    if (!this.#snapshot.windows[id] || this.#snapshot.phase !== "running")
      return;
    const previous = this.#requests.get(id);
    this.#requests.delete(id);
    previous?.abort();
    const note = this.#snapshot.windows[id];
    if (
      !note ||
      this.getSnapshot().phase !== "running" ||
      this.#requests.has(id)
    )
      return;
    const request = new AbortController();
    this.#requests.set(id, request);
    this.#publish({
      ...this.#snapshot,
      windows: {
        ...this.#snapshot.windows,
        [id]: Object.freeze({ ...note, status: "loading" }),
      },
    });
    try {
      const text = await this.#load(request.signal);
      if (
        this.#requests.get(id) !== request ||
        request.signal.aborted ||
        !this.#snapshot.windows[id] ||
        this.#snapshot.phase !== "running"
      )
        return;
      this.#requests.delete(id);
      this.#publish({
        ...this.#snapshot,
        windows: {
          ...this.#snapshot.windows,
          [id]: Object.freeze({ text, status: "ready" }),
        },
      });
    } catch {
      if (
        this.#requests.get(id) !== request ||
        request.signal.aborted ||
        this.#snapshot.phase !== "running"
      )
        return;
      this.#requests.delete(id);
      const current = this.#snapshot.windows[id];
      if (current)
        this.#publish({
          ...this.#snapshot,
          windows: {
            ...this.#snapshot.windows,
            [id]: Object.freeze({ ...current, status: "error" }),
          },
        });
    }
  }
  closeWindow(id: string) {
    if (!this.#snapshot.windows[id]) return;
    const request = this.#requests.get(id);
    this.#requests.delete(id);
    const windows = { ...this.#snapshot.windows };
    delete windows[id];
    this.#publish({ ...this.#snapshot, windows });
    request?.abort();
  }
  dispose() {
    if (this.#snapshot.phase === "disposed") return;
    // Mark stopped before abort signals can call back into the app.
    this.#snapshot = Object.freeze({
      phase: "disposed",
      defaultText: "",
      windows: Object.freeze({}),
    });
    for (const request of this.#requests.values()) request.abort();
    this.#requests.clear();
    this.#publish(this.#snapshot);
    this.#listeners.clear();
  }
}
