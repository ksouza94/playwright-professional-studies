import { test as base } from "@playwright/test";
import { createTestUser } from "../factories/user.factory";

type TestUser = {
  email: string;
  role: string;
  active: boolean;
};

type Fixtures = {
  testUser: TestUser;
};

export const test = base.extend<Fixtures>({
  testUser: async ({}, use) => {

    const user = createTestUser();

    await use(user);
    },
});
