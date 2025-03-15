import { test, expect } from "@playwright/test";

// This test covers the complete flow of creating a group and adding an expense to it
test("create a group and add an expense to it", async ({ page }) => {
  // Navigate to home page
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Take a named screenshot of the initial state
  const homePage = await page.screenshot({ animations: "disabled" });
  expect(homePage).toMatchSnapshot("01-home-page.png");

  // Click the add button to show options
  await page.locator("#add-btn-main-icon").click();
  await page.waitForTimeout(500); // Wait for animation

  // Take a screenshot showing the add options
  const addOptions = await page.screenshot({ animations: "disabled" });
  expect(addOptions).toMatchSnapshot("02-add-button-options.png");

  // Click on create group option
  await page.locator("#add-btn-group-icon").click();
  await page.waitForLoadState("networkidle");

  // Fill in group creation form
  const testGroupName = `Test Group`;
  await page.locator("input#name").fill(testGroupName);
  await page
    .locator("input#description")
    .fill("This is a test group for E2E testing");

  // Select group type
  await page.getByRole("radio", { name: "חברים" }).check();

  // Take a screenshot before submitting the form
  const filledGroupForm = await page.screenshot({ animations: "disabled" });
  expect(filledGroupForm).toMatchSnapshot("03-group-form-filled.png");

  // Submit the form
  await page.getByRole("button", { name: "צור קבוצה" }).click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of success state
  const successState = await page.screenshot({ animations: "disabled" });
  expect(successState).toMatchSnapshot("04-group-created-success.png");

  // Navigate back to home page
  await page.waitForTimeout(2100); // Wait for animation
  await page.waitForLoadState("networkidle");

  // Find and click on the newly created group
  await page.getByText(testGroupName).click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the group details page
  const groupDetails = await page.screenshot({ animations: "disabled" });
  expect(groupDetails).toMatchSnapshot("05-group-details-page.png");

  // Verify that there are no expenses yet
  await expect(page.getByText("אין הוצאות להצגה בקבוצה זו")).toBeVisible();

  // Click on add expense button
  await page.locator("#group-actions-button").click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the expense creation form
  const expenseForm = await page.screenshot({ animations: "disabled" });
  expect(expenseForm).toMatchSnapshot("06-expense-form.png");

  // Fill in expense details
  await page.locator("#expense-payer").fill("ישראל ישראלי");
  await page.locator("#amount").fill("120.50");
  await page.locator("#description").fill("ארוחת ערב במסעדה");

  // The date picker selection (using the default current date)

  // Select currency (the default is ILS so we'll keep it)

  // Take a screenshot before submitting the expense form
  const filledExpenseForm = await page.screenshot({ animations: "disabled" });
  expect(filledExpenseForm).toMatchSnapshot("07-expense-form-filled.png");

  // Submit the expense form
  await page.getByText("שמור").click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of expense creation success state
  const expenseSuccess = await page.screenshot({ animations: "disabled" });
  expect(expenseSuccess).toMatchSnapshot("08-expense-created-success.png");

  await page.waitForTimeout(2100); // Wait for animation
  await page.waitForLoadState("networkidle");

  // Find and click on the previously created group
  await page.getByText(testGroupName).click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the group page showing the expense
  const groupWithExpense = await page.screenshot({ animations: "disabled" });
  expect(groupWithExpense).toMatchSnapshot("09-group-with-expense.png");

  // Verify the expense appears in the list
  await expect(page.getByText("ארוחת ערב במסעדה")).toBeVisible();
  await expect(page.getByText("ישראל ישראלי")).toBeVisible();
  await expect(page.getByText("120.50")).toBeVisible();
});
