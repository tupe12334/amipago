import { expect, test } from "@playwright/test";
import { onBoard } from "./utils/onBoard";

test.describe("Homepage", () => {
  test("should have the correct title", async ({ page }) => {
    await onBoard(page);
    await expect(page).toHaveTitle(/Amipago/);

    // Wait for the page to be fully loaded and network to be idle
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("load");

    // Take screenshot with animations disabled
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
  });
});
