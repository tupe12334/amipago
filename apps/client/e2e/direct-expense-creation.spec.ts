import { test, expect } from "@playwright/test";
import { createGroup } from "./utils/group/createGroup";
import { onBoard } from "./utils/onBoard";

// This test covers the flow of creating an expense directly from the home page
test("create an expense and assign it to a group", async ({ page }) => {
  await onBoard(page);
  await createGroup(page, "כללי");

  // Now create a new expense from the home page
  // Click the add button
  await page.locator("#add-btn-main-icon").click();
  await page.waitForTimeout(500);

  // Take a screenshot showing the add options
  const addOptions = await page.screenshot({ animations: "disabled" });
  expect(addOptions).toMatchSnapshot();

  // Click on create expense option
  await page.locator("#add-btn-expense-icon").click();
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");

  // Take a screenshot of the expense form
  const expenseForm = await page.screenshot({ animations: "disabled" });
  expect(expenseForm).toMatchSnapshot();

  // Fill in expense details
  await page.locator("#expense-payer").fill("יוסי כהן");
  await page.locator("#amount").fill("75.30");
  await page.locator("#description").fill("קניות בסופר");

  // Select a group for the expense
  await page.locator("#expense-group-button").click();
  await page.waitForTimeout(500);
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");

  // Take a screenshot of the group selection modal
  const groupSelectionModal = await page.screenshot({ animations: "disabled" });
  expect(groupSelectionModal).toMatchSnapshot();

  // Select the first group in the list
  await page.locator(".expense-group-modal-option").first().click();
  await page.waitForTimeout(500);

  // Take a screenshot after group selection
  const afterGroupSelection = await page.screenshot({ animations: "disabled" });
  expect(afterGroupSelection).toMatchSnapshot();

  // Submit the expense form
  await page.getByText("שמור").click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of success state
  const successState = await page.screenshot({ animations: "disabled" });
  expect(successState).toMatchSnapshot();

  // Navigate to home page
  await page.waitForTimeout(2100); // Wait for animation
  await page.waitForLoadState("networkidle");

  // Find and click the first group
  await page.locator('[data-testid="group-list-container"] li').first().click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the group details showing the expense
  const groupWithExpense = await page.screenshot({ animations: "disabled" });
  expect(groupWithExpense).toMatchSnapshot();

  // Verify the expense appears in the list using regex
  await expect(page.getByText(new RegExp("קניות בסופר"))).toBeVisible();
  await expect(page.getByText(new RegExp("יוסי כהן"))).toBeVisible();
  await expect(page.getByText(new RegExp("75\\.30"))).toBeVisible();
});
