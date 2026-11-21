import { expect } from "@playwright/test";
import { test } from "./fixtures/user.fixture";


test("receives a test user", async ({ testUser }) => {
  console.log(testUser);
});
