import { test, expect } from '@playwright/test';

test('environment works', { tag: "@regression" }, async ({ page }) => {
  await page.setContent('<h1>Playwright is ready</h1>');
  await expect(page.getByRole('heading')).toHaveText('Playwright is ready');
});
