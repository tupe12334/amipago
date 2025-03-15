import { expect, Page } from "@playwright/test";

export const navigateToCreateGroupPage = async (page: Page) => {
  await page.goto("/");
  await page.click("#floating-action-button-button");
  await page.click("#floating-action-button-option-0");
  await page.waitForLoadState("networkidle");
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
    "create-group-form-empty.png"
  );
};

export const createGroup = async (page: Page, name: string, type: string) => {
  await navigateToCreateGroupPage(page);
  await expect(page.locator("form")).toBeVisible();
  await expect(page.locator("h1")).toHaveText(new RegExp("צור קבוצה חדשה"));
  await page.locator('input[name="name"]').fill(`קבוצת בדיקה - ${type}`);
  await page.locator('input[name="description"]').fill(`תיאור - ${type}`);
  await page.locator(`button[role="radio"]:has-text("${type}")`).click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
    `create-group-form-${type.toLowerCase()}-filled.png`
  );
  await page.click('button[type="submit"]');
  await expect(page.locator('[aria-live="polite"]')).toHaveText(
    "הקבוצה נוצרה בהצלחה!"
  );
};
