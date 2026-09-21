import { afterEach, describe, expect, it, vi } from "vitest";
import { createSession, destroySession } from "./index";

describe("auth session", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates an HttpOnly server session through the session endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await createSession({ username: "admin", password: "ChangeMe123!", remember: true });

    expect(fetchMock).toHaveBeenCalledWith("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "ChangeMe123!", remember: true }),
    });
  });

  it("surfaces the backend problem details message on failed login", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () =>
          Promise.resolve({
            code: "AUTH_INVALID_CREDENTIALS",
            msg: "用户名或密码错误",
            requestId: "req-1",
          }),
      }),
    );

    await expect(
      createSession({ username: "admin", password: "wrong", remember: false }),
    ).rejects.toThrow("用户名或密码错误");
  });

  it("falls back to a generic message when the error body is not json", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.reject(new Error("not json")),
      }),
    );

    await expect(
      createSession({ username: "admin", password: "wrong", remember: false }),
    ).rejects.toThrow("登录失败，请检查账号和密码。");
  });

  it("destroys the session through the DELETE endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 204 });
    vi.stubGlobal("fetch", fetchMock);

    await destroySession();

    expect(fetchMock).toHaveBeenCalledWith("/api/session", { method: "DELETE" });
  });
});
