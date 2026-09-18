import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("session route", () => {
  it("rejects missing credentials", async () => {
    const response = await POST(
      new Request("http://localhost/api/session", {
        method: "POST",
        body: JSON.stringify({}),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("sets an HttpOnly session cookie", async () => {
    const response = await POST(
      new Request("http://localhost/api/session", {
        method: "POST",
        body: JSON.stringify({ username: "admin", password: "admin", remember: true }),
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain("auth_token=demo-token");
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
  });
});
