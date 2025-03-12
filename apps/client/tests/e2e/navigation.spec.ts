import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate through main sections", async ({ page }) => {
    await page.goto("/");

    // Check if we're on homepage
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Navigate to about page
    await page.getByRole("link", { name: /about/i }).click();
    await expect(page).toHaveURL(/.*about/);

    // Navigate to features page
    await page.getByRole("link", { name: /features/i }).click();
    await expect(page).toHaveURL(/.*features/);

    // Navigate back to home
    await page.getByRole("link", { name: /home/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
