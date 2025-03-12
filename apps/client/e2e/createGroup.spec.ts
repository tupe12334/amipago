import { test, expect } from "./utils/baseTest";

test.describe("Create New Group", () => {
  test("should create a new group successfully", async ({
    page,
    verifySnapshot,
  }) => {
    // Navigate directly to create group page instead of trying to go through groups page
    await page.goto("/create/group");

    // Check we are on create group page
    await expect(page.locator("h1")).toHaveText("צור קבוצה חדשה");

    // Add snapshot verification for empty create group form
    await verifySnapshot("create-group-form-empty");

    // Fill new group details
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");

    // Select group type - using the custom radio button for "חברים" (Friends)
    // This targets the button element with role="radio" that contains the text "חברים"
    await page.locator('button[role="radio"]:has-text("חברים")').click();

    // Add snapshot verification for filled form
    await verifySnapshot("create-group-form-filled");

    // Submit form
    await page.click('button[type="submit"]');

    // Check group was created successfully
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!"
    );

    // Check success icon is displayed using font-awesome as required
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();

    // Add snapshot verification for success state
    await verifySnapshot("create-group-success");
  });

  test("should validate form errors correctly", async ({
    page,
    verifySnapshot,
  }) => {
    // Navigate directly to create group page
    await page.goto("/create/group");

    // Check form is visible
    await expect(page.locator("form")).toBeVisible();

    // Add snapshot verification for empty form
    await verifySnapshot("validation-empty-form");

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check validation error appears for required field
    await expect(page.locator('[aria-describedby="name-error"]')).toBeVisible();
    await expect(page.locator("#name-error")).toContainText("שדה זה הוא חובה");

    // Add snapshot verification for validation errors
    await verifySnapshot("validation-errors-shown");

    // Fill only group name and submit form - use ID selector instead of name
    await page.locator("#name").fill("קבוצת בדיקה");

    // Add snapshot verification for partially filled form
    await verifySnapshot("validation-name-only-filled");

    await page.click('button[type="submit"]');

    // Check form submitted successfully even without description (not required)
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!",
      { timeout: 5000 }
    );

    // Add snapshot verification for success state
    await verifySnapshot("validation-success");
  });
});
