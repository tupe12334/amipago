import { test, expect } from "@playwright/test";

test.describe("Create New Expense", () => {
  /**
   * This test create a group first, then creates an expense using the created group.
   * It validates the expense form fields and ensures the expense is created successfully.
   */
  test("should create a new expense successfully", async ({ page }) => {
    // --- Sub flow: Create a test group ---
    await page.goto("/");
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-0");
    await expect(page.locator("h1")).toHaveText("צור קבוצה חדשה");

    // Wait for form to be fully rendered
    await page.waitForLoadState("networkidle");

    // Fill in group creation form fields
    await page.locator('input[name="name"]').fill("קבוצת בדיקה להוצאה");
    await page.locator('input[name="description"]').fill("תיאור קבוצת הוצאה");
    await page.locator('button[role="radio"]:has-text("חברים")').click();

    // Submit the group form
    await page.click('button[type="submit"]');
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "הקבוצה נוצרה בהצלחה!"
    );

    // Wait for redirect to happen (2 seconds)
    await page.waitForTimeout(2100);
    await page.waitForLoadState("networkidle");
    // --- End sub flow ---

    // Begin expense creation flow using the created test group
    await page.click("#floating-action-button-button");
    await page.click("#floating-action-button-option-1"); // Assuming option 1 is for expense

    // Wait for the expense form to load
    await expect(page.locator("#expense-form")).toBeVisible();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300); // Extra stability wait

    // Take initial form screenshot
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "expense-form-initial.png"
    );

    // Open group selection modal
    await page.click("#expense-group-select-button");
    await expect(page.locator("#expense-group-select-modal")).toBeVisible();
    await page.waitForTimeout(300); // Wait for modal animation

    // Take screenshot with group modal open
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "expense-group-modal-open.png"
    );

    // Select the test group we created earlier
    await page.click("#expense-group-option-0"); // Assuming first group in list
    await expect(page.locator("#expense-group-select-modal")).not.toBeVisible();

    // Fill in the expense form fields
    await page.locator("#expense-payer-input").fill("משלם תקין");
    await page.locator("#expense-amount-input").fill("100.50");
    await page
      .locator("#expense-description-input")
      .fill("ארוחת צהריים צוותית");

    // Wait for form to settle after filling
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);

    // Take filled form screenshot
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "expense-form-filled.png"
    );

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for success message
    await expect(page.locator('[aria-live="polite"]')).toHaveText(
      "ההוצאה נוצרה בהצלחה!"
    );
    await expect(page.locator("i.fa.fa-check-circle")).toBeVisible();

    // Wait for success UI to be fully visible
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);

    // Take success screenshot
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "expense-success.png"
    );

    // Wait for redirect to happen (assuming same 2 second redirect)
    await page.waitForTimeout(2100);

    // Verify we're back at home
    const url = new URL(page.url());
    expect(url.pathname).toBe("/");
  });

  test("should validate form errors correctly", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Add Item" }).click();
    await page.getByRole("menuitem", { name: /הוצאה חדשה/i }).click();

    await page.locator("#amount").fill("-50");
    await page.locator("#description").click(); // trigger validation

    const errorScreenshot = await page.screenshot({ animations: "disabled" });
    await expect(errorScreenshot).toMatchSnapshot("expense-form-errors.png");

    const amountErrorMessage = await page
      .locator("#amount")
      .evaluate(
        (el) =>
          el.closest(".form-field")?.querySelector(".error-message")
            ?.textContent
      );
    expect(amountErrorMessage).toBeTruthy();

    await page.locator("button[type='submit']").click();
    await expect(page.locator("#expense-success-continue")).not.toBeVisible();
  });
});
