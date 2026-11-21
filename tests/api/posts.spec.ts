import { expect } from "@playwright/test";
import { test } from "../fixtures/post.fixture";

test("creates a post using the API fixture", { tag: ["@api", "@regression"] }, async ({ testPost }) => {
  expect(testPost.title).toBe("Post created by the fixture");
  expect(testPost.body).toBe("Test precondition");
  expect(testPost.userId).toBe(1);
  expect(testPost.id).toEqual(expect.any(Number));
});
