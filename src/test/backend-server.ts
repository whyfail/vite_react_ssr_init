import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

// 后端上游契约的固定桩。BACKEND_API_BASE_URL 由被测代码通过 vi.stubEnv 设置，
// 与此处的地址保持一致。
export const BACKEND_API_BASE_URL = "http://localhost:8080/api/v1";

export const BACKEND_TOKEN = "unit-test-opaque-token-abcdefghijklmnopqrstuvwxyz0123456789abcdef";

export const server = setupServer(
  http.post(`${BACKEND_API_BASE_URL}/login`, async ({ request }) => {
    const body = (await request.json()) as { username?: string; password?: string };

    if (body.username === "admin" && body.password === "ChangeMe123!") {
      return HttpResponse.json({
        token: BACKEND_TOKEN,
        tokenType: "Bearer",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        user: {
          publicId: "9f1c3b2a-4d5e-4f60-8a71-2b3c4d5e6f70",
          username: "admin",
          displayName: "Administrator",
          enabled: true,
          roles: ["ADMIN"],
          permissions: ["user:read"],
        },
      });
    }

    return HttpResponse.json(
      {
        type: "https://httpstatuses.io/401",
        title: "Unauthorized",
        status: 401,
        code: "AUTH_INVALID_CREDENTIALS",
        msg: "用户名或密码错误",
        requestId: "req-fixed",
        timestamp: "2026-01-01T00:00:00Z",
      },
      { status: 401, headers: { "Content-Type": "application/problem+json" } },
    );
  }),
  http.post(`${BACKEND_API_BASE_URL}/logout`, () => new HttpResponse(null, { status: 204 })),
);
