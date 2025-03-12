import { test, expect } from "@playwright/test";

test.describe("Responsive Design", () => {
  test("should display mobile menu on small screens", async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Mobile menu should be hidden initially
    await expect(page.getByRole("navigation").getByRole("list")).toBeHidden();

    // Click hamburger menu
    await page.getByRole("button", { name: /menu/i }).click();

    // Navigation should be visible
    await expect(page.getByRole("navigation").getByRole("list")).toBeVisible();
  });

  test("should display desktop navigation on large screens", async ({
    page,
  }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // Desktop navigation should be visible
    await expect(page.getByRole("navigation").getByRole("list")).toBeVisible();

    // Hamburger menu should not be visible
    await expect(page.getByRole("button", { name: /menu/i })).toBeHidden();
  });
});
