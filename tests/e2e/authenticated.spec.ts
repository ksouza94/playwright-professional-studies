import { test, expect } from "@playwright/test";

test("accesses the authenticated area without logging in again", { tag: "@regression" }, async ({ page }) => {
  await page.goto("/inventory.html");

  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText("Products")).toBeVisible();
});
