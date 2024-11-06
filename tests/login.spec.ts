import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { test, expect } from "@playwright/test";

test("Login", async ({ page }) => {
  await clerkSetup();
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });

  await expect(
    page.getByRole("button", { name: "Open user button" })
  ).toBeVisible();
});
