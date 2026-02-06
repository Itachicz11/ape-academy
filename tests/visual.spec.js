import { test, expect } from "@playwright/test";

test.describe("Visual Regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("home tab", async ({ page }) => {
    await expect(page).toHaveScreenshot("home-tab.png");
  });

  test("learn tab", async ({ page }) => {
    await page.getByText("Library").click();
    await expect(page).toHaveScreenshot("learn-tab.png");
  });

  test("profile tab", async ({ page }) => {
    await page.getByText("Profile").dispatchEvent("click");
    await expect(page).toHaveScreenshot("profile-tab.png");
  });

  test("quiz screen", async ({ page }) => {
    // Click the first lesson (which should be unlocked)
    await page.getByText("WTF is an Option?").click();
    await expect(page).toHaveScreenshot("quiz-screen.png");
  });

  test("quiz with answer selected", async ({ page }) => {
    await page.getByText("WTF is an Option?").click();
    // Click the correct answer for the first question
    await page
      .getByText("The right, but not obligation, to buy/sell at a set price")
      .click();
    await expect(page).toHaveScreenshot("quiz-answer-selected.png");
  });

  test("completion screen", async ({ page }) => {
    await page.getByText("WTF is an Option?").click();

    // Answer all 3 questions
    const answers = [
      "The right, but not obligation, to buy/sell at a set price",
      "100 shares",
      "The price at which you can buy/sell the stock",
    ];

    for (const answer of answers) {
      await page.getByText(answer, { exact: true }).click();
      await page.getByRole("button", { name: /Continue|Finish Lesson/ }).click();
    }

    await expect(page).toHaveScreenshot("completion-screen.png");
  });
});
