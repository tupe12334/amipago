import test from "@playwright/test";
import { onBoard } from "./utils/onBoard";

test.describe("Onboarding Flow", () => {
  test("should complete the onboarding flow", async ({ page }) => {
    await onBoard(page);
  });
});
