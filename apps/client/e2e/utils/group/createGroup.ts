import { expect, Page } from "@playwright/test";

export const navigateToCreateGroupPage = async (page: Page) => {
  await page.goto("/");
  await page.click("#floating-action-button-button");
  await page.click("#floating-action-button-option-0");
  await page.waitForLoadState("networkidle");
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
};

export const createGroup = async (
  page: Page,
  type: string
): Promise<{ name: string }> => {
  await navigateToCreateGroupPage(page);

  await expect(page.locator("form")).toBeVisible();
  await expect(page.locator("h1")).toHaveText(new RegExp("צור קבוצה חדשה"));

  const testGroupName = `קבוצת בדיקה - ${type}`;
  await page.locator('input[name="name"]').fill(testGroupName);
  await page.locator('input[name="description"]').fill(`תיאור - ${type}`);

  // Select the group type using more specific selectors
  await page
    .getByRole("group", { name: "סוג קבוצה" })
    .getByRole("button", { name: type, pressed: false })
    .click();

  await page.waitForTimeout(500);
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

  await page.getByRole("button", { name: "צור קבוצה" }).click();
  await expect(page.locator('[aria-live="polite"]')).toHaveText(
    "הקבוצה נוצרה בהצלחה!"
  );

  return { name: testGroupName };
};
