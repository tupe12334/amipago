import type { Page } from "@playwright/test";
// Helper function to set a mock user in localStorage
export async function setMockUser(page: Page): Promise<void> {
  const mockUser = {
    id: "current-user",
    userId: "mock-user-id",
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    settings: {},
  };
  await page.evaluate((user) => {
    localStorage.setItem("current-user", JSON.stringify(user));
  }, mockUser);
}
