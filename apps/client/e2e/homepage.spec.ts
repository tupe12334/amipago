import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should have the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Amipago/);

    // Wait for the page to be fully loaded and network to be idle
    await page.waitForLoadState("networkidle");

    // Take screenshot with animations disabled
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "homepage-title-verification.png"
    );
  });
});
