import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

describe("auth proxy", () => {
  it("redirects anonymous requests to login", () => {
    const response = proxy(new NextRequest("http://localhost/docs"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/login");
  });

  it("allows requests with a session cookie", () => {
    const request = new NextRequest("http://localhost/docs", {
      headers: { cookie: "cwa_token=demo-token" },
    });

    expect(proxy(request).status).toBe(200);
  });
});
