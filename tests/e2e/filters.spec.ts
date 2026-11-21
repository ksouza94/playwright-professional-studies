import { test, expect } from "@playwright/test";

test("user sorts products by name and price", { tag: "@regression" }, async ({ page }) => {
  await page.goto("/inventory.html");

  const sortFilter = page.getByRole("combobox", { name: "Sort products" });
  const productNames = page.locator('[data-test="inventory-item-name"]');
  const productPrices = page.locator('[data-test="inventory-item-price"]');

  await sortFilter.selectOption("za");
  await expect(productNames).toHaveText([
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Onesie",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Bike Light",
    "Sauce Labs Backpack",
  ]);

  await sortFilter.selectOption("az");
  await expect(productNames).toHaveText([
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
  ]);

  await sortFilter.selectOption("lohi");
  await expect(productPrices).toHaveText([
    "$7.99", "$9.99", "$15.99", "$15.99", "$29.99", "$49.99",
  ]);

  await sortFilter.selectOption("hilo");
  await expect(productPrices).toHaveText([
    "$49.99", "$29.99", "$15.99", "$15.99", "$9.99", "$7.99",
  ]);
});
