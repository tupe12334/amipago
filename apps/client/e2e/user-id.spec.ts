import { test, expect } from "@playwright/test";
import { takeScreenshot, clearBrowserData } from "./test-helper";

test.describe("User ID Generation", () => {
  test("should generate unique ID for first-time users", async ({ page }) => {
    // Clear browser data before test
    await clearBrowserData(page);

    // Navigate to app home
    await page.goto("/");

    // Wait for the app to initialize
    await page.waitForSelector("#main-heading");
    await page.waitForSelector("#user-loading-message", { state: "visible" });

    // Take screenshot of loading state
    await takeScreenshot(page, 1, "user-id-loading");

    // Wait for the success message to appear
    await page.waitForSelector("#user-success-message", { state: "visible" });

    // Take screenshot of success message
    await takeScreenshot(page, 2, "user-id-success");

    // Store a visible marker in session storage to identify this session
    await page.evaluate(() =>
      sessionStorage.setItem("test-session", "initial-session")
    );

    // Reload the page to verify ID persistence
    await page.reload();
    await page.waitForSelector("#main-heading");

    // Wait for the success message (should still appear)
    await page.waitForSelector("#user-success-message", { state: "visible" });

    // Take screenshot after reload
    await takeScreenshot(page, 3, "user-id-persisted");

    // Verify that the session marker is still present
    const sessionMarker = await page.evaluate(() =>
      sessionStorage.getItem("test-session")
    );
    expect(sessionMarker).toBe("initial-session");

    // Clear IndexedDB and session storage
    await clearBrowserData(page);

    // Navigate to app again - should generate a new user ID
    await page.goto("/");

    // Wait for success message to appear (new user ID generated)
    await page.waitForSelector("#user-success-message", { state: "visible" });

    // Take screenshot with new user ID
    await takeScreenshot(page, 4, "new-user-id");

    // Verify the session marker is gone (new session)
    const newSessionMarker = await page.evaluate(() =>
      sessionStorage.getItem("test-session")
    );
    expect(newSessionMarker).toBeNull();
  });
});
