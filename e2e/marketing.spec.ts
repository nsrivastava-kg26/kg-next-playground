import { expect, test } from "@playwright/test";

test.describe("marketing site", () => {
  test("home renders the hero, an experiment CTA and no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "See inside every AI request",
    );
    await expect(page.locator("[data-variant]")).toHaveAttribute("data-variant", /^(a|b)$/);
    expect(errors).toEqual([]);
  });

  test("pricing toggle switches between annual and monthly", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByTestId("price-team")).toContainText("$39");
    await page.getByText("Monthly", { exact: true }).click();
    await expect(page.getByTestId("price-team")).toContainText("$49");
  });

  test("contact form shows server-side validation errors", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("A");
    await page.getByLabel("Work email").fill("not-an-email");
    await page.getByLabel("Message").fill("too short");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please fix the highlighted fields")).toBeVisible();
    await expect(page.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");
  });

  test("blog filters by tag via the URL", async ({ page }) => {
    await page.goto("/blog?tag=nextjs");
    await expect(page.getByRole("article")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "All", exact: true })).toBeVisible();
  });

  test("unknown routes render the 404 page", async ({ page }) => {
    const response = await page.goto("/definitely-not-a-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("span not found")).toBeVisible();
  });

  test("SEO files are served", async ({ request }) => {
    expect((await request.get("/sitemap.xml")).ok()).toBe(true);
    expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
    expect((await request.get("/opengraph-image")).headers()["content-type"]).toBe("image/png");
  });
});

test.describe("demo modal (intercepting route)", () => {
  test.skip(({ isMobile }) => isMobile, "header CTA is in the mobile menu");

  test("opens as a modal on soft navigation and closes with the back button", async ({ page }) => {
    await page.goto("/pricing");
    await page.getByRole("banner").getByRole("link", { name: "Book a demo" }).click();
    await expect(page).toHaveURL(/\/demo$/);
    await expect(page.getByRole("dialog")).toBeVisible();
    // The page behind the modal is still pricing.
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Simple pricing");

    await page.goBack();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page).toHaveURL(/\/pricing$/);
  });

  test("renders the full page on a hard load", async ({ page }) => {
    await page.goto("/demo");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "See Lumen on your own traces",
    );
  });
});
