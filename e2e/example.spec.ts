import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Next.js Enterprise Boilerplate/v);
});

test("has heading", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Delete this",
    }),
  ).toBeVisible();

  const screenshot = await page.screenshot();

  await testInfo.attach("screenshot", {
    contentType: "image/png",
    body: screenshot,
  });
});

test("should not have any automatically detectable accessibility issues", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);

  const screenshot = await page.screenshot();

  await testInfo.attach("screenshot", {
    contentType: "image/png",
    body: screenshot,
  });
});
