import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";

test("user removes one product from the cart before checkout", { tag: "@regression" }, async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await page.goto("/inventory.html");
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await productsPage.openCart();

  const productNames = page.locator('[data-test="inventory-item-name"]');

  await expect(page).toHaveURL(/cart/);
  await expect(productNames).toHaveText([
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
  ]);

  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  await expect(productNames.filter({ hasText: "Sauce Labs Bike Light" })).toHaveCount(0);
  await expect(productNames).toHaveText(["Sauce Labs Backpack"]);
});
