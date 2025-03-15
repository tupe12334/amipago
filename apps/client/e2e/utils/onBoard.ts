import { expect, Page } from "@playwright/test";

/**
 * Completes the onboarding flow by entering a username
 * @param page - Playwright page object
 * @param username - Optional username to enter (defaults to "משתמש בדיקות")
 * @returns Promise that resolves when onboarding is complete
 */
export const onBoard = async (
  page: Page,
  username = "משתמש בדיקות"
): Promise<void> => {
  // Navigate to the root path
  await page.goto("/");

  // Wait for onboarding page to appear
  await expect(page.locator("#onboarding-container")).toBeVisible();

  // Take a snapshot of the initial onboarding screen
  await page.waitForLoadState("networkidle");
  await page.screenshot({ animations: "disabled" });

  // Fill in the username field
  await page.locator("#user-name-input").fill(username);

  // Take a snapshot after filling the username
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

  // Submit the form
  await page.locator("#onboarding-submit").click();

  // Wait for the onboarding process to complete
  await page.waitForTimeout(1000); // Give time for form submission and redirect

  // Verify onboarding is complete (onboarding container is gone)
  await expect(page.locator("#onboarding-container")).not.toBeVisible({
    timeout: 5000,
  });

  // Take a final snapshot showing the main app after onboarding
  await page.waitForLoadState("networkidle");
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
};

/**
 * Checks if the onboarding page is displayed
 * @param page - Playwright page object
 * @returns Promise that resolves to true if onboarding is needed
 */
export const isOnboardingNeeded = async (page: Page): Promise<boolean> => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  try {
    // Check if onboarding elements are visible with a short timeout
    return await page.locator("#onboarding-container").isVisible();
  } catch (e) {
    return false;
  }
};

/**
 * Skips the onboarding by directly setting user data in local storage
 * Useful for tests that don't need to test the onboarding flow
 * @param page - Playwright page object
 */
export const skipOnboarding = async (page: Page): Promise<void> => {
  await page.goto("/");

  // Set user data directly in localStorage to bypass onboarding
  await page.evaluate(() => {
    const mockUser = {
      id: "test-user-id",
      name: "משתמש בדיקות",
      language: "he",
      theme: "light",
    };
    localStorage.setItem("userData", JSON.stringify(mockUser));
  });

  // Reload the page to apply the changes
  await page.reload();

  // Verify onboarding is skipped
  await expect(page.locator("#onboarding-container")).not.toBeVisible({
    timeout: 5000,
  });
};
