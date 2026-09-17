import { afterEach, describe, expect, it, vi } from "vitest";
import { createSession } from "./index";

describe("auth session", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates an HttpOnly server session through the session endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await createSession({ username: "admin", password: "admin", remember: true });

    expect(fetchMock).toHaveBeenCalledWith("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin", remember: true }),
    });
  });

  it("rejects failed login attempts", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await expect(
      createSession({ username: "admin", password: "wrong", remember: false }),
    ).rejects.toThrow("登录失败");
  });
});
