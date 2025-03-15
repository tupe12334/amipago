import { test, expect } from "@playwright/test";
import { onBoard } from "./utils/onBoard";

test("1. Auto create user object in localStorage on first visit", async ({
  page,
}) => {
  await onBoard(page);

  // Retrieve the user id from localStorage
  const user = await page.evaluate(() => localStorage.getItem("user"));
  expect(user).toBeTruthy();

  // Take snapshot #1 after the user id is created
  await page.screenshot({ animations: "disabled" });
});
