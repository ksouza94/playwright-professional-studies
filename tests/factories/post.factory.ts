type PostInput = {
  title: string;
  body: string;
  userId: number;
};

export function createPost(overrides: Partial<PostInput> = {}): PostInput {
  return {
    title: "Post created by the fixture",
    body: "Test precondition",
    userId: 1,
    ...overrides,
  };
}
