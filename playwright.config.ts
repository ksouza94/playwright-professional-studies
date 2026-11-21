import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "https://www.saucedemo.com";
const storageState = "playwright/.auth/user.json";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 4,
  globalTimeout: process.env.CI ? 15 * 60 * 1000 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium",
      testMatch: "e2e/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], storageState },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      testMatch: "e2e/**/*.spec.ts",
      use: { ...devices["Desktop Firefox"], storageState },
      dependencies: ["setup"],
    },
    {
      name: "webkit",
      testMatch: "e2e/**/*.spec.ts",
      use: { ...devices["Desktop Safari"], storageState },
      dependencies: ["setup"],
    },
    {
      name: "api",
      testMatch: "api/**/*.spec.ts",
      use: { baseURL: "https://jsonplaceholder.typicode.com" },
    },
    {
      name: "network",
      testMatch: "network/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://jsonplaceholder.typicode.com",
      },
    },
  ],
});
