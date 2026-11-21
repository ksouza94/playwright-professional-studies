import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("browser receives a post with a mocked response", { tag: "@network" }, async ({ page }) => {
  const mockedPost = {
    id: 1,
    title: "Post controlled by the test",
    body: "Response prepared with network mocking",
    userId: 1,
  };

  await page.route("https://jsonplaceholder.typicode.com/posts/1", async (route) => {
    await route.fulfill({
      status: 200,
      json: mockedPost,
    });
  });

  await page.goto("https://jsonplaceholder.typicode.com");

  const result = await page.evaluate(async () => {
    const response = await fetch("/posts/1");
    return { status: response.status, post: await response.json() };
  });

  expect(result.status).toBe(200);
  expect(result.post).toEqual(mockedPost);
});
