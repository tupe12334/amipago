import { test, expect } from "./utils/baseTest";

test.describe("Homepage", () => {
  test("should have the correct title", async ({ page, verifySnapshot }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Amipago/);

    // Verify the UI snapshot
    await verifySnapshot("homepage");
  });
});
