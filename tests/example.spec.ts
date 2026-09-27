import { test, expect } from '@playwright/test';

test('ambiente funcional', async ({ page }) => {
  await page.setContent('<h1>Playwright pronto</h1>');
  await expect(page.getByRole('heading')).toHaveText('Playwright pronto');
});
