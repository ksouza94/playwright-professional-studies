import { Page } from "@playwright/test";

export class ProductsPage {
  constructor(private page: Page) {}

  async openProduct(productTestId: string): Promise<void> {
    await this.page.locator(`[data-test="${productTestId}"]`).click();
  }

  async addToCart(): Promise<void> {
    await this.page.locator('[data-test="add-to-cart"]').click();
  }

  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
