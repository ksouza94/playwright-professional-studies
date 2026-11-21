import { test, expect } from "@playwright/test";
import { ProductsPage } from "../pages/ProductsPage";

test("user adds a product to the cart", { tag: "@regression" }, async ({ page }) => {
  await page.goto("/inventory.html");

  const productsPage = new ProductsPage(page);
  await productsPage.openProduct("item-4-title-link");
  await productsPage.addToCart();
  await productsPage.openCart();

  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
});
