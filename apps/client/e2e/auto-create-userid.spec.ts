import { test, expect } from '@playwright/test';

test('1. Auto create user id in localStorage on first visit', async ({ page }) => {
  // Start from the root path
  await page.goto('/');
  // Wait for the page to settle down
  await page.waitForLoadState('networkidle');

  // Retrieve the user id from localStorage
  const userId = await page.evaluate(() => localStorage.getItem('userId'));
  expect(userId).toBeTruthy();

  // Take snapshot #1 after the user id is created
  await page.screenshot({ animations: "disabled" });
});
