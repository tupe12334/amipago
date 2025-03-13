import { test, expect } from "./utils/baseTest";

test.describe("Homepage", () => {
  test("should have the correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Amipago/);
    expect(await page.screenshot()).toMatchSnapshot(
      "homepage-title-verification.png"
    );
  });
});
