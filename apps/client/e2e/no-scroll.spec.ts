import { test, expect } from "@playwright/test";

test.describe("No Scroll Tests", () => {
  // Define different device viewports to test
  const devices = [
    { name: "iPhone 12", width: 390, height: 844 },
    { name: "Samsung Galaxy S20", width: 360, height: 800 },
    { name: "iPhone SE", width: 375, height: 667 },
  ];

  for (const device of devices) {
    test(`Page should not be scrollable on ${device.name}`, async ({
      page,
    }) => {
      // Set viewport to match device dimensions
      await page.setViewportSize({
        width: device.width,
        height: device.height,
      });

      // Navigate to the app
      await page.goto("/");

      // Wait for content to load
      await page.waitForSelector('[data-testid="group-list-container"]', {
        timeout: 5000,
      });

      // Get initial page position
      const initialPosition = await page.evaluate(() => {
        return {
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        };
      });

      // Try to scroll down
      await page.evaluate(() => {
        window.scrollBy(0, 100);
      });

      // Check if page position changed
      const positionAfterScroll = await page.evaluate(() => {
        return {
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        };
      });

      // Verify that the page didn't scroll
      expect(positionAfterScroll.scrollY).toBe(initialPosition.scrollY);
      expect(positionAfterScroll.scrollX).toBe(initialPosition.scrollX);

      // Try scroll with simulated touch/swipe action
      await page.mouse.move(device.width / 2, device.height / 2);
      await page.mouse.down();
      await page.mouse.move(device.width / 2, device.height / 2 - 200);
      await page.mouse.up();

      // Check position again after swipe
      const positionAfterSwipe = await page.evaluate(() => {
        return {
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        };
      });

      // Verify that the page didn't scroll after swipe
      expect(positionAfterSwipe.scrollY).toBe(initialPosition.scrollY);
      expect(positionAfterSwipe.scrollX).toBe(initialPosition.scrollX);
    });
  }

  test("Content should be scrollable within the container while page remains fixed", async ({
    page,
  }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to the app
    await page.goto("/");

    // Wait for the group list container to be visible
    await page.waitForSelector('[data-testid="group-list-container"]');

    // Get the initial position of the page
    const initialPagePosition = await page.evaluate(() => {
      return { scrollX: window.scrollX, scrollY: window.scrollY };
    });

    // Try to scroll within the container
    await page.evaluate(() => {
      const container = document.querySelector(
        '[data-testid="group-list-container"]'
      );
      if (container) {
        container.scrollTop = 100;
      }
    });

    // Verify that the container scrolled but the page didn't
    const containerScrolled = await page.evaluate(() => {
      const container = document.querySelector(
        '[data-testid="group-list-container"]'
      );
      return container ? container.scrollTop > 0 : false;
    });

    const pagePositionAfter = await page.evaluate(() => {
      return { scrollX: window.scrollX, scrollY: window.scrollY };
    });

    // The container should be scrollable
    expect(containerScrolled).toBeTruthy();

    // But the page itself should not have scrolled
    expect(pagePositionAfter).toEqual(initialPagePosition);
  });
});
