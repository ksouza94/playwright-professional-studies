import { test, expect } from "@playwright/test";

test("retrieves a user through the API", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data.id).toBe(2);
});


test("creates a post through the API", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "Playwright API",
        body: "Post creation through the API",
        userId: 1,
      },
    },
  );

  expect(response.status()).toBe(201);

  const body = await response.json();

  // Validate body.title
  expect(body.title).toBe("Playwright API");
  // Validate body.userId
  expect(body.userId).toBe(1);
});
