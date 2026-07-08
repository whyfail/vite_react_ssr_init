import { expect, test } from "@playwright/test";

test("renders docs page from production SSR preview", async ({ page }) => {
  await page.goto("/docs");

  await expect(page.getByRole("heading", { name: "项目开发文档" })).toBeVisible();
  await expect(page.getByText("React SSR Template Guide")).toBeVisible();
});

test("supports login smoke flow", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("textbox", { name: "账号" }).fill("admin");
  await page.getByLabel("密码").fill("admin");
  await page.getByRole("button", { name: "登录" }).click();

  await expect(page).toHaveURL(/\/docs$/);
});

test("renders 404 route", async ({ page }) => {
  await page.goto("/missing-route");

  await expect(page.getByRole("heading", { name: "页面不存在" })).toBeVisible();
});
