import { act, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NotesApp } from "../src/apps/notes/NotesApp";
import { ShapesApp } from "../src/apps/shapes/ShapesApp";
import { useNotes } from "../src/apps/notes/react";
import { useShapes } from "../src/apps/shapes/react";

// A real React root exercises the adapters' public state and commands in both engines.
export async function verifyAdapters() {
  const ports = {
    runId: "fixture",
    newWindow() {},
    closeWindow() {},
    fail() {},
  };
  let resolveSample: ((text: string) => void) | undefined;
  let signal: AbortSignal | undefined;
  const firstNotes = new NotesApp(ports, (input) => {
    signal = input;
    return new Promise<string>((resolve) => {
      resolveSample = resolve;
    });
  });
  const nextNotes = new NotesApp(ports, async () => "next sample");
  const firstShapes = new ShapesApp(ports);
  const nextShapes = new ShapesApp(ports);
  const subscriptions = new Map<NotesApp | ShapesApp, number>();
  for (const app of [firstNotes, nextNotes, firstShapes, nextShapes]) {
    app.openWindow("one");
    app.openWindow("two");
    const subscribe = app.subscribe;
    subscriptions.set(app, 0);
    app.subscribe = (listener) => {
      subscriptions.set(app, (subscriptions.get(app) ?? 0) + 1);
      const detach = subscribe(listener);
      return () => {
        detach();
        subscriptions.set(app, (subscriptions.get(app) ?? 0) - 1);
      };
    };
  }
  let renders = 0;
  function Probe({
    notes,
    shapes,
    id,
  }: {
    notes: NotesApp;
    shapes: ShapesApp;
    id: string;
  }) {
    const { note, defaultText, replaceText, loadSample, setDefaultText } =
      useNotes(notes, id);
    const { drawing, color, addShape, clear, setDefaultColor } = useShapes(
      shapes,
      id,
    );
    renders++;
    return (
      <>
        <output>{JSON.stringify({ note, defaultText, drawing, color })}</output>
        <button data-edit onClick={() => replaceText("edited")}>
          Edit
        </button>
        <button
          data-load
          onClick={() => {
            void loadSample();
          }}
        >
          Load
        </button>
        <button data-default onClick={() => setDefaultText("shared")}>
          Default
        </button>
        <button data-add onClick={() => addShape("square")}>
          Add
        </button>
        <button data-clear onClick={clear}>
          Clear
        </button>
        <button data-color onClick={() => setDefaultColor("#123456")}>
          Color
        </button>
      </>
    );
  }
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  const previousActEnvironment = Reflect.get(
    globalThis,
    "IS_REACT_ACT_ENVIRONMENT",
  );
  Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
  try {
    await act(() =>
      root.render(
        <StrictMode>
          <Probe notes={firstNotes} shapes={firstShapes} id="one" />
        </StrictMode>,
      ),
    );
    const connected =
      [...subscriptions.values()].reduce((sum, count) => sum + count, 0) === 4;
    const before = renders;
    await act(() => {
      firstNotes.replaceText("two", "other window");
      firstShapes.addShape("two", "square");
    });
    const selective = renders === before;
    await act(() => {
      host.querySelector<HTMLButtonElement>("[data-default]")?.click();
      host.querySelector<HTMLButtonElement>("[data-color]")?.click();
    });
    const shared =
      host.textContent?.includes("shared") &&
      host.textContent.includes("#123456");
    await act(() =>
      host.querySelector<HTMLButtonElement>("[data-load]")?.click(),
    );
    await act(() => root.render(null));
    const detached = [...subscriptions.values()].every((count) => count === 0);
    const survived =
      firstNotes.getSnapshot().phase === "running" &&
      firstShapes.getSnapshot().phase === "running" &&
      signal?.aborted === false;
    if (!resolveSample) throw new Error("Sample request did not start");
    resolveSample("completed while detached");
    await Promise.resolve();
    await act(() =>
      root.render(
        <StrictMode>
          <Probe notes={firstNotes} shapes={firstShapes} id="one" />
        </StrictMode>,
      ),
    );
    const reconnected = host.textContent?.includes("completed while detached");
    await act(() =>
      root.render(
        <StrictMode>
          <Probe notes={firstNotes} shapes={firstShapes} id="two" />
        </StrictMode>,
      ),
    );
    await act(() => {
      host.querySelector<HTMLButtonElement>("[data-edit]")?.click();
      host.querySelector<HTMLButtonElement>("[data-clear]")?.click();
    });
    const retargeted =
      firstNotes.getSnapshot().windows.two?.text === "edited" &&
      firstNotes.getSnapshot().windows.one?.text ===
        "completed while detached" &&
      firstShapes.getSnapshot().windows.two?.shapes.length === 0 &&
      firstShapes.getSnapshot().windows.one?.shapes.length === 1;
    await act(() =>
      root.render(
        <StrictMode>
          <Probe notes={nextNotes} shapes={nextShapes} id="two" />
        </StrictMode>,
      ),
    );
    const replaced =
      subscriptions.get(firstNotes) === 0 &&
      subscriptions.get(firstShapes) === 0;
    const atReplacement = renders;
    await act(() => {
      firstNotes.replaceText("two", "old instance");
      firstShapes.addShape("two", "circle");
    });
    const oldInstanceIgnored = renders === atReplacement;
    await act(() => {
      host.querySelector<HTMLButtonElement>("[data-edit]")?.click();
      host.querySelector<HTMLButtonElement>("[data-add]")?.click();
    });
    const receiver =
      nextNotes.getSnapshot().windows.two?.text === "edited" &&
      firstNotes.getSnapshot().windows.two?.text === "old instance" &&
      nextShapes.getSnapshot().windows.two?.shapes.length === 2 &&
      firstShapes.getSnapshot().windows.two?.shapes.length === 1;
    await act(() => root.render(null));
    return {
      connected,
      selective,
      shared,
      detached,
      survived,
      reconnected,
      retargeted,
      replaced,
      oldInstanceIgnored,
      receiver,
      cleaned: [...subscriptions.values()].every((count) => count === 0),
    };
  } finally {
    await act(() => root.unmount());
    Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", previousActEnvironment);
    host.remove();
    for (const app of [firstNotes, nextNotes, firstShapes, nextShapes])
      app.dispose();
  }
}
