import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { DesktopSession } from "../src/desktop/core/DesktopSession";
import type { AppPorts, AppDefinition } from "../src/desktop/core/types";
import { NotesApp } from "../src/apps/notes/core/NotesApp";
import { ShapesApp } from "../src/apps/shapes/core/ShapesApp";

const ports: AppPorts = {
  runId: "test",
  newWindow() {},
  closeWindow() {},
  fail() {},
};

test("core는 React와 JSX 런타임 없이 import하고 실행할 수 있음", () => {
  execFileSync(
    process.execPath,
    [
      "--import",
      "tsx",
      "--input-type=module",
      "-e",
      `
    import { registerHooks } from "node:module";
    import assert from "node:assert/strict";
    registerHooks({
      resolve(specifier, context, nextResolve) {
        if (/^(react|react-dom)(\\/|$)/.test(specifier))
          throw new Error("Core imported React: " + specifier);
        return nextResolve(specifier, context);
      },
    });
    const { DesktopSession } = await import("./src/desktop/core/DesktopSession.ts");
    const { NotesApp } = await import("./src/apps/notes/core/NotesApp.ts");
    const { ShapesApp } = await import("./src/apps/shapes/core/ShapesApp.ts");
    const session = new DesktopSession([
      { id: "notes", title: "Notes", create: ports => new NotesApp(ports, async () => "sample") },
      { id: "shapes", title: "Shapes", create: ports => new ShapesApp(ports) },
    ]);
    session.send({ type: "environment", available: true, width: 1440, height: 772 });
    session.send({ type: "new", appId: "notes" });
    session.send({ type: "new", appId: "shapes" });
    assert.equal(session.getSnapshot().windows.length, 2);
    session.send({ type: "dispose" });
    assert.equal(session.getSnapshot().phase, "disposed");
  `,
    ],
    { cwd: new URL("..", import.meta.url), stdio: "pipe" },
  );
});
function fixture(extra: AppDefinition[] = []) {
  const shell = new DesktopSession([
    {
      id: "notes",
      title: "Notes",
      create: (p) => new NotesApp(p, async () => "sample"),
    },
    { id: "shapes", title: "Shapes", create: (p) => new ShapesApp(p) },
    ...extra,
  ]);
  shell.send({
    type: "environment",
    available: true,
    width: 1440,
    height: 772,
  });
  return shell;
}
function activeWindow(shell: DesktopSession) {
  const window = shell
    .getSnapshot()
    .windows.find((w) => w.id === shell.getSnapshot().activeId);
  assert.ok(window);
  return window;
}

test("같은 앱의 독 반복 클릭, 다중 창, 마지막 창 닫기, 종료·재실행을 구분함", () => {
  const shell = fixture();
  shell.send({ type: "dock", appId: "notes" });
  const first = activeWindow(shell);
  const app = shell.getApp(first.runId);
  assert.ok(app instanceof NotesApp);
  app.setDefaultText("new window default");
  app.replaceText(first.id, "private first");
  shell.send({ type: "dock", appId: "notes" });
  assert.equal(shell.getSnapshot().windows.length, 1);
  shell.send({ type: "new", appId: "notes" });
  const second = activeWindow(shell);
  assert.equal(
    app.getSnapshot().windows[second.id]?.text,
    "new window default",
  );
  assert.equal(app.getSnapshot().windows[first.id]?.text, "private first");
  shell.send({ type: "close", id: second.id });
  shell.send({ type: "close", id: first.id });
  // A windowless run stays reachable through the published run id.
  assert.deepEqual(shell.getSnapshot().running, [
    { runId: first.runId, appId: "notes" },
  ]);
  assert.equal(shell.getApp(first.runId), app);
  assert.equal(app.getSnapshot().phase, "running");
  shell.send({ type: "dock", appId: "notes" });
  assert.equal(activeWindow(shell).runId, first.runId);
  shell.send({ type: "quit", appId: "notes" });
  assert.equal(app.getSnapshot().phase, "disposed");
  shell.send({ type: "dock", appId: "notes" });
  const restarted = activeWindow(shell);
  assert.notEqual(restarted.runId, first.runId);
  const fresh = shell.getApp(restarted.runId);
  assert.ok(fresh instanceof NotesApp);
  assert.equal(fresh.getSnapshot().defaultText, "");
});

test("frontmost app은 활성 창의 앱이고 창이 없으면 마지막에 실행한 앱임", () => {
  const shell = fixture();
  assert.equal(shell.getSnapshot().frontmostAppId, null);
  shell.send({ type: "dock", appId: "notes" });
  const notes = activeWindow(shell);
  shell.send({ type: "dock", appId: "shapes" });
  const shapes = activeWindow(shell);
  assert.equal(shell.getSnapshot().frontmostAppId, "shapes");
  shell.send({ type: "focus", id: notes.id });
  assert.equal(shell.getSnapshot().frontmostAppId, "notes");
  shell.send({ type: "close", id: shapes.id });
  shell.send({ type: "close", id: notes.id });
  assert.equal(shell.getSnapshot().frontmostAppId, "shapes");
  shell.send({ type: "quit", appId: "shapes" });
  assert.equal(shell.getSnapshot().frontmostAppId, "notes");
  shell.send({ type: "quit", appId: "notes" });
  assert.equal(shell.getSnapshot().frontmostAppId, null);
});

test("독은 최근 보이는 창을 우선하고 전체 최소화 때 최근 창을 복원함", () => {
  const shell = fixture();
  shell.send({ type: "new", appId: "notes" });
  const first = activeWindow(shell);
  shell.send({ type: "new", appId: "notes" });
  const second = activeWindow(shell);
  const app = shell.getApp(first.runId);
  assert.ok(app instanceof NotesApp);
  app.replaceText(second.id, "retained");
  shell.send({ type: "minimize", id: second.id });
  shell.send({ type: "dock", appId: "notes" });
  assert.equal(shell.getSnapshot().activeId, first.id);
  shell.send({ type: "minimize", id: first.id });
  assert.equal(shell.getSnapshot().activeId, null);
  shell.send({ type: "dock", appId: "notes" });
  assert.equal(shell.getSnapshot().activeId, first.id);
  shell.send({ type: "restore", id: second.id });
  assert.equal(app.getSnapshot().windows[second.id]?.text, "retained");
});

test("창 이동은 의미 snapshot과 앱 데이터를 다시 발행하지 않으며 확정·취소를 구분함", () => {
  const shell = fixture();
  shell.send({ type: "new", appId: "notes" });
  const w = activeWindow(shell);
  const origin = shell.getRect(w.id);
  assert.ok(origin);
  shell.send({ type: "begin", id: w.id, mode: "moving", token: 1 });
  const semantic = shell.getSnapshot();
  let geometry = 0;
  const unsubscribe = shell.subscribeGeometry(() => geometry++);
  shell.send({ type: "update", token: 1, dx: 9999, dy: 9999 });
  assert.equal(shell.getSnapshot(), semantic);
  assert.equal(geometry, 1);
  assert.deepEqual(shell.getRect(w.id), { ...origin, x: 900, y: 392 });
  shell.send({ type: "cancel" });
  assert.deepEqual(shell.getRect(w.id), origin);
  shell.send({ type: "begin", id: w.id, mode: "resizing", token: 2 });
  shell.send({ type: "update", token: 2, dx: -999, dy: -999 });
  shell.send({ type: "finish", token: 2 });
  assert.equal(shell.getRect(w.id)?.width, 320);
  assert.equal(shell.getRect(w.id)?.height, 200);
  shell.send({ type: "update", token: 2, dx: 200, dy: 200 });
  assert.equal(shell.getRect(w.id)?.width, 320);
  unsubscribe();
});

test("환경 전환은 입력만 취소하고 앱·창을 보존하며 작업 영역 축소를 보정함", () => {
  const shell = fixture();
  shell.send({ type: "new", appId: "notes" });
  const w = activeWindow(shell);
  const app = shell.getApp(w.runId);
  assert.ok(app instanceof NotesApp);
  app.replaceText(w.id, "persistent visit");
  const origin = shell.getRect(w.id);
  shell.send({ type: "begin", id: w.id, mode: "moving", token: 1 });
  shell.send({ type: "update", token: 1, dx: 400, dy: 200 });
  shell.send({ type: "environment", available: false, width: 0, height: 0 });
  assert.deepEqual(shell.getRect(w.id), origin);
  shell.send({ type: "new", appId: "shapes" });
  assert.equal(shell.getSnapshot().windows.length, 1);
  shell.send({ type: "environment", available: true, width: 400, height: 250 });
  assert.deepEqual(shell.getRect(w.id), {
    x: 0,
    y: 0,
    width: 400,
    height: 250,
  });
  assert.equal(app.getSnapshot().windows[w.id]?.text, "persistent visit");
});

test("Notes 작업 교체·수동 편집·창 닫기는 늦은 성공과 실패를 무시함", async () => {
  const pending: {
    signal: AbortSignal;
    resolve(text: string): void;
    reject(error: Error): void;
  }[] = [];
  const app = new NotesApp(
    ports,
    (signal) =>
      new Promise<string>((resolve, reject) =>
        pending.push({ signal, resolve, reject }),
      ),
  );
  app.openWindow("a");
  app.openWindow("b");
  const first = app.loadSample("a");
  const second = app.loadSample("a");
  const other = app.loadSample("b");
  assert.equal(pending[0]?.signal.aborted, true);
  pending[0]?.resolve("stale");
  pending[1]?.resolve("current");
  pending[2]?.resolve("independent");
  await Promise.all([first, second, other]);
  assert.equal(app.getSnapshot().windows.a?.text, "current");
  assert.equal(app.getSnapshot().windows.b?.text, "independent");
  const edit = app.loadSample("a");
  app.replaceText("a", "typed");
  pending[3]?.resolve("overwrite");
  await edit;
  assert.equal(app.getSnapshot().windows.a?.text, "typed");
  const close = app.loadSample("a");
  app.closeWindow("a");
  pending[4]?.reject(new Error("late"));
  await close;
  assert.equal(app.getSnapshot().windows.a, undefined);
  assert.equal(app.getSnapshot().windows.b?.text, "independent");
  const stop = app.loadSample("b");
  app.dispose();
  pending[5]?.resolve("late");
  await stop;
  assert.equal(pending[5]?.signal.aborted, true);
  assert.equal(app.getSnapshot().phase, "disposed");
});

test("snapshot은 안정적인 읽기 전용 값이며 구독 해제가 실행을 종료하지 않음", () => {
  const app = new NotesApp(ports, async () => "");
  app.openWindow("a");
  const previous = app.getSnapshot();
  assert.equal(previous, app.getSnapshot());
  assert.equal(
    Reflect.set(previous.windows.a ?? {}, "text", "external"),
    false,
  );
  let notifications = 0;
  const off = app.subscribe(() => notifications++);
  app.replaceText("a", "edited");
  off();
  app.replaceText("a", "again");
  assert.equal(notifications, 1);
  assert.equal(previous.windows.a?.text, "");
  assert.equal(app.getSnapshot().windows.a?.text, "again");
  app.dispose();
  const stopped = app.getSnapshot();
  app.dispose();
  app.openWindow("late");
  assert.equal(app.getSnapshot(), stopped);
});

test("Shapes의 앱 기본값과 창별 작업 데이터가 독립적임", () => {
  const app = new ShapesApp(ports);
  app.openWindow("a");
  const before = app.getSnapshot();
  app.setDefaultColor("#aabbcc");
  app.openWindow("b");
  app.addShape("a", "square");
  assert.equal(before.windows.a?.shapes.length, 1);
  assert.equal(app.getSnapshot().windows.a?.shapes[0]?.color, "#7075df");
  assert.equal(app.getSnapshot().windows.a?.shapes[1]?.color, "#aabbcc");
  assert.equal(app.getSnapshot().windows.b?.shapes[0]?.color, "#aabbcc");
  assert.ok(Object.isFrozen(app.getSnapshot().windows.a?.shapes[0]));
  app.closeWindow("a");
  assert.equal(app.getSnapshot().windows.b?.shapes.length, 1);
  app.closeWindow("b");
  assert.equal(app.getSnapshot().color, "#aabbcc");
  app.dispose();
  app.dispose();
});

test("주입 포트는 다른 실행의 창과 종료된 실행의 요청을 거절함", () => {
  const shell = fixture();
  shell.send({ type: "new", appId: "notes" });
  const a = activeWindow(shell);
  const notes = shell.getApp(a.runId);
  assert.ok(notes instanceof NotesApp);
  shell.send({ type: "new", appId: "shapes" });
  const b = activeWindow(shell);
  notes.ports.closeWindow(b.id);
  assert.equal(shell.getSnapshot().windows.length, 2);
  shell.send({ type: "quit", appId: "notes" });
  notes.ports.newWindow();
  notes.ports.closeWindow(b.id);
  assert.deepEqual(shell.getSnapshot().running, [
    { runId: b.runId, appId: "shapes" },
  ]);
  assert.equal(shell.getSnapshot().windows.length, 1);
});

test("생성·실행·정리 실패를 한 실행에 격리하고 재진입 명령을 순서대로 처리함", () => {
  const shell = fixture([
    {
      id: "throws",
      title: "Throws",
      create: () => {
        throw new Error("start");
      },
    },
    {
      id: "broken",
      title: "Broken",
      create: () => ({
        openWindow() {
          throw new Error("open");
        },
        closeWindow() {},
        dispose() {
          throw new Error("cleanup");
        },
      }),
    },
    {
      id: "reentrant",
      title: "Reentrant",
      create: (p) => ({
        openWindow(id) {
          p.closeWindow(id);
        },
        closeWindow() {},
        dispose() {},
      }),
    },
  ]);
  shell.send({ type: "new", appId: "notes" });
  const note = activeWindow(shell);
  shell.send({ type: "new", appId: "throws" });
  shell.send({ type: "new", appId: "broken" });
  assert.equal(shell.getSnapshot().activeId, note.id);
  assert.deepEqual(shell.getSnapshot().running, [
    { runId: note.runId, appId: "notes" },
  ]);
  shell.send({ type: "new", appId: "reentrant" });
  assert.equal(shell.getSnapshot().windows.length, 2);
  // Opening app cannot yet close an uncommitted shell window. Later requests may close it.
  shell.send({ type: "new", appId: "shapes" });
  assert.equal(activeWindow(shell).appId, "shapes");
});

test("창 명령과 dispose가 대기 입력을 취소하며 구독 예외가 다른 관찰자를 막지 않음", () => {
  const shell = fixture();
  shell.send({ type: "new", appId: "notes" });
  const w = activeWindow(shell);
  shell.send({ type: "begin", id: w.id, mode: "moving", token: 3 });
  shell.send({ type: "update", token: 3, dx: 10, dy: 20 });
  shell.send({ type: "minimize", id: w.id });
  assert.equal(shell.getSnapshot().input.phase, "idle");
  const app = shell.getApp(w.runId);
  assert.ok(app instanceof NotesApp);
  let seen = 0;
  const off = app.subscribe(() => {
    throw new Error("observer");
  });
  app.subscribe(() => seen++);
  app.replaceText(w.id, "survives");
  assert.equal(seen, 1);
  off();
  shell.send({ type: "dispose" });
  assert.equal(shell.getSnapshot().phase, "disposed");
  assert.equal(app.getSnapshot().phase, "disposed");
  const stopped = shell.getSnapshot();
  shell.send({ type: "new", appId: "shapes" });
  assert.equal(shell.getSnapshot(), stopped);
});

test("abort 콜백이 창을 닫아도 편집·재요청이 닫힌 창을 복구하지 않음", async () => {
  const app: NotesApp = new NotesApp(
    ports,
    (signal) =>
      new Promise((_resolve, reject) => {
        signal.addEventListener(
          "abort",
          () => {
            app.closeWindow("a");
            reject(Error("cancelled"));
          },
          { once: true },
        );
      }),
  );
  app.openWindow("a");
  const first = app.loadSample("a");
  app.replaceText("a", "must not revive");
  await first;
  assert.equal(app.getSnapshot().windows.a, undefined);
  app.openWindow("a");
  const second = app.loadSample("a");
  await app.loadSample("a");
  await second;
  assert.equal(app.getSnapshot().windows.a, undefined);
});

test("재진입 포트 명령은 처리 시점에도 실행 권한을 검사함", () => {
  let injected: AppPorts | undefined;
  const shell = fixture([
    {
      id: "probe",
      title: "Probe",
      create: (p) => {
        injected = p;
        return {
          openWindow() {},
          closeWindow() {
            shell.send({ type: "quit", appId: "probe" });
            p.newWindow();
          },
          dispose() {},
        };
      },
    },
  ]);
  shell.send({ type: "new", appId: "probe" });
  injected?.closeWindow(activeWindow(shell).id);
  assert.equal(shell.getSnapshot().windows.length, 0);
  assert.deepEqual(shell.getSnapshot().running, []);
});

test("여러 앱·창의 반복 조합에서 포커스·실행 소유권·작업 영역 불변식을 유지함", () => {
  const shell = fixture();
  let seed = 42;
  for (let i = 0; i < 500; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const list = shell.getSnapshot().windows;
    const w = list[seed % Math.max(1, list.length)];
    const appId = seed % 2 ? "notes" : "shapes";
    switch (seed % 8) {
      case 0:
        shell.send({ type: "new", appId });
        break;
      case 1:
        shell.send({ type: "dock", appId });
        break;
      case 2:
        if (w) shell.send({ type: "minimize", id: w.id });
        break;
      case 3:
        if (w) shell.send({ type: "restore", id: w.id });
        break;
      case 4:
        if (w) shell.send({ type: "close", id: w.id });
        break;
      case 5:
        shell.send({ type: "quit", appId });
        break;
      case 6:
        if (w) {
          shell.send({ type: "begin", id: w.id, mode: "moving", token: i });
          shell.send({
            type: "update",
            token: i,
            dx: seed % 2000,
            dy: seed % 1000,
          });
          shell.send({ type: "finish", token: i });
        }
        break;
      case 7:
        if (w) shell.send({ type: "focus", id: w.id });
        break;
    }
    const state = shell.getSnapshot();
    assert.ok(
      state.activeId === null ||
        state.windows.some((v) => v.id === state.activeId && !v.minimized),
    );
    for (const window of state.windows) {
      assert.ok(shell.getApp(window.runId));
      assert.ok(
        state.running.some(
          (run) => run.runId === window.runId && run.appId === window.appId,
        ),
      );
      const rect = shell.getRect(window.id);
      assert.ok(rect);
      assert.ok(
        rect.x >= 0 &&
          rect.y >= 0 &&
          rect.x + rect.width <= 1440 &&
          rect.y + rect.height <= 772,
      );
    }
  }
});
