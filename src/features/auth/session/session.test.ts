import { describe, expect, it } from "vitest";
import { clearToken, getToken, isAuthenticated, setToken } from "./index";

describe("auth session", () => {
  it("stores and clears the demo token on the client", () => {
    expect(isAuthenticated()).toBe(false);

    setToken("demo", true);

    expect(getToken()).toBe("demo");
    expect(localStorage.getItem("cwa_ssr_token")).toBe("demo");

    clearToken();

    expect(isAuthenticated()).toBe(false);
  });
});
