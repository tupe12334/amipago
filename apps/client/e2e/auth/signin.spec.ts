import { expect, test } from "@playwright/test";

test.describe("Sign in", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      "**/identitytoolkit.googleapis.com/v1/**",
      async (route) => {
        const url = route.request().url();
        if (url.includes("signInWithPassword")) {
          if (route.request().postData()?.includes("test@example.com")) {
            await route.fulfill({
              status: 200,
              body: JSON.stringify({
                localId: "testUserId",
                email: "test@example.com",
                displayName: "Test User",
                idToken: "fake-token",
              }),
            });
          } else {
            await route.fulfill({
              status: 400,
              body: JSON.stringify({
                error: {
                  message: "EMAIL_NOT_FOUND",
                },
              }),
            });
          }
        }
      },
    );
  });

  test("should sign in with valid credentials", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

    await page.locator("#user-name-input").fill("Test User");
    await page.locator("#user-email-input").fill("test@example.com");
    await page.locator("#user-password-input").fill("password123");
    expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot();

    await page.locator("#onboarding-submit").click();

    // Wait for navigation to complete with a timeout and base URL
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.waitForURL("**/groups", { waitUntil: "networkidle" }),
    ]);

    await expect(page.locator("h1")).toHaveText(/הקבוצות שלי/);
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
