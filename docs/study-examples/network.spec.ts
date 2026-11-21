import { test, expect } from "@playwright/test";

test("intercepts a request and lets it continue", { tag: "@smoke" }, async ({ page }) => {
  await page.route("**/posts/1", async (route) => {
    console.log("Intercepted request:", route.request().url());

    await route.continue();
  });

  await page.goto("https://jsonplaceholder.typicode.com");

  const response = await page.evaluate(async () => {
    const result = await fetch("/posts/1");
    return result.json();
  });

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

test("mocks the API response", async ({ page }) => {
  await page.route("**/posts/1", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 1,
        title: "Mocked response",
      }),
    });
  });

  await page.goto("https://jsonplaceholder.typicode.com");

  const response = await page.evaluate(async () => {
    const result = await fetch("/posts/1");
    return result.json();
  });

  expect(response.title).toBe("Mocked response");
});

test("simulates an API 500 error", async ({ page }) => {
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

test("simulates an empty list", async ({ page }) => {
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

test("investigates a locator failure", async ({ page }) => {
  await page.goto("https://playwright.dev");

  const button = page.getByRole("link", {
    name: "Get started",
  });

  await button.click();
});


test("generates evidence for investigation", async ({ page }) => {
  await page.goto("https://playwright.dev");

  console.log("Current URL:", page.url());

  const heading = page.getByRole("heading", {
    name: "Title that does not exist",
  });

  console.log("Headings found:", await heading.count());

  await expect(heading).toBeVisible();
});
