import { test, expect } from "@playwright/test";

test.describe("Create New Expense", () => {
  test("should create a new expense successfully", async ({ page }) => {
    // Start from root path
    await page.goto("/");

    // Click the Add Item button first
    await page.getByRole("button", { name: "Add Item" }).click();

    // Now select the "Add Expense" option from the menu that appears
    await page.getByRole("menuitem", { name: /הוספת הוצאה/i }).click();

    // Wait for the form to be visible
    await expect(page.locator("#expense-form")).toBeVisible();
    await page.screenshot({
      path: "screenshots/expense-form-initial.png",
      animations: "disabled",
    });

    // Fill in the form with valid data
    await page.locator("#amount").fill("100.50");
    await page.locator("#description").fill("ארוחת צהריים צוותית");

    // The form uses today's date by default

    // Form should be filled now
    await page.screenshot({
      path: "screenshots/expense-form-filled.png",
      animations: "disabled",
    });

    // Submit the form
    await page.locator("button[type='submit']").click();

    // Wait for success message
    await page.waitForSelector("#expense-success-continue");
    await page.screenshot({
      path: "screenshots/expense-success.png",
      animations: "disabled",
    });

    // Verify we can navigate back
    await page.locator("#expense-success-continue").click();
    await expect(page).toHaveURL("/");
  });

  test("should validate form errors correctly", async ({ page }) => {
    await page.goto("/");
    // Update navigation here too
    await page.getByRole("button", { name: "Add Item" }).click();
    await page.getByRole("menuitem", { name: /הוספת הוצאה/i }).click();

    // Clear amount field and set to invalid value
    await page.locator("#amount").fill("-50");
    await page.locator("#description").click(); // Click elsewhere to trigger validation

    // Take snapshot of errors
    await page.screenshot({
      path: "screenshots/expense-form-errors.png",
      animations: "disabled",
    });

    // Check for error messages (assumes the message is displayed near the field)
    const amountErrorMessage = await page
      .locator("#amount")
      .evaluate(
        (el) =>
          el.closest(".form-field")?.querySelector(".error-message")
            ?.textContent
      );
    expect(amountErrorMessage).toBeTruthy();

    // Submit button should be disabled or form submission should not proceed
    await page.locator("button[type='submit']").click();
    await expect(page.locator("#expense-success-continue")).not.toBeVisible();
  });
});
