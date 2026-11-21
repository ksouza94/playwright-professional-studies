import { test, expect } from "@playwright/test";

test("retrieves a user through the API", { tag: ["@api", "@regression"] }, async ({ request }) => {
  const response = await request.get("/users/1");

  expect(response.status()).toBe(200);
  const user = await response.json();
  expect(user.id).toBe(1);
  expect(user.name).toEqual(expect.any(String));
  expect(user.email).toEqual(expect.any(String));
});
