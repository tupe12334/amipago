import { expect, test } from "@playwright/test";
import { createGroup } from "./utils/group/createGroup";

test.describe("Create New Group", () => {
  test("should create a new group successfully", async ({ page }) => {
    await createGroup(page, "קבוצת בדיקה");   
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");
    await page.locator('button[role="radio"]:has-text("חברים")').click();
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-form-filled.png"
    );
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      new RegExp("הקבוצה נוצרה בהצלחה!")
    );
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-success.png"
    );
  });

  test("should validate form errors correctly", async ({ page }) => {
    await createGroup(page, "קבוצת בדיקה");
    await expect(page.locator("form")).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "validation-empty-form.png"
    );
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

    for (const type of groupTypes) {
      await createGroup(page, "קבוצת בדיקה");
      await page
        .locator('input[name="name"]')
        .fill(`קבוצת בדיקה - ${type.label}`);
      await page
        .locator('input[name="description"]')
        .fill(`תיאור - ${type.label}`);
      await page
        .locator(`button[role="radio"]:has-text("${type.label}")`)
        .click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);
      expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
        `create-group-form-${type.value.toLowerCase()}-filled.png`
      );
      await page.click('button[type="submit"]');
      await expect(page.locator('[aria-live="polite"]')).toHaveText(
        "הקבוצה נוצרה בהצלחה!"
      );
      await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
      await page.waitForLoadState("networkidle");
    }
  });

  test("should redirect to root after 2 seconds", async ({ page }) => {
    await createGroup(page, "קבוצת בדיקה");
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");
    await page.locator('button[role="radio"]:has-text("חברים")').click();
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!"
    );
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    await page.waitForTimeout(2100);
    const url = new URL(page.url());
    expect(url.pathname).toBe("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-redirection.png"
    );
  });
});
