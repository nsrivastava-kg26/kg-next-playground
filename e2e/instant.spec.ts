import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

/**
 * Guards the "instant navigation" contract: these assertions run while dynamic
 * content is held back, so they only pass if the content is in the prefetched shell.
 */
test.describe("instant navigations", () => {
  test.skip(({ isMobile }) => isMobile, "desktop nav only");

  test("home → pricing shows plans instantly", async ({ page }) => {
    await page.goto("/");
    await instant(page, async () => {
      await page.getByRole("banner").getByRole("link", { name: "Pricing" }).click();
      await page.waitForURL((url) => url.pathname === "/pricing");
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Simple pricing");
      await expect(page.getByTestId("price-team")).toBeVisible();
    });
  });

  test("blog shell is instant; the filtered list streams in after", async ({ page }) => {
    await page.goto("/");
    await instant(page, async () => {
      await page.getByRole("banner").getByRole("link", { name: "Blog" }).click();
      await page.waitForURL((url) => url.pathname === "/blog");
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Notes from the trace view",
      );
    });
    await expect(page.getByRole("article").first()).toBeVisible();
  });
});
