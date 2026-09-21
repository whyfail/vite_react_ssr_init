import { afterEach, afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { BACKEND_API_BASE_URL, server } from "@/test/backend-server";
import { DELETE, POST } from "./route";

vi.mock("@/server/backend", () => ({
  backendFetch: vi.fn().mockResolvedValue(new Response(null, { status: 204 })),
}));

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  vi.unstubAllEnvs();
});
afterAll(() => server.close());

function loginRequest(body: unknown): Request {
  return new Request("http://localhost:3000/api/session", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("session route", () => {
  it("rejects missing credentials", async () => {
    vi.stubEnv("ENABLE_AUTH_MOCK", "false");

    const response = await POST(loginRequest({}));

    expect(response.status).toBe(400);
  });

  it("creates an HttpOnly session cookie from the real backend response", async () => {
    vi.stubEnv("BACKEND_API_BASE_URL", BACKEND_API_BASE_URL);
    vi.stubEnv("ENABLE_AUTH_MOCK", "false");

    const response = await POST(
      loginRequest({ username: "admin", password: "ChangeMe123!", remember: true }),
    );

    expect(response.status).toBe(200);
    const cookie = response.headers.get("set-cookie");

    expect(cookie).toContain("auth_token=unit-test-opaque-token");
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("SameSite=lax");
    expect(cookie).not.toContain("demo-token");
    expect((await response.json()) as unknown).toMatchObject({ authenticated: true });
  });

  it("caps cookie lifetime at the backend session expiry", async () => {
    vi.stubEnv("BACKEND_API_BASE_URL", BACKEND_API_BASE_URL);
    vi.stubEnv("ENABLE_AUTH_MOCK", "false");

    const response = await POST(
      loginRequest({ username: "admin", password: "ChangeMe123!", remember: false }),
    );

    const maxAge = /Max-Age=(\d+)/.exec(response.headers.get("set-cookie") ?? "")?.[1];

    expect(Number(maxAge)).toBeGreaterThan(0);
    expect(Number(maxAge)).toBeLessThanOrEqual(3600);
  });

  it("propagates problem details from the backend on invalid credentials", async () => {
    vi.stubEnv("BACKEND_API_BASE_URL", BACKEND_API_BASE_URL);
    vi.stubEnv("ENABLE_AUTH_MOCK", "false");

    const response = await POST(loginRequest({ username: "admin", password: "wrong-password" }));

    expect(response.status).toBe(401);
    expect((await response.json()) as unknown).toMatchObject({
      code: "AUTH_INVALID_CREDENTIALS",
      msg: "用户名或密码错误",
      requestId: "req-fixed",
    });
  });

  it("issues a mock session only when the mock switch is explicitly enabled", async () => {
    vi.stubEnv("ENABLE_AUTH_MOCK", "true");

    const response = await POST(loginRequest({ username: "admin", password: "admin" }));

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain("auth_token=mock-opaque-token");
  });

  it("clears the session cookie and revokes the backend session on logout", async () => {
    vi.stubEnv("BACKEND_API_BASE_URL", BACKEND_API_BASE_URL);
    vi.stubEnv("ENABLE_AUTH_MOCK", "false");

    const response = await DELETE();

    expect(response.status).toBe(204);
    const cookie = response.headers.get("set-cookie");

    expect(cookie).toContain("auth_token=");
    expect(cookie).toContain("Max-Age=0");
    expect(cookie).toContain("HttpOnly");

    const { backendFetch } = await import("@/server/backend");

    expect(backendFetch).toHaveBeenCalledWith("/logout", { method: "POST" });
  });

  it("still clears the local session when the backend logout fails", async () => {
    vi.stubEnv("BACKEND_API_BASE_URL", BACKEND_API_BASE_URL);
    vi.stubEnv("ENABLE_AUTH_MOCK", "false");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    server.use(http.post(`${BACKEND_API_BASE_URL}/logout`, () => HttpResponse.error()));

    const { backendFetch } = await import("@/server/backend");

    vi.mocked(backendFetch).mockRejectedValueOnce(new Error("backend down"));

    const response = await DELETE();

    expect(response.status).toBe(204);
    expect(response.headers.get("set-cookie")).toContain("Max-Age=0");
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
