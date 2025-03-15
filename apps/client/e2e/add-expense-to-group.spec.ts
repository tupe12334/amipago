import { test, expect } from "@playwright/test";
import { createGroup } from "./utils/group/createGroup";
import { onBoard } from "./utils/onBoard";

// This test covers the complete flow of creating a group and adding an expense to it
test("create a group and add an expense to it", async ({ page }) => {
  await onBoard(page);
  const { name } = await createGroup(page, "חברים");
  await page.waitForTimeout(2100); // Wait for animation
  await page.waitForLoadState("networkidle");

  // Find and click on the newly created group
  await page.getByText(new RegExp(name)).click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the group details page
  const groupDetails = await page.screenshot({ animations: "disabled" });
  expect(groupDetails).toMatchSnapshot("05-group-details-page.png");

  // Verify that there are no expenses yet
  await expect(
    page.getByText(new RegExp("אין הוצאות להצגה בקבוצה זו"))
  ).toBeVisible();

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
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");

  // Take a screenshot of expense creation success state
  const expenseSuccess = await page.screenshot({ animations: "disabled" });
  expect(expenseSuccess).toMatchSnapshot();

  await page.waitForTimeout(2100); // Wait for animation
  await page.waitForLoadState("networkidle");

  // Find and click on the previously created group
  await page.getByText(new RegExp(name)).click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the group page showing the expense
  const groupWithExpense = await page.screenshot({ animations: "disabled" });
  expect(groupWithExpense).toMatchSnapshot("09-group-with-expense.png");

  // Verify the expense appears in the list
  await expect(page.getByText(new RegExp("ארוחת ערב במסעדה"))).toBeVisible();
  await expect(page.getByText(new RegExp("ישראל ישראלי"))).toBeVisible();
  await expect(page.getByText(new RegExp("120\\.50"))).toBeVisible();
});
