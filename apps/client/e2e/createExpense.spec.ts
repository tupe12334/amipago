import { test, expect } from "@playwright/test";

test.describe("Create New Expense", () => {
  /**
   * This test create a group first, then creates an expense using the created group.
   * It validates the expense form fields and ensures the expense is created successfully.
   */
  test("should create a new expense successfully", async ({ page }) => {
    // --- Sub flow: Create a test group ---
    await page.goto("/");
    await page.getByRole("button", { name: "Add Item" }).click();
    // Assume "Add Group" menu item has text "קבוצה חדשה"
    await page.getByRole("menuitem", { name: /קבוצה חדשה/i }).click();
    // Wait for group creation form to appear (assumed id "group-form")
    await expect(page.locator("#group-form")).toBeVisible();
    // Fill in group creation form fields
    await page.locator("#name").fill("Test Group");
    await page.locator("#description").fill("Test Group Description");
    // Optionally select a group type if available, then submit the form
    await page.locator("button[type='submit']").click();
    // Wait for the group success screen and then navigate back to home
    await expect(page.locator("#group-success")).toBeVisible();
    // Optionally click continue to return home
    await page.getByRole("button", { name: /continue/i }).click();
    // --- End sub flow ---

    // Begin expense creation flow using the created test group
    await page.getByRole("button", { name: "Add Item" }).click();
    await page.getByRole("menuitem", { name: /הוצאה חדשה/i }).click();

    // Wait for the expense form and take initial snapshot
    await expect(page.locator("#expense-form")).toBeVisible();
    const initialScreenshot = await page.screenshot({ animations: "disabled" });
    await expect(initialScreenshot).toMatchSnapshot("expense-form-initial.png");

    // Open group selection modal
    await page.locator("#expense-group-button").click();
    await expect(page.locator("#expense-group-modal-option-")).toBeVisible();
    const modalOpenScreenshot = await page.screenshot({
      animations: "disabled",
    });
    await expect(modalOpenScreenshot).toMatchSnapshot(
      "expense-group-modal-open.png"
    );

    // Select the test group (assuming it's among first options)
    await page.locator('[id^="expense-group-modal-option-"]').first().click();
    await expect(
      page.locator("#expense-group-modal-option-")
    ).not.toBeVisible();

    // Fill in the expense form fields: valid payer, amount, and description
    await page.locator("#expense-payer").fill("משלם תקין");
    await page.locator("#amount").fill("100.50");
    await page.locator("#description").fill("ארוחת צהריים צוותית");

    const filledScreenshot = await page.screenshot({ animations: "disabled" });
    await expect(filledScreenshot).toMatchSnapshot("expense-form-filled.png");

    await page.locator("button[type='submit']").click();

    const successScreenshot = await page.screenshot({ animations: "disabled" });
    await expect(successScreenshot).toMatchSnapshot("expense-success.png");

    await expect(page).toHaveURL("/");
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
