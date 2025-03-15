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
};
