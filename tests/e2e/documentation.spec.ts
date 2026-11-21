import { expect } from "@playwright/test";
import { test } from "../fixtures/documentation.fixture";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Playwright documentation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev");
  });

  test("opens the MCP documentation", { tag: "@regression" }, async ({ page, documentationPage }) => {
    await documentationPage.openMCP();

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Playwright MCP",
    });

    await expect(page).toHaveURL(/.*\/mcp\/introduction/);
    await expect(heading).toBeVisible();
  });

  test("opens the installation documentation", { tag: "@regression" }, async ({
    page,
    documentationPage,
  }) => {
    await documentationPage.openInstallation();

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Installation",
    });

    await expect(page).toHaveURL(/.*intro/);
    await expect(heading).toBeVisible();
  });
});
