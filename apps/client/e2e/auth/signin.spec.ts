import { expect, test } from "@playwright/test";

test.describe("Sign in", () => {
  test("should sign in with valid credentials", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

    await page.locator("#user-name-input").fill("Test User");
    await page.locator("#user-email-input").fill("test@example.com");
    await page.locator("#user-password-input").fill("password123");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

    await page.locator("#onboarding-submit").click();
    await page.waitForURL("/", { waitUntil: "networkidle" });

    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
  });

  test("should show validation errors for invalid input", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.locator("#onboarding-submit").click();
    await expect(page.locator("#name-error")).toHaveText(
      /שם חייב להכיל לפחות 2 תווים/,
    );
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

    await page.locator("#user-name-input").fill("Test User");
    await page.locator("#user-email-input").fill("invalid-email");
    await page.locator("#user-password-input").fill("123");

    await page.locator("#onboarding-submit").click();
    await expect(page.locator("#email-error")).toHaveText(
      /כתובת אימייל לא תקינה/,
    );
    await expect(page.locator("#password-error")).toHaveText(
      /סיסמה חייבת להכיל לפחות 6 תווים/,
    );
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
  });

  test("should show error for non-existent user", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.locator("#user-name-input").fill("Non Existent");
    await page.locator("#user-email-input").fill("nonexistent@example.com");
    await page.locator("#user-password-input").fill("password123");

    await page.locator("#onboarding-submit").click();
    await expect(page.locator("#auth-error")).toHaveText(/משתמש לא נמצא/);
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();
  });
});
