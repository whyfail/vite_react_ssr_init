import { expect, test } from "@playwright/test";

test("renders docs page from production SSR preview", async ({ page }) => {
  await page.goto("/docs");

  await expect(page.getByRole("heading", { name: "SSR 模板工作台" })).toBeVisible();
  await expect(page.getByText("企业级 SSR 基线")).toBeVisible();
});

test("supports login smoke flow", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("账号").fill("admin");
  await page.getByLabel("密码").fill("admin");
  await page.getByRole("button", { name: "登录" }).click();

  await expect(page).toHaveURL(/\/docs$/);
});

test("renders 404 route", async ({ page }) => {
  await page.goto("/missing-route");

  await expect(page.getByRole("heading", { name: "页面不存在" })).toBeVisible();
});
