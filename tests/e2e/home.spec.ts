import { test, expect } from "@playwright/test";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test(
  "home page loads correctly",
  { tag: "@smoke" },
  async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  },
);
