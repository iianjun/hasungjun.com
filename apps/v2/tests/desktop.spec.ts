import { test, expect } from "@playwright/test";

test("다중 창·앱·기본값·최소화·종료 흐름", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Open Notes", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Note text", exact: true })
    .fill("first window");
  await page
    .getByRole("textbox", { name: "Default note text" })
    .fill("new default");
  await page.getByRole("button", { name: "New Notes window" }).click();
  const first = page.getByRole("region", { name: "Notes 2", exact: true });
  const second = page.getByRole("region", { name: "Notes 3", exact: true });
  await expect(
    second.getByRole("textbox", { name: "Note text", exact: true }),
  ).toHaveValue("new default");
  await expect(
    first.getByRole("textbox", { name: "Note text", exact: true }),
  ).toHaveValue("first window");
  await page.getByRole("button", { name: "Open Notes", exact: true }).click();
  await expect(page.getByRole("region")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Minimize Notes 3", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Restore Notes 3", exact: true })
    .click();
  await expect(
    second.getByRole("textbox", { name: "Note text", exact: true }),
  ).toHaveValue("new default");
  await page.getByRole("button", { name: "Open Shapes", exact: true }).click();
  await page.getByRole("button", { name: "＋ Square", exact: true }).click();
  await expect(page.getByRole("img", { name: /square/ })).toHaveCount(1);
  await page.getByRole("button", { name: "Open Notes", exact: true }).click();
  await page.locator('[data-menu="app"]').click();
  await page.getByRole("menuitem", { name: "Quit Notes", exact: true }).click();
  await expect(page.locator('[data-content="notes"]')).toHaveCount(0);
  await expect(page.getByRole("img", { name: /square/ })).toHaveCount(1);
  await page.getByRole("button", { name: "Open Notes", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Default note text" }),
  ).toHaveValue("");
  await page.getByRole("button", { name: /^Close Notes/ }).click();
  await expect(
    page.getByRole("button", { name: "Open Notes", exact: true }),
  ).toHaveAttribute("data-running", "true");
  await expect(page.getByRole("region", { name: /^Shapes/ })).toBeFocused();
  expect(errors).toEqual([]);
});

test("키보드 전용 명령·확정·취소·viewport 보존", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open Notes", exact: true }).focus();
  await page.keyboard.press("Enter");
  const frame = page.getByRole("region", { name: "Notes 2", exact: true });
  const origin = await frame.boundingBox();
  expect(origin).toBeTruthy();
  await page.locator('[data-menu="window"]').focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Shift+ArrowDown");
  let moved = await frame.boundingBox();
  expect(moved?.x).toBe((origin?.x ?? 0) + 10);
  expect(moved?.y).toBe((origin?.y ?? 0) + 1);
  await page.keyboard.press("Escape");
  expect(await frame.boundingBox()).toEqual(origin);
  await page.locator('[data-menu="window"]').click();
  await page.getByRole("menuitem", { name: "Resize with Keyboard" }).click();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Shift+ArrowDown");
  await page.keyboard.press("Enter");
  moved = await frame.boundingBox();
  expect(moved?.width).toBe((origin?.width ?? 0) + 10);
  expect(moved?.height).toBe((origin?.height ?? 0) + 1);
  await frame
    .getByRole("textbox", { name: "Note text", exact: true })
    .fill("preserve across environments");
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(page.getByText("A little more room.")).toBeVisible();
  await page.setViewportSize({ width: 1512, height: 945 });
  await expect(
    frame.getByRole("textbox", { name: "Note text", exact: true }),
  ).toHaveValue("preserve across environments");
  expect(await frame.boundingBox()).toEqual(moved);
});

test("포인터 최종값·취소·경계와 이동 중 앱 렌더 분리", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open Notes", exact: true }).click();
  const frame = page.getByRole("region", { name: "Notes 2", exact: true });
  const start = await frame.boundingBox();
  if (!start) throw new Error("No window");
  await page.mouse.move(start.x + 260, start.y + 22);
  await page.mouse.down();
  await page.mouse.move(start.x + 360, start.y + 72, { steps: 8 });
  await page.mouse.up();
  const moved = await frame.boundingBox();
  expect(moved?.x).toBe(start.x + 100);
  expect(moved?.y).toBe(start.y + 50);
  if (!moved) throw new Error("No moved window");
  await page.mouse.move(moved.x + 260, moved.y + 22);
  await page.mouse.down();
  await page.mouse.move(1482, 915);
  await page.keyboard.press("Escape");
  await page.mouse.up();
  expect(await frame.boundingBox()).toEqual(moved);
  const resize = await frame
    .getByRole("button", { name: "Resize Notes 2" })
    .boundingBox();
  if (!resize) throw new Error("No resize handle");
  await page.mouse.move(resize.x + 10, resize.y + 10);
  await page.mouse.down();
  await page.mouse.move(resize.x + 80, resize.y + 50);
  await page.mouse.up();
  const enlarged = await frame.boundingBox();
  expect(enlarged?.width).toBe(moved.width + 70);
  expect(enlarged?.height).toBe(moved.height + 40);
  await page.mouse.move(moved.x + 260, moved.y + 22);
  await page.mouse.down();
  await page.mouse.move(1512, 945);
  await page.mouse.up();
  const edge = await frame.boundingBox();
  expect((edge?.x ?? 0) + (edge?.width ?? 0)).toBeLessThanOrEqual(1512);
  expect((edge?.y ?? 0) + (edge?.height ?? 0)).toBeLessThanOrEqual(857);
  // Browser frame cadence and app DOM writes during real pointer input.
  const measurement = page.evaluate(
    () =>
      new Promise<{
        appMutations: number;
        frameIntervalsMs: number[];
        userAgent: string;
        dpr: number;
      }>((resolve) => {
        const content = document.querySelector('[data-content="notes"]');
        if (!(content instanceof HTMLElement)) throw Error("Missing fixture");
        let mutations = 0;
        let frame = 0;
        let previous = 0;
        const times: number[] = [];
        const observer = new MutationObserver((records) => {
          mutations += records.length;
        });
        const tick = (now: number) => {
          if (previous) times.push(now - previous);
          previous = now;
          frame = requestAnimationFrame(tick);
        };
        document.addEventListener(
          "pointerdown",
          () => {
            requestAnimationFrame(() =>
              observer.observe(content, {
                subtree: true,
                attributes: true,
                childList: true,
                characterData: true,
              }),
            );
            frame = requestAnimationFrame(tick);
          },
          { once: true },
        );
        document.addEventListener(
          "pointerup",
          () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            resolve({
              appMutations: mutations,
              frameIntervalsMs: times,
              userAgent: navigator.userAgent,
              dpr: devicePixelRatio,
            });
          },
          { once: true, capture: true },
        );
      }),
  );
  await page.mouse.move((edge?.x ?? 0) + 250, (edge?.y ?? 0) + 22);
  await page.mouse.down();
  for (let step = 1; step <= 30; step++) {
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
    );
    const fraction = step / 30;
    const x = (edge?.x ?? 0) + 250;
    const y = (edge?.y ?? 0) + 22;
    await page.mouse.move(x + (270 - x) * fraction, y + (150 - y) * fraction);
  }
  await page.mouse.up();
  const result = await measurement;
  expect(result.frameIntervalsMs.length).toBeGreaterThanOrEqual(20);
  expect(result.appMutations).toBe(0);
  await testInfo.attach("frame-observation", {
    body: JSON.stringify(result, null, 2),
    contentType: "application/json",
  });
});

test("고정 비교 화면과 reduced-motion 결과를 보관함", async ({
  page,
  browser,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.screenshot({ path: testInfo.outputPath("01-desktop.png") });
  await page.getByRole("button", { name: "Open Notes", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Note text", exact: true })
    .fill("A little room to think.\n\nThese windows belong to this visit.");
  await page.getByRole("button", { name: "Open Shapes", exact: true }).click();
  const shape = page.getByRole("region", { name: /^Shapes/ });
  const pos = await shape.boundingBox();
  if (!pos) throw Error("No Shapes");
  await page.mouse.move(pos.x + 250, pos.y + 23);
  await page.mouse.down();
  await page.mouse.move(pos.x + 780, pos.y + 240);
  await page.mouse.up();
  await page.screenshot({ path: testInfo.outputPath("02-two-windows.png") });
  await page.getByRole("button", { name: /^Minimize Shapes/ }).click();
  await page.screenshot({ path: testInfo.outputPath("03-minimized.png") });
  await page.getByRole("button", { name: /^Restore Shapes/ }).click();
  await page.screenshot({ path: testInfo.outputPath("04-restored.png") });
  expect(
    await page
      .locator(".app-icon")
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
  await testInfo.attach("fixture", {
    body: JSON.stringify(
      {
        browser: browser.version(),
        viewport: page.viewportSize(),
        dpr: await page.evaluate(() => devicePixelRatio),
        zoom: "100%",
        theme: "light",
        reducedMotion: true,
        windows: await page
          .locator("[data-window-id]")
          .evaluateAll((elements) =>
            elements.map((el) => ({
              id: el.id,
              active: el.getAttribute("data-active"),
              rect: el.getBoundingClientRect().toJSON(),
            })),
          ),
      },
      null,
      2,
    ),
    contentType: "application/json",
  });
  // The desktop has no theme switch; Contrast is not captured here.
  await page.locator('[data-menu="window"]').focus();
  await page.keyboard.press("ArrowDown");
  await page.screenshot({ path: testInfo.outputPath("05-menu-focus.png") });
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(page.getByText("A little more room.")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("06-small-screen.png") });
});

test("pointercancel·capture 상실·blur·Tab·환경 전환이 입력을 취소함", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open Notes", exact: true }).click();
  const frame = page.getByRole("region", { name: "Notes 2", exact: true });
  const origin = await frame.boundingBox();
  if (!origin) throw Error("No window");
  for (const kind of [
    "pointercancel",
    "lostpointercapture",
    "blur",
    "Tab",
    "environment",
  ]) {
    await page.mouse.move(origin.x + 250, origin.y + 22);
    await page.mouse.down();
    await page.mouse.move(origin.x + 350, origin.y + 72);
    if (kind === "blur")
      await page.evaluate(() => window.dispatchEvent(new Event("blur")));
    else if (kind === "Tab") await page.keyboard.press("Tab");
    else if (kind === "environment") {
      await page.setViewportSize({ width: 800, height: 600 });
      await expect(page.getByText("A little more room.")).toBeVisible();
      await page.setViewportSize({ width: 1512, height: 945 });
    } else
      await frame.locator("[data-drag]").dispatchEvent(kind, { pointerId: 1 });
    await page.mouse.up();
    expect(await frame.boundingBox(), kind).toEqual(origin);
    await expect(
      page.getByRole("status").filter({ hasText: "Arrow keys" }),
    ).toHaveCount(0);
  }
});

test("정밀 포인터가 없는 작은 화면은 모바일 안내를 표시함", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173");
  await expect(page.getByText("A smaller screen.")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Dock" })).toHaveCount(0);
  await context.close();
});

test("React adapter는 선택 구독·인스턴스 교체·StrictMode 재연결을 보존함", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const path = "/tests/react-adapters.fixture.tsx";
    const { verifyAdapters } = await import(/* @vite-ignore */ path);
    return verifyAdapters();
  });
  expect(result).toEqual({
    connected: true,
    selective: true,
    shared: true,
    detached: true,
    survived: true,
    reconnected: true,
    retargeted: true,
    replaced: true,
    oldInstanceIgnored: true,
    receiver: true,
    cleaned: true,
  });
  expect(errors).toEqual([]);
});

test("셸 명령 뒤 키보드 포커스가 활성 창으로 가고 창이 없으면 Dock으로 감", async ({
  page,
}) => {
  await page.goto("/");
  const dock = page.getByRole("button", { name: "Open Notes", exact: true });
  const frame = page.getByRole("region", { name: "Notes 2", exact: true });
  await dock.click();
  await expect(frame).toBeFocused();
  // The active window does not change here; the command alone returns focus.
  await dock.focus();
  await page.keyboard.press("Enter");
  await expect(frame).toBeFocused();
  await page.locator('[data-menu="window"]').click();
  await page.getByRole("menuitemcheckbox", { name: "Notes 2", exact: true }).click();
  await expect(frame).toBeFocused();
  await page.locator('[data-menu="window"]').click();
  await page.getByRole("menuitem", { name: "Close Window" }).click();
  await expect(dock).toBeFocused();
});

test("메뉴 항목에 hover했다가 나가도 글자 열이 그대로임", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Window", exact: true }).click();
  const items = page.getByRole("menu").getByRole("menuitem");
  const labelStarts = () =>
    items.evaluateAll((rows) =>
      rows.map((row) => row.querySelector("span")?.getBoundingClientRect().left),
    );
  const before = await labelStarts();
  for (const item of await items.all()) await item.hover();
  await page.mouse.move(1300, 700);
  expect(await labelStarts()).toEqual(before);
});
