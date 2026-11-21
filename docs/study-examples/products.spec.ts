import { expect, mergeTests } from "@playwright/test";
import { test as documentationTest } from "./fixtures/documentation.fixture";
import { test as postTest } from "./fixtures/post.fixture";

const test = mergeTests(documentationTest, postTest);

test.describe("Playwright documentation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev");
  });

  test("opens the MCP documentation", async ({ page, documentationPage }) => {
    await documentationPage.openMCP();

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Playwright MCP",
    });

    await expect(page).toHaveURL(/.*\/mcp\/introduction/);
    await expect(heading).toBeVisible();
  });

  test("opens the installation documentation", async ({
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

test.describe("API fixture", () => {
  test("creates a post using the API fixture", async ({ testPost }) => {
    expect(testPost.title).toBe("Post created by the fixture");
    expect(testPost.body).toBe("Test precondition");
    expect(testPost.userId).toBe(1);
  });
});
