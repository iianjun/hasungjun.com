import {
  Component,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ProviderExoticComponent,
  type ProviderProps,
  type ReactNode,
} from "react";
import type { DesktopSession } from "../core/DesktopSession";
import type { AppDefinition, AppRuntime, WindowInfo } from "../core/types";

// React presentation extends the shell's framework-independent app contract.
export type Application = AppDefinition & {
  readonly icon: ReactNode;
  render(app: AppRuntime, id: string, active: boolean): ReactNode;
};

type Session = DesktopSession<Application>;

const DesktopContext = createContext<Session | null>(null);

export const DesktopProvider: ProviderExoticComponent<ProviderProps<Session>> =
  DesktopContext;

export type DesktopIntent =
  | { type: "dock" | "new" | "quit"; appId: string }
  | { type: "focus" | "minimize" | "restore" | "close"; id: string }
  | { type: "begin"; id: string; mode: "moving" | "resizing" };

// Pointer and keyboard entry points share one token sequence.
let inputSequence = 0;
const nextInputToken = () => ++inputSequence;

const useSession = () => {
  const session = useContext(DesktopContext);
  if (!session) throw new Error("Desktop UI rendered outside DesktopProvider");
  return session;
};

const useSend = (session: Session) =>
  useMemo(
    () => (intent: DesktopIntent) =>
      session.send(
        intent.type === "begin"
          ? { ...intent, token: nextInputToken() }
          : intent,
      ),
    [session],
  );

class AppBoundary extends Component<
  { children: ReactNode; session: Session; runId: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.session.send({ type: "failure", runId: this.props.runId });
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function useDesktop() {
  const session = useSession();
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot);
  const send = useSend(session);
  const renderWindow = useMemo(
    () =>
      (w: WindowInfo, active: boolean): ReactNode => {
        const app = session.getApp(w.runId);
        const registration = session.definitions.find((a) => a.id === w.appId);
        if (!app || !registration) return null;
        return (
          <AppBoundary session={session} runId={w.runId}>
            {registration.render(app, w.id, active)}
          </AppBoundary>
        );
      },
    [session],
  );
  const applications: readonly Pick<Application, "id" | "title" | "icon">[] =
    session.definitions;
  return { snapshot, applications, send, renderWindow };
}

const moveHandle = { "data-drag": true } as const;
const resizeHandle = { "data-resize": true } as const;

export function useWindowFrame(id: string) {
  const session = useSession();
  const send = useSend(session);
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    // Geometry properties have one writer; React never writes these style properties.
    const paint = () => {
      const rect = session.getRect(id);
      if (!rect) return;
      element.style.transform = `translate3d(${rect.x}px, ${rect.y}px, 0)`;
      element.style.width = `${rect.width}px`;
      element.style.height = `${rect.height}px`;
    };
    paint();
    return session.subscribeGeometry(paint);
  }, [session, id]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    let drag:
      | {
          pointer: number;
          token: number;
          x: number;
          y: number;
          dx: number;
          dy: number;
          handle: HTMLElement;
        }
      | undefined;
    const flush = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (drag)
        session.send({
          type: "update",
          token: drag.token,
          dx: drag.dx,
          dy: drag.dy,
        });
    };
    const release = (cancel: boolean) => {
      const current = drag;
      if (!current) return;
      if (!cancel) flush();
      cancelAnimationFrame(frame);
      frame = 0;
      drag = undefined;
      if (cancel) {
        const input = session.getSnapshot().input;
        if (input.phase !== "idle" && input.token === current.token)
          session.send({ type: "cancel" });
      } else session.send({ type: "finish", token: current.token });
      if (current.handle.hasPointerCapture(current.pointer))
        current.handle.releasePointerCapture(current.pointer);
    };
    const down = (event: PointerEvent) => {
      if (
        event.button !== 0 ||
        !event.isPrimary ||
        !(event.target instanceof HTMLElement)
      )
        return;
      const handle = event.target.closest<HTMLElement>(
        "[data-drag], [data-resize]",
      );
      if (
        !handle ||
        (event.target.closest("button") && !handle.hasAttribute("data-resize"))
      )
        return;
      event.preventDefault();
      const token = nextInputToken();
      session.send({
        type: "begin",
        id,
        mode: handle.hasAttribute("data-resize") ? "resizing" : "moving",
        token,
      });
      if (session.getSnapshot().input.phase === "idle") return;
      drag = {
        pointer: event.pointerId,
        token,
        x: event.clientX,
        y: event.clientY,
        dx: 0,
        dy: 0,
        handle,
      };
      handle.setPointerCapture(event.pointerId);
      element.focus({ preventScroll: true });
    };
    const move = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      drag.dx = event.clientX - drag.x;
      drag.dy = event.clientY - drag.y;
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const up = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointer) return;
      drag.dx = event.clientX - drag.x;
      drag.dy = event.clientY - drag.y;
      release(false);
    };
    const cancel = () => {
      release(true);
      const input = session.getSnapshot().input;
      if (input.phase !== "idle" && input.id === id)
        session.send({ type: "cancel" });
    };
    const key = (event: KeyboardEvent) => {
      const input = session.getSnapshot().input;
      if (
        input.phase === "idle" ||
        input.id !== id ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return;
      if (event.key === "Escape" || event.key === "Tab") {
        cancel();
        if (event.key === "Escape") event.preventDefault();
        return;
      }
      if (drag) return;
      if (event.key === "Enter") {
        event.preventDefault();
        session.send({ type: "finish", token: input.token });
        return;
      }
      if (
        !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
      )
        return;
      const rect = session.getRect(id);
      if (!rect) return;
      event.preventDefault();
      const step = event.shiftKey ? 1 : 10;
      const dx =
        (input.phase === "moving"
          ? rect.x - input.origin.x
          : rect.width - input.origin.width) +
        (event.key === "ArrowLeft"
          ? -step
          : event.key === "ArrowRight"
            ? step
            : 0);
      const dy =
        (input.phase === "moving"
          ? rect.y - input.origin.y
          : rect.height - input.origin.height) +
        (event.key === "ArrowUp"
          ? -step
          : event.key === "ArrowDown"
            ? step
            : 0);
      session.send({ type: "update", token: input.token, dx, dy });
    };
    const visibility = () => {
      if (document.hidden) cancel();
    };
    // Shell commands can cancel an input before the next animation frame.
    const detach = session.subscribe(() => {
      const input = session.getSnapshot().input;
      if (drag && (input.phase === "idle" || input.token !== drag.token))
        release(true);
    });
    element.addEventListener("pointerdown", down);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerup", up);
    element.addEventListener("pointercancel", cancel);
    element.addEventListener("lostpointercapture", cancel);
    window.addEventListener("keydown", key);
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      detach();
      cancel();
      cancelAnimationFrame(frame);
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", up);
      element.removeEventListener("pointercancel", cancel);
      element.removeEventListener("lostpointercapture", cancel);
      window.removeEventListener("keydown", key);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [session, id]);
  return { ref: root, send, moveHandle, resizeHandle };
}
