import { defineConfig } from "@playwright/test";
// Viewport, DPR, locale and the Chrome channel are the reference conditions for
// comparing with real macOS (1512×945 pt at 2×).
export default defineConfig({
  testDir: "./tests",
  testMatch: "desktop.spec.ts",
  fullyParallel: false,
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],
  use: {
    baseURL: "http://127.0.0.1:5173",
    viewport: { width: 1512, height: 945 },
    deviceScaleFactor: 2,
    locale: "en-US",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chrome", use: { browserName: "chromium", channel: "chrome" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  webServer: {
    command: "pnpm exec vite --host 127.0.0.1",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
  },
});
