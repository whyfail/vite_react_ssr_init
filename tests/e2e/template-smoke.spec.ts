import { expect, test } from "@playwright/test";

// Mock E2E 使用默认演示账号；真实后端 E2E 通过环境变量注入种子管理员凭据
const E2E_USERNAME = process.env.E2E_AUTH_USERNAME ?? "admin";
const E2E_PASSWORD = process.env.E2E_AUTH_PASSWORD ?? "admin";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page.getByRole("textbox", { name: "账号" }).fill(E2E_USERNAME);
  await page.getByLabel("密码").fill(E2E_PASSWORD);
  await page.getByRole("button", { name: "登录" }).click();
  await expect(page).toHaveURL(/\/docs$/);
}

test("redirects anonymous users to login", async ({ page }) => {
  await page.goto("/docs");

  await expect(page).toHaveURL(/\/login$/);
});

test("renders docs page from production SSR preview", async ({ page }) => {
  await login(page);

  await expect(page.getByRole("heading", { name: "项目开发文档" })).toBeVisible();
  await expect(page.getByText("React SSR Template Guide")).toBeVisible();
});

test("supports login smoke flow", async ({ page }) => {
  await login(page);
});

test("renders 404 route", async ({ page }) => {
  await page.goto("/missing-route");

  await expect(page.getByRole("heading", { name: "页面不存在" })).toBeVisible();
});
