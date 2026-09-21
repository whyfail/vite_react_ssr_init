import process from "node:process";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  outputDir: "test-results/playwright-artifacts",
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/playwright-junit.xml" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: {
    // 默认显式开启会话 Mock，保证模板 E2E 不依赖真实后端；
    // 真实后端 E2E 以 E2E_AUTH_MOCK=false 关闭 Mock，并用 E2E_AUTH_* 注入种子凭据
    command: "pnpm build && pnpm preview",
    env: {
      ENABLE_AUTH_MOCK: process.env.E2E_AUTH_MOCK ?? "true",
    },
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
