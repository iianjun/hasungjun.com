// The contract between an app and the shell.
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

export interface Clock {
  subscribe(listener: () => void): () => void;
  now(): number;
}

// The state the shell publishes and the commands it accepts.
export type Rect = Readonly<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;
export type WindowInfo = Readonly<{
  id: string;
  appId: string;
  runId: string;
  title: string;
  minimized: boolean;
}>;
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
  running: readonly Readonly<{ runId: string; appId: string }>[];
  activeId: string | null;
  frontmostAppId: string | null;
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
