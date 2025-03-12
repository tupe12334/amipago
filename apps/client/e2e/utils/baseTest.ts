import { test as base, expect } from "@playwright/test";

/**
 * Extended test fixture with snapshot verification utilities
 */
type SnapshotFixtures = {
  verifySnapshot: (name: string) => Promise<void>;
};

export const test = base.extend<SnapshotFixtures>({
  // Add a method to verify UI snapshots
  verifySnapshot: async ({ page }, use) => {
    // Helper method to capture and compare snapshots during tests
    const snapshotVerifier = async (name: string) => {
      // Make sure to wait for animations to complete
      await page.waitForTimeout(500);

      // Compare the current state with the saved snapshot
      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        animations: "disabled",
      });
    };

    await use(snapshotVerifier);
  },
});

// Re-export expect for convenience
export { expect } from "@playwright/test";
