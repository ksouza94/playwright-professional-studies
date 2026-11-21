import { Page } from "@playwright/test";

export class DocumentationPage {
  constructor(private page: Page) {}

  async openMCP(): Promise<void> {
    const getMCPLink = this.page.getByRole("link", {
      name: "MCP",
      exact: true,
    });

    await getMCPLink.click();
  }

  async openInstallation(): Promise<void> {
    const getStartedLink = this.page.getByRole("link", {
      name: "Get started",
    });

    await getStartedLink.click();
  }
}
