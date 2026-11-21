import { test as base, expect } from "@playwright/test";
import { createPost } from "../factories/post.factory";

type TestPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Fixtures = {
  testPost: TestPost;
};

export const test = base.extend<Fixtures>({
  testPost: async ({ request }, use) => {
    const response = await request.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        data: createPost(),
      },
    );

    expect(response.status()).toBe(201);

    const post = await response.json();

    try {
      await use(post);
    } finally {
      const deleteResponse = await request.delete(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      );
      expect(deleteResponse.status()).toBe(200);
    }
  },
});
