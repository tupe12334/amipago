import { test, expect } from "@playwright/test";
import { onBoard } from "./utils/onBoard";

test.describe("Group Not Found", () => {
  test("should display error when navigating to a non-existent group", async ({
    page,
  }) => {
    await onBoard(page);
    // Start from the root path
    await page.goto("/");

    // Wait for the page to be fully loaded
    await page.waitForSelector("#floating-action-button-button");
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("load");

    // Take a snapshot of the homepage
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

    // Navigate to a non-existent group ID
    // We use direct navigation here instead of UI interaction because we're testing the error state directly
    await page.evaluate(() => {
      window.location.href = "/group/non-existent-id-12345";
    });

    // Wait for the error message to appear
    await page.waitForSelector("#group-error-alert", { timeout: 5000 });

    // Verify error message contains the non-existent ID using regex
    const errorText = await page.locator("#group-error-alert").textContent();
    expect(errorText).toMatch(new RegExp("non-existent-id-12345"));

    // Take a snapshot of the error page
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

    // Test the back to groups button
    await page.click("#back-to-groups-button");

    // Verify we're back at the homepage using regex for text
    await page.locator("h1", { hasText: new RegExp("הקבוצות שלי") }).waitFor();

    // Take a snapshot after returning to the homepage
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
  });

  test("should have working TopBar BackButton", async ({ page }) => {
    await onBoard(page);

    // Navigate directly to a non-existent group ID
    await page.evaluate(() => {
      window.location.href = "/group/another-non-existent-id";
    });

    // Wait for the error page to load
    await page.waitForSelector("#error-heading");

    // Verify the TopBar BackButton exists
    await expect(page.locator("button#error-back-button")).toBeVisible();

    // Take a snapshot before clicking the back button
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

    // Click the BackButton
    await page.click("button#error-back-button");

    // Verify we're back at the homepage using regex text matching
    await page.locator("h1", { hasText: new RegExp("הקבוצות שלי") }).waitFor();

    // Take a final snapshot
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
  });
});
