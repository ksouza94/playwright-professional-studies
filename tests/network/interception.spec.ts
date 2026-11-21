import { test, expect } from "@playwright/test";

test("intercepts a request and lets it continue", { tag: "@network" }, async ({ page }) => {
  let intercepted = false;
  await page.route("**/posts/1", async (route) => {
    intercepted = true;

    await route.continue();
  });

  await page.goto("https://jsonplaceholder.typicode.com");

  const response = await page.evaluate(async () => {
    const result = await fetch("/posts/1");
    return result.json();
  });

  expect(intercepted).toBe(true);
  expect(response.id).toBe(1);
});

test(
  "blocks a request to simulate a network failure",
  { tag: "@network" },
  async ({ page }) => {
    await page.route("**/posts/1", async (route) => {
      await route.abort();
    });

    await page.goto("https://jsonplaceholder.typicode.com");

    const result = await page.evaluate(async () => {
      try {
        await fetch("/posts/1");
        return "success";
      } catch {
        return "failed";
      }
    });

    expect(result).toBe("failed");
  },
);

test("simulates an API 500 error", { tag: "@network" }, async ({ page }) => {
  await page.route("**/posts/1", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    });
  });

  await page.goto("https://jsonplaceholder.typicode.com");

  const status = await page.evaluate(async () => {
    const response = await fetch("/posts/1");
    return response.status;
  });

  expect(status).toBe(500);
});

test("simulates an empty list", { tag: "@network" }, async ({ page }) => {
  await page.route("**/posts", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });

  await page.goto("https://jsonplaceholder.typicode.com");

  const response = await page.evaluate(async () => {
    const result = await fetch("/posts");
    return result.json();
  });

  expect(response).toEqual([]);
});
