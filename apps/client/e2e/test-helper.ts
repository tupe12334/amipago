import { Page } from "@playwright/test";

/**
 * Takes a numbered screenshot with animations disabled
 * @param page The Playwright page object
 * @param testInfo The test information
 * @param number The screenshot number
 * @param name Optional name for the screenshot
 */
export async function takeScreenshot(
  page: Page,
  number: number,
  name?: string
): Promise<void> {
  await page.waitForLoadState("networkidle");
  const screenshotName = name
    ? `${number.toString().padStart(2, "0")}-${name}`
    : `${number.toString().padStart(2, "0")}-snapshot`;

  await page.screenshot({
    animations: "disabled",
    path: `./test-results/screenshots/${screenshotName}.png`,
  });
}

/**
 * Clears all browser data including localStorage and IndexedDB
 * @param page The Playwright page object
 */
export async function clearBrowserData(page: Page): Promise<void> {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();

    return new Promise<void>((resolve) => {
      // Delete the IndexedDB database
      const request = indexedDB.deleteDatabase("amipagoDb");
      request.onsuccess = () => resolve();
      request.onerror = () => resolve(); // Resolve anyway to continue the test
    });
  });
}

/**
 * Gets the value from localStorage
 * @param page The Playwright page object
 * @param key The localStorage key
 * @returns The value from localStorage or null
 */
export async function getLocalStorageItem(
  page: Page,
  key: string
): Promise<string | null> {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
