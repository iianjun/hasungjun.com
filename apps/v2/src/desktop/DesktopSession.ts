/** The shell owns execution and geometry; app data never enters its snapshot. */
export interface AppRuntime {
  openWindow(id: string): void;
  closeWindow(id: string): void;
  dispose(): void;
}
export interface AppPorts {
  readonly runId: string;
  newWindow(): void;
  closeWindow(id: string): void;
  fail(error: unknown): void;
}
export interface AppDefinition {
  readonly id: string;
  readonly title: string;
  create(ports: AppPorts): AppRuntime;
}
export type Rect = Readonly<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;
type WindowInfo = Readonly<{
  id: string;
  appId: string;
  runId: string;
  title: string;
  minimized: boolean;
}>;
type Run = {
  id: string;
  appId: string;
  phase: "starting" | "running" | "stopping";
  app?: AppRuntime;
};
type Input =
  | Readonly<{ phase: "idle" }>
  | Readonly<{
      phase: "moving" | "resizing";
      id: string;
      token: number;
      origin: Rect;
    }>;
export type ShellSnapshot = Readonly<{
  phase: "unavailable" | "available" | "disposed";
  windows: readonly WindowInfo[];
  running: readonly string[];
  activeId: string | null;
  input: Input;
  error: string | null;
}>;
export type ShellCommand =
  | { type: "dock" | "new" | "quit"; appId: string; sourceRunId?: string }
  | {
      type: "focus" | "minimize" | "restore" | "close";
      id: string;
      sourceRunId?: string;
    }
  | { type: "begin"; id: string; mode: "moving" | "resizing"; token: number }
  | { type: "update"; token: number; dx: number; dy: number }
  | { type: "finish"; token: number }
  | { type: "cancel" }
  | { type: "environment"; available: boolean; width: number; height: number }
  | { type: "failure"; runId: string }
  | { type: "dispose" };

export class DesktopSession {
  #runs = new Map<string, Run>();
  #windows: WindowInfo[] = [];
  #rects = new Map<string, Rect>();
  #listeners = new Set<() => void>();
  #geometryListeners = new Set<() => void>();
  #queue: ShellCommand[] = [];
  #processing = false;
  #sequence = 0;
  #width = 1440;
  #height = 772;
  #snapshot: ShellSnapshot = Object.freeze({
    phase: "unavailable",
    windows: Object.freeze([]),
    running: Object.freeze([]),
    activeId: null,
    input: Object.freeze({ phase: "idle" }),
    error: null,
  });
  constructor(readonly definitions: readonly AppDefinition[]) {}
  getSnapshot = () => this.#snapshot;
  getRect = (id: string) => this.#rects.get(id);
  getApp = (runId: string) => this.#runs.get(runId)?.app;
  subscribe = (listener: () => void) => {
    if (this.#snapshot.phase === "disposed") return () => {};
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  };
  subscribeGeometry = (listener: () => void) => {
    this.#geometryListeners.add(listener);
    return () => {
      this.#geometryListeners.delete(listener);
    };
  };
  // Serial commands defer reentrant app requests until their current transition completes.
  send = (command: ShellCommand) => {
    if (this.#snapshot.phase === "disposed") return;
    this.#queue.push(command);
    if (this.#processing) return;
    this.#processing = true;
    try {
      let next;
      while ((next = this.#queue.shift())) this.#transition(next);
    } finally {
      this.#processing = false;
    }
  };
  #notify(geometry = false) {
    for (const listener of [
      ...(geometry ? this.#geometryListeners : this.#listeners),
    ]) {
      try {
        listener();
      } catch (error) {
        console.error("Desktop subscriber failed", error);
      }
    }
  }
  #publish(patch: Partial<ShellSnapshot> = {}) {
    const activeId =
      patch.activeId === undefined ? this.#snapshot.activeId : patch.activeId;
    this.#snapshot = Object.freeze({
      ...this.#snapshot,
      ...patch,
      windows: Object.freeze([...this.#windows]),
      running: Object.freeze(
        [...this.#runs.values()]
          .filter((r) => r.phase === "running")
          .map((r) => r.appId),
      ),
      activeId: this.#windows.some((w) => w.id === activeId && !w.minimized)
        ? activeId
        : (this.#windows.findLast((w) => !w.minimized)?.id ?? null),
    });
    this.#notify();
  }
  #clamp(rect: Rect): Rect {
    const width = Math.max(
      Math.min(320, this.#width),
      Math.min(this.#width, rect.width),
    );
    const height = Math.max(
      Math.min(200, this.#height),
      Math.min(this.#height, rect.height),
    );
    return Object.freeze({
      width,
      height,
      x: Math.max(0, Math.min(this.#width - width, rect.x)),
      y: Math.max(0, Math.min(this.#height - height, rect.y)),
    });
  }
  #cancel() {
    const input = this.#snapshot.input;
    if (input.phase === "idle") return;
    if (this.#rects.has(input.id)) this.#rects.set(input.id, input.origin);
    this.#snapshot = Object.freeze({
      ...this.#snapshot,
      input: Object.freeze({ phase: "idle" }),
    });
    this.#notify(true);
  }
  #stop(run: Run) {
    run.phase = "stopping";
    this.#runs.delete(run.id); // Revoke injected capabilities before calling app cleanup.
    for (const w of this.#windows)
      if (w.runId === run.id) this.#rects.delete(w.id);
    this.#windows = this.#windows.filter((w) => w.runId !== run.id);
    try {
      run.app?.dispose();
    } catch (error) {
      console.error("App cleanup failed", error);
    }
  }
  #call(run: Run, action: (app: AppRuntime) => void): boolean {
    if (run.phase !== "running" || !run.app) return false;
    try {
      action(run.app);
      return true;
    } catch {
      this.#stop(run);
      this.#publish({
        error: "An app stopped unexpectedly. Other apps are still available.",
      });
      return false;
    }
  }
  #open(appId: string) {
    const definition = this.definitions.find((d) => d.id === appId);
    if (!definition) return;
    let run = [...this.#runs.values()].find((r) => r.appId === appId);
    if (!run) {
      const id = `run-${++this.#sequence}`;
      run = { id, appId, phase: "starting" };
      this.#runs.set(id, run);
      const current = run;
      try {
        run.app = definition.create(
          Object.freeze({
            runId: id,
            newWindow: () => {
              if (this.#runs.get(id) === current && current.phase === "running")
                this.send({ type: "new", appId, sourceRunId: id });
            },
            closeWindow: (windowId: string) => {
              if (
                this.#runs.get(id) === current &&
                current.phase === "running" &&
                this.#windows.some((w) => w.id === windowId && w.runId === id)
              )
                this.send({ type: "close", id: windowId, sourceRunId: id });
            },
            fail: () => {
              if (this.#runs.get(id) === current)
                this.send({ type: "failure", runId: id });
            },
          }),
        );
        run.phase = "running";
      } catch {
        this.#stop(run);
        this.#publish({ error: "This app could not start." });
        return;
      }
    }
    const id = `window-${++this.#sequence}`;
    if (!this.#call(run, (app) => app.openWindow(id))) return;
    const offset = (this.#windows.length % 8) * 28;
    this.#rects.set(
      id,
      this.#clamp({ x: 72 + offset, y: 48 + offset, width: 540, height: 380 }),
    );
    this.#windows.push(
      Object.freeze({
        id,
        appId,
        runId: run.id,
        title: `${definition.title} ${id.split("-")[1]}`,
        minimized: false,
      }),
    );
    this.#publish({ activeId: id, error: null });
  }
  #transition(command: ShellCommand) {
    if (this.#snapshot.phase === "disposed") return;
    if ("sourceRunId" in command && command.sourceRunId) {
      const source = this.#runs.get(command.sourceRunId);
      if (!source || source.phase !== "running") return;
      if (
        "id" in command &&
        !this.#windows.some((w) => w.id === command.id && w.runId === source.id)
      )
        return;
    }
    if (command.type === "dispose") {
      this.#cancel();
      for (const run of [...this.#runs.values()]) this.#stop(run);
      this.#publish({ phase: "disposed" });
      this.#listeners.clear();
      this.#geometryListeners.clear();
      this.#queue.length = 0;
      return;
    }
    if (command.type === "failure") {
      const run = this.#runs.get(command.runId);
      if (run) {
        this.#cancel();
        this.#stop(run);
        this.#publish({
          error: "An app stopped unexpectedly. Other apps are still available.",
        });
      }
      return;
    }
    if (command.type === "environment") {
      this.#cancel();
      if (
        Number.isFinite(command.width) &&
        Number.isFinite(command.height) &&
        command.width > 0 &&
        command.height > 0
      ) {
        this.#width = command.width;
        this.#height = command.height;
        for (const [id, rect] of this.#rects)
          this.#rects.set(id, this.#clamp(rect));
      }
      this.#publish({ phase: command.available ? "available" : "unavailable" });
      this.#notify(true);
      return;
    }
    if (command.type === "cancel") {
      this.#cancel();
      this.#publish();
      return;
    }
    if (this.#snapshot.phase !== "available") return;
    if (command.type === "update" || command.type === "finish") {
      const input = this.#snapshot.input;
      if (input.phase === "idle" || input.token !== command.token) return;
      if (command.type === "finish") {
        this.#publish({ input: Object.freeze({ phase: "idle" }) });
        return;
      }
      if (!Number.isFinite(command.dx) || !Number.isFinite(command.dy)) return;
      const r = input.origin;
      this.#rects.set(
        input.id,
        this.#clamp(
          input.phase === "moving"
            ? { ...r, x: r.x + command.dx, y: r.y + command.dy }
            : {
                ...r,
                width: Math.min(this.#width - r.x, r.width + command.dx),
                height: Math.min(this.#height - r.y, r.height + command.dy),
              },
        ),
      );
      this.#notify(true);
      return;
    }
    // Every other window command rolls back any input transaction first.
    this.#cancel();
    if (command.type === "dock") {
      const candidates = this.#windows.filter((w) => w.appId === command.appId);
      const target =
        candidates.findLast((w) => !w.minimized) ?? candidates.at(-1);
      if (target) this.#transition({ type: "restore", id: target.id });
      else this.#open(command.appId);
    } else if (command.type === "new") this.#open(command.appId);
    else if (command.type === "quit") {
      const run = [...this.#runs.values()].find(
        (r) => r.appId === command.appId,
      );
      if (run) this.#stop(run);
      this.#publish();
    } else if ("id" in command) {
      const w = this.#windows.find((w) => w.id === command.id);
      if (!w) {
        this.#publish();
        return;
      }
      if (command.type === "close") {
        const run = this.#runs.get(w.runId);
        this.#windows = this.#windows.filter((other) => other.id !== w.id);
        this.#rects.delete(w.id);
        if (run) this.#call(run, (app) => app.closeWindow(w.id));
        this.#publish();
      } else if (command.type === "minimize") {
        this.#windows = this.#windows.map((other) =>
          other.id === w.id ? Object.freeze({ ...w, minimized: true }) : other,
        );
        this.#publish();
      } else if (
        command.type === "restore" ||
        (command.type === "focus" && !w.minimized)
      ) {
        this.#windows = [
          ...this.#windows.filter((other) => other.id !== w.id),
          Object.freeze({ ...w, minimized: false }),
        ];
        this.#publish({ activeId: w.id });
      } else if (command.type === "begin" && !w.minimized) {
        const origin = this.#rects.get(w.id);
        if (!origin) return;
        this.#windows = [
          ...this.#windows.filter((other) => other.id !== w.id),
          w,
        ];
        this.#publish({
          activeId: w.id,
          input: Object.freeze({
            phase: command.mode,
            id: w.id,
            token: command.token,
            origin,
          }),
        });
      } else this.#publish();
    }
  }
}
