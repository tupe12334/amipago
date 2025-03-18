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
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

  // Verify that there are no expenses yet
  await expect(
    page.getByText(new RegExp("אין הוצאות להצגה בקבוצה זו"))
  ).toBeVisible();

  // Click on add expense button
  await page.locator("#group-actions-button").click();
  await page.waitForLoadState("networkidle");

  // The date picker selection (using the default current date)
  await page.locator("#expense-date").fill("2023-12-31");

  await page.waitForLoadState("networkidle");

  // Take a screenshot of the expense creation form
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

  // Fill in expense details
  await page.locator("#expense-payer").fill("ישראל ישראלי");
  await page.locator("#amount").fill("120.50");
  await page.locator("#description").fill("ארוחת ערב במסעדה");

  await page.waitForLoadState("networkidle");

  // Take a screenshot before submitting the expense form
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

  // Submit the expense form
  await page.getByText("שמור").click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of expense creation success state
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

  await page.waitForTimeout(2100); // Wait for animation
  await page.waitForLoadState("networkidle");

  // Find and click on the previously created group
  await page.getByText(new RegExp(name)).click();
  await page.waitForLoadState("networkidle");

  // Take a screenshot of the group page showing the expense
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

  // Verify the expense appears in the list
  await expect(page.getByText(new RegExp("ארוחת ערב במסעדה"))).toBeVisible();
  await expect(page.getByText(new RegExp("ישראל ישראלי"))).toBeVisible();
  await expect(page.getByText(new RegExp("120\\.50"))).toBeVisible();
});
