import { expect, test } from "@playwright/test";
import { createGroup } from "./utils/group/createGroup";
import { onBoard } from "./utils/onBoard";

test.describe("Create New Expense", () => {
  /**
   * This test create a group first, then creates an expense using the created group.
   * It validates the expense form fields and ensures the expense is created successfully.
   */
  test("should create a new expense successfully", async ({ page }) => {
    await onBoard(page);
    await createGroup(page, "חברים");

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
    await page.click("#expense-group-button");
    await expect(page.locator(".expense-group-modal-option")).toBeVisible();
    await page.waitForTimeout(300); // Wait for modal animation

    // Take screenshot with group modal open
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
      "expense-group-modal-open.png"
    );

    // Select the test group we created earlier
    await page.locator(".expense-group-modal-option").first().click();
    await expect(page.locator(".expense-group-modal-option")).not.toBeVisible();

    // Fill in the expense form fields
    await page.locator("#expense-payer").fill("משלם תקין"); // Changed from #expense-payer-input
    await page.locator("#amount").fill("100.50"); // Changed from #expense-amount-input
    await page.locator("#description").fill("ארוחת צהריים צוותית"); // Changed from #expense-description-input

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
      new RegExp("ההוצאה נוצרה בהצלחה!")
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
