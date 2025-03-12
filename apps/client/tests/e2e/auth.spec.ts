import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should show validation errors when login form is submitted with invalid data", async ({
    page,
  }) => {
    await page.goto("/login");

    // Submit form without entering any data
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check for validation errors
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test("should display error message with incorrect credentials", async ({
    page,
  }) => {
    await page.goto("/login");

    // Fill in form with incorrect data
    await page.getByLabel(/email/i).fill("incorrect@example.com");
    await page.getByLabel(/password/i).fill("wrongpassword");

    // Submit the form
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check for error message
    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
  });
});
