import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";

test("user completes a product purchase", { tag: "@smoke" }, async ({ page }) => {
  await page.goto("/inventory.html");

  const productsPage = new ProductsPage(page);
  await productsPage.openProduct("item-0-title-link");
  await productsPage.addToCart();
  await productsPage.openCart();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill("Kassiano");
  await page.locator('[data-test="lastName"]').fill("Araujo");
  await page.locator('[data-test="postalCode"]').fill("22222-222");
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Bike Light");
  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!");

  const downloadPromise = page.waitForEvent("download");
  await page.locator('[data-test="generate-pdf-order"]').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  expect(await download.failure()).toBeNull();

  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL(/inventory/);
});
