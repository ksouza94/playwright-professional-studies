import { test as base } from "@playwright/test";
import { DocumentationPage } from "../pages/DocumentationPage";

type Fixtures = {
  documentationPage: DocumentationPage;
};

export const test = base.extend<Fixtures>({
  documentationPage: async ({ page }, use) => {
    const documentationPage = new DocumentationPage(page);

    await use(documentationPage);
  },
});
