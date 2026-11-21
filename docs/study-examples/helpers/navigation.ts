import { Page } from "@playwright/test";

export async function openMCPDocumentation(page: Page): Promise<void> {
  const getMCPLink = page.getByRole("link", {
    name: "MCP",
    exact: true,
  });

  await getMCPLink.click();


}
