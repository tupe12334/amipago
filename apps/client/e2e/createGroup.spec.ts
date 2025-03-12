import { test, expect } from "./utils/baseTest";

test.describe("Create New Group", () => {
  test("should create a new group successfully", async ({
    page,
    verifySnapshot,
  }) => {
    await page.goto("/");
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");
    await expect(page.locator("h1")).toHaveText("צור קבוצה חדשה");
    await verifySnapshot("create-group-form-empty");
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");
    await page.locator('button[role="radio"]:has-text("חברים")').click();
    await verifySnapshot("create-group-form-filled");
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!"
    );
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    await verifySnapshot("create-group-success");
  });

  test("should validate form errors correctly", async ({
    page,
    verifySnapshot,
  }) => {
    await page.goto("/");
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");
    await expect(page.locator("form")).toBeVisible();
    await verifySnapshot("validation-empty-form");
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-describedby="name-error"]')).toBeVisible();
    await expect(page.locator("#name-error")).toContainText("שדה זה הוא חובה");
    await verifySnapshot("validation-errors-shown");
    await page.locator("#name").fill("קבוצת בדיקה");
    await verifySnapshot("validation-name-only-filled");
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!",
      { timeout: 5000 }
    );
    await verifySnapshot("validation-success");
  });

  test("should create a group for each group type", async ({
    page,
    verifySnapshot,
  }) => {
    const groupTypes = [
      { value: "GENERAL", label: "כללי" },
      { value: "FRIENDS", label: "חברים" },
      { value: "HOUSEHOLD", label: "משק בית" },
      { value: "WORK", label: "עבודה" },
    ];

    for (const type of groupTypes) {
      await page.goto("/");
      await page.click("#floating-action-button-button");
      await page.click("#floating-action-button-option-0");
      await expect(page.locator("h1")).toHaveText("צור קבוצה חדשה");
      await page
        .locator('input[name="name"]')
        .fill(`קבוצת בדיקה - ${type.label}`);
      await page
        .locator('input[name="description"]')
        .fill(`תיאור - ${type.label}`);
      await page
        .locator(`button[role="radio"]:has-text("${type.label}")`)
        .click();
      await verifySnapshot(
        `create-group-form-${type.value.toLowerCase()}-filled`
      );
      await page.click('button[type="submit"]');
      await expect(page.locator('[aria-live="polite"]')).toHaveText(
        "הקבוצה נוצרה בהצלחה!"
      );
      await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    }
  });
});
