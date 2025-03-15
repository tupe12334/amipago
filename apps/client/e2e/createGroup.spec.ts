import { expect, test } from "@playwright/test";

test.describe("Create New Group", () => {
  test("should create a new group successfully", async ({ page }) => {
    await page.goto("/");
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");
    await expect(page.locator("h1")).toHaveText(new RegExp("צור קבוצה חדשה"));
        userId: "mock-user-id",
    // Wait for page to stabilizeSOString(),
    await page.waitForLoadState("networkidle");
        settings: {},
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-form-empty.png"-user", JSON.stringify(mockUser));
    );;
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");
    await page.locator('button[role="radio"]:has-text("חברים")').click();
    await expect(page.locator("h1")).toHaveText("צור קבוצה חדשה");
    // Wait for page to stabilize after filling form
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-form-filled.png"nimations: "disabled" })).toMatchSnapshot(
    );"create-group-form-empty.png"
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(new RegExp("הקבוצה נוצרה בהצלחה!"));
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();t[name="description"]').fill("תיאור קבוצת בדיקה");
ait page.locator('button[role="radio"]:has-text("חברים")').click();
    // Wait for success message to fully appear
    await page.waitForLoadState("networkidle");    // Wait for page to stabilize after filling form

    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-success.png"    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
    );
  });
ait page.click('button[type="submit"]');
  test("should validate form errors correctly", async ({ page }) => {wait expect(page.locator('[aria-live="polite"]')).toHaveText(
    await page.goto("/");      "הקבוצה נוצרה בהצלחה!"
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");ator("i.fa.fa-check-circle")).toBeVisible();
    await expect(page.locator("form")).toBeVisible();

    // Wait for form to be fully rendered
    await page.waitForLoadState("networkidle");
ions: "disabled" })).toMatchSnapshot(
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "validation-empty-form.png"    );
    );
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-describedby="name-error"]')).toBeVisible();("should validate form errors correctly", async ({ page }) => {
    await expect(page.locator("#name-error")).toContainText(new RegExp("שדה זה הוא חובה"));

    // Wait for validation errors to fully appear
    await page.waitForLoadState("networkidle");    await expect(page.locator("form")).toBeVisible();

    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "validation-errors-shown.png"    await page.waitForLoadState("networkidle");
    );
    await page.locator("#name").fill("קבוצת בדיקה");animations: "disabled" })).toMatchSnapshot(
"validation-empty-form.png"
    // Wait for input change to reflect
    await page.waitForTimeout(300);    await page.click('button[type="submit"]');
scribedby="name-error"]')).toBeVisible();
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(e-error")).toContainText("שדה זה הוא חובה");
      "validation-name-only-filled.png"
    );
    await page.click('button[type="submit"]');kidle");
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!", "disabled" })).toMatchSnapshot(
      { timeout: 5000 }
    );
"#name").fill("קבוצת בדיקה");
    // Wait for success message to fully appear
    await page.waitForLoadState("networkidle");    // Wait for input change to reflect

    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "validation-success.png"    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
    );
  });
ait page.click('button[type="submit"]');
  test("should create a group for each group type", async ({ page }) => {wait expect(page.locator('[aria-live="polite"]')).toHaveText(
    const groupTypes = [      "הקבוצה נוצרה בהצלחה!",
      { value: "GENERAL", label: "כללי" },
      { value: "FRIENDS", label: "חברים" },
      { value: "HOUSEHOLD", label: "משק בית" },
      { value: "WORK", label: "עבודה" },pear
    ];

    for (const type of groupTypes) {pect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      await page.goto("/");      "validation-success.png"
      await page.click("#floating-action-button-button");
      await page.click("#floating-action-button-option-0");
      await expect(page.locator("h1")).toHaveText(new RegExp("צור קבוצה חדשה"));
      await page{ page }) => {
        .locator('input[name="name"]')
        .fill(`קבוצת בדיקה - ${type.label}`);GENERAL", label: "כללי" },
      await pageם" },
        .locator('input[name="description"]')},
        .fill(`תיאור - ${type.label}`);WORK", label: "עבודה" },
      await page
        .locator(`button[role="radio"]:has-text("${type.label}")`)
        .click();ype of groupTypes) {

      // Wait for the page to fully stabilizeclick("#floating-action-button-button");
      await page.waitForLoadState("networkidle");      await page.click("#floating-action-button-option-0");
      await page.waitForTimeout(500); // Additional wait for animations or UI updatesText("צור קבוצה חדשה");

      expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
        `create-group-form-${type.value.toLowerCase()}-filled.png`        .fill(`קבוצת בדיקה - ${type.label}`);
      );
      await page.click('button[type="submit"]');
      await expect(page.locator('[aria-live="polite"]')).toHaveText(.fill(`תיאור - ${type.label}`);
        "הקבוצה נוצרה בהצלחה!"
      );
      await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();

      // Wait for success UI to be fully visible
      await page.waitForLoadState("networkidle");      await page.waitForLoadState("networkidle");
    }nal wait for animations or UI updates
  });
 expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
  test("should redirect to root after 2 seconds", async ({ page }) => {   `create-group-form-${type.value.toLowerCase()}-filled.png`
    await page.goto("/");      );
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");ocator('[aria-live="polite"]')).toHaveText(
    await expect(page.locator("h1")).toHaveText(new RegExp("צור קבוצה חדשה"));
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");le();
    await page.locator('button[role="radio"]:has-text("חברים")').click();
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!"
    );
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
    // wait beyond 2 seconds for redirection("should redirect to root after 2 seconds", async ({ page }) => {
    await page.waitForTimeout(2100);
    const url = new URL(page.url());n-button");
    expect(url.pathname).toBe("/");on-button-option-0");
.toHaveText("צור קבוצה חדשה");
    // Wait for the page to fully load after redirection"name"]').fill("קבוצת בדיקה");
    await page.waitForLoadState("networkidle");    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");
    await page.waitForTimeout(300); // Allow any final animations to completeברים")').click();

    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-redirection.png"      "הקבוצה נוצרה בהצלחה!"
    );
  });fa-check-circle")).toBeVisible();
}); wait beyond 2 seconds for redirection

    // Wait for the page to fully load after redirection
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300); // Allow any final animations to complete

    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "create-group-redirection.png"
    );
  });
});
