import { describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (key: string) => key === "cwa_token" ? { value: "token" } : undefined,
  }),
  headers: async () => ({
    get: (key: string) => key === "user-agent" ? "vitest" : null,
  }),
}));

describe("getServerRequestContext", () => {
  it("reads cookie and header context", async () => {
    const { getServerRequestContext } = await import("./request-context");

    await expect(getServerRequestContext()).resolves.toEqual({
      token: "token",
      userAgent: "vitest",
    });
  });
});
