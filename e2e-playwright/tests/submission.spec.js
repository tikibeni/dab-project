const { test, expect } = require("@playwright/test");

test("Submission fails with invalid code", async ({ page }) => {
  await page.goto("/")
  expect(page.locator('#assignment-1')).toBeDefined()
  await page.locator('#submission-box-1').fill("def hello(): return 'goodbye'")
  await page.locator("#assignment-1-submit").click()

  const resultLocator = page.locator("#submission-1-result")

  await expect(resultLocator).toBeVisible()
  await expect(resultLocator).toContainText("FAIL")
});

test("Submission succeeds with valid code", async ({ page }) => {
  await page.goto("/")
  expect(page.locator('#assignment-1')).toBeDefined()
  await page.locator('#submission-box-1').fill("def hello(): return 'Hello'")
  await page.locator("#assignment-1-submit").click()

  const resultLocator = page.locator("#submission-1-result")

  await expect(resultLocator).toBeVisible()
  await expect(resultLocator).toContainText("OK")
})

test("Successful submission opens a new task", async ({ page }) => {
    await page.goto("/")

    const assignmentTwoLocator = page.locator("#assignment-2")
    expect(page.locator('#assignment-1')).toBeDefined()
    expect(assignmentTwoLocator).toBeHidden()
    await page.locator('#submission-box-1').fill("def hello(): return 'Hello'")
    await page.locator("#assignment-1-submit").click()
  
    const resultLocator = page.locator("#submission-1-result")
  
    await expect(resultLocator).toBeVisible()
    await expect(resultLocator).toContainText("OK")

    await expect(assignmentTwoLocator).not.toBeHidden()
})