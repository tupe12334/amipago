import { test, expect } from "@playwright/test";

// This test covers the flow of creating an expense directly from the home page
test("create an expense and assign it to a group", async ({ page }) => {
  // First, ensure we have at least one group
  // Start by navigating to home page
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the initial state
  const homePage = await page.screenshot({ animations: "disabled" });
  expect(homePage).toMatchSnapshot("01-home-page-direct-expense.png");

  // Create a group if none exists (we need to check if any groups are listed)
  const hasGroups =
    (await page.locator('[data-testid="group-list-container"] li').count()) > 0;

  if (!hasGroups) {
    // Click the add button
    await page.locator("#add-btn-main-icon").click();
    await page.waitForTimeout(500);

    // Click on create group option
    await page.locator("#add-btn-group-icon").click();
    await page.waitForLoadState("networkidle");

    // Fill in group creation form
    const testGroupName = `Test Group ${Date.now()}`;
    await page.locator("input#name").fill(testGroupName);
    await page
      .locator("input#description")
      .fill("Test group for expense assignment");

    // Select group type
    await page.getByRole("radio", { name: "כללי" }).check();

    // Take a snapshot of the completed form
    const groupFormFilled = await page.screenshot({ animations: "disabled" });
    expect(groupFormFilled).toMatchSnapshot("02-prerequisite-group-form.png");

    // Submit the form
    await page.getByRole("button", { name: "צור קבוצה" }).click();
    await page.waitForLoadState("networkidle");

    // Navigate back to home page
    await page.waitForTimeout(2100); // Wait for animation
    await page.waitForLoadState("networkidle");
  }

  // Now create a new expense from the home page
  // Click the add button
  await page.locator("#add-btn-main-icon").click();
  await page.waitForTimeout(500);

  // Take a screenshot showing the add options
  const addOptions = await page.screenshot({ animations: "disabled" });
  expect(addOptions).toMatchSnapshot("03-add-button-options-direct.png");

  // Click on create expense option
  await page.locator("#add-btn-expense-icon").click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the expense form
  const expenseForm = await page.screenshot({ animations: "disabled" });
  expect(expenseForm).toMatchSnapshot("04-direct-expense-form.png");

  // Fill in expense details
  await page.locator("#expense-payer").fill("יוסי כהן");
  await page.locator("#amount").fill("75.30");
  await page.locator("#description").fill("קניות בסופר");

  // Select a group for the expense
  await page.locator("#expense-group-button").click();
  await page.waitForTimeout(500);

  // Take a screenshot of the group selection modal
  const groupSelectionModal = await page.screenshot({ animations: "disabled" });
  expect(groupSelectionModal).toMatchSnapshot("05-group-selection-modal.png");

  // Select the first group in the list
  await page.locator(".expense-group-modal-option").first().click();
  await page.waitForTimeout(500);

  // Take a screenshot after group selection
  const afterGroupSelection = await page.screenshot({ animations: "disabled" });
  expect(afterGroupSelection).toMatchSnapshot("06-after-group-selection.png");

  // Submit the expense form
  await page.getByText("שמור").click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of success state
  const successState = await page.screenshot({ animations: "disabled" });
  expect(successState).toMatchSnapshot("07-direct-expense-success.png");

  // Navigate to home page
  await page.waitForTimeout(2100); // Wait for animation
  await page.waitForLoadState("networkidle");

  // Find and click the first group
  await page.locator('[data-testid="group-list-container"] li').first().click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the group details showing the expense
  const groupWithExpense = await page.screenshot({ animations: "disabled" });
  expect(groupWithExpense).toMatchSnapshot("08-group-with-direct-expense.png");

  // Verify the expense appears in the list
  await expect(page.getByText("קניות בסופר")).toBeVisible();
  await expect(page.getByText("יוסי כהן")).toBeVisible();
  await expect(page.getByText("₪75.30")).toBeVisible();
});
