import { expect, test } from "@playwright/test";
import {
  createGroup,
  navigateToCreateGroupPage,
} from "./utils/group/createGroup";
import { onBoard } from "./utils/onBoard";

test.describe("Create New Group", () => {
  test("should validate form errors correctly", async ({ page }) => {
    await onBoard(page);
    await navigateToCreateGroupPage(page);
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-describedby="name-error"]')).toBeVisible();
    await expect(page.locator("#name-error")).toContainText(
      new RegExp("שדה זה הוא חובה")
    );
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "validation-errors-shown.png"
    );
    await page.locator("#name").fill("קבוצת בדיקה");
    await page.waitForTimeout(300);
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "validation-name-only-filled.png"
    );
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!",
      { timeout: 5000 }
    );
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "validation-success.png"
    );
  });

  test("should create a group for each group type", async ({ page }) => {
    const groupTypes = [
      { value: "GENERAL", label: "כללי" },
      { value: "FRIENDS", label: "חברים" },
      { value: "HOUSEHOLD", label: "משק בית" },
      { value: "WORK", label: "עבודה" },
    ];

    await onBoard(page);
    for (const type of groupTypes) {
      await createGroup(page, type.label);
      await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
      await page.waitForLoadState("networkidle");
    }
  });

  test("should redirect to root after 2 seconds", async ({ page }) => {
    await onBoard(page);
    await createGroup(page, "חברים");

    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    await page.waitForTimeout(2100);
    const url = new URL(page.url());
    expect(url.pathname).toBe("/");
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("load");
    await page.waitForTimeout(300);
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-redirection.png"
    );
  });
});
