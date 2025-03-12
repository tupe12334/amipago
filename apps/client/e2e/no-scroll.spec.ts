import { test, expect } from "@playwright/test";

test.describe("No Scroll Tests", () => {
  const devices = [
    { name: "iPhone 12", width: 390, height: 844 },
    { name: "Samsung Galaxy S20", width: 360, height: 800 },
    { name: "iPhone SE", width: 375, height: 667 },
  ];

  for (const device of devices) {
    test(`Page should not be scrollable on ${device.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: device.width,
        height: device.height,
      });
      await page.goto("/");
      await page.waitForSelector('[data-testid="group-list-container"]', {
        timeout: 5000,
      });

      const initialPosition = await page.evaluate(() => ({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      }));
      await page.evaluate(() => window.scrollBy(0, 100));
      const positionAfterScroll = await page.evaluate(() => ({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      }));
      expect(positionAfterScroll.scrollY).toBe(initialPosition.scrollY);
      expect(positionAfterScroll.scrollX).toBe(initialPosition.scrollX);

      await page.mouse.move(device.width / 2, device.height / 2);
      await page.mouse.down();
      await page.mouse.move(device.width / 2, device.height / 2 - 200);
      await page.mouse.up();

      const positionAfterSwipe = await page.evaluate(() => ({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      }));
      expect(positionAfterSwipe.scrollY).toBe(initialPosition.scrollY);
      expect(positionAfterSwipe.scrollX).toBe(initialPosition.scrollX);
    });
  }

  test("Content should be scrollable within the container while page remains fixed", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForSelector('[data-testid="group-list-container"]');

    const initialPagePosition = await page.evaluate(() => ({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    }));
    await page.evaluate(() => {
      const container = document.querySelector(
        '[data-testid="group-list-container"]'
      );
      if (container) container.scrollTop = 100;
    });

    const containerScrolled = await page.evaluate(() => {
      const container = document.querySelector(
        '[data-testid="group-list-container"]'
      );
      return container ? container.scrollTop > 0 : false;
    });
    const pagePositionAfter = await page.evaluate(() => ({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    }));

    expect(containerScrolled).toBeTruthy();
    expect(pagePositionAfter).toEqual(initialPagePosition);
  });
});
