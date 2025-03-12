import { test, expect } from "@playwright/test";

test.describe("קבוצה חדשה", () => {
  test("יצירת קבוצה חדשה", async ({ page }) => {
    // Navigate to groups page
    await page.goto("/");
    await page.click('a[href="/groups"]');

    // Check we are on groups page
    await expect(page.locator("h1")).toHaveText("הקבוצות שלי");
    await expect(page.locator("p")).toContainText("עדיין אין לך קבוצות");

    // Click on button to add new group
    await page.locator('[aria-label="הוסף קבוצה חדשה"]').click();

    // Check we were redirected to create group page
    await expect(page).toHaveURL(/.*\/create\/group/);
    await expect(page.locator("h1")).toHaveText("צור קבוצה חדשה");

    // Fill new group details
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת בדיקה");

    // Select group type with proper accessibility
    await page.click('[aria-label="סוג קבוצה"]');
    await page.click("text=חברים");

    // Submit form
    await page.click('button[type="submit"]');

    // Check group was created successfully
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!"
    );

    // Check success icon is displayed using font-awesome as required
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();
  });

  test("וידוא שגיאות תקינות בטופס יצירת קבוצה", async ({ page }) => {
    // Navigate directly to create group page
    await page.goto("/create/group");

    // Check form is visible
    await expect(page.locator("form")).toBeVisible();

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check validation error appears for required field
    await expect(page.locator('[aria-describedby="name-error"]')).toBeVisible();
    await expect(page.locator("#name-error")).toContainText("שדה זה הוא חובה");

    // Fill only group name and submit form
    await page.locator('input[name="name"]').fill("קבוצת בדיקה");
    await page.click('button[type="submit"]');

    // Check form submitted successfully even without description (not required)
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!",
      { timeout: 5000 }
    );
  });
});
