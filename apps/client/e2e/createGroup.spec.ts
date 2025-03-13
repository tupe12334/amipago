import { expect, test } from "@playwright/test";

test.describe("Create New Group", () => {
  test("should create a new group successfully", async ({ page }) => {
    await page.goto("/");
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");
    await expect(page.locator("h1")).toHaveText("צור קבוצה חדשה");
    expect(await page.screenshot()).toMatchSnapshot(
      "create-group-form-empty.png"
    );
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");
    await page.locator('button[role="radio"]:has-text("חברים")').click();
    expect(await page.screenshot()).toMatchSnapshot(
      "create-group-form-filled.png"
    );
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!"
    );
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    expect(await page.screenshot()).toMatchSnapshot("create-group-success.png");
  });

  test("should validate form errors correctly", async ({ page }) => {
    await page.goto("/");
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");
    await expect(page.locator("form")).toBeVisible();
    expect(await page.screenshot()).toMatchSnapshot(
      "validation-empty-form.png"
    );
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-describedby="name-error"]')).toBeVisible();
    await expect(page.locator("#name-error")).toContainText("שדה זה הוא חובה");
    expect(await page.screenshot()).toMatchSnapshot(
      "validation-errors-shown.png"
    );
    await page.locator("#name").fill("קבוצת בדיקה");
    expect(await page.screenshot()).toMatchSnapshot(
      "validation-name-only-filled.png"
    );
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!",
      { timeout: 5000 }
    );
    expect(await page.screenshot()).toMatchSnapshot("validation-success.png");
  });

  test("should create a group for each group type", async ({ page }) => {
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

      // Wait for the page to stabilize before taking screenshot
      await page.waitForTimeout(500);

      expect(await page.screenshot()).toMatchSnapshot(
        `create-group-form-${type.value.toLowerCase()}-filled.png`
      );
      await page.click('button[type="submit"]');
      await expect(page.locator('[aria-live="polite"]')).toHaveText(
        "הקבוצה נוצרה בהצלחה!"
      );
      await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    }
  });

  test("should redirect to root after 2 seconds", async ({ page }) => {
    await page.goto("/");
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");
    await expect(page.locator("h1")).toHaveText("צור קבוצה חדשה");
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");
    await page.locator('button[role="radio"]:has-text("חברים")').click();
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!"
    );
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    // wait beyond 2 seconds for redirection
    await page.waitForTimeout(2100);
    const url = new URL(page.url());
    expect(url.pathname).toBe("/");
    expect(await page.screenshot()).toMatchSnapshot(
      "create-group-redirection.png"
    );
  });
});
