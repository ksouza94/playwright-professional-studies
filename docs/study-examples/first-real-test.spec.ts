import { test, expect } from "@playwright/test";

test("user can open the documentation", async ({ page }) => {
  await page.goto("https://playwright.dev");

  const getStartedLink = page.getByRole("link", {
    name: "Get started",
  });

  await getStartedLink.click();

    await expect(page).toHaveURL(/.*intro/);
  const heading = page.getByRole("heading", {
    level: 1,
    name: "Installation",
  });

  await expect(heading).toBeVisible();
});
