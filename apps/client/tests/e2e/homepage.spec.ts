import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should have the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Amipago/);
  });

  // test("should navigate to login page", async ({ page }) => {
  //   await page.goto("/");
  //   await page.getByRole("link", { name: /login/i }).click();
  //   await expect(page).toHaveURL(/.*login/);
  // });
});
