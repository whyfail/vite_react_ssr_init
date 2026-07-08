import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { describe, expect, it } from "vitest";
import { apiClient, requestJson } from "./http";

describe("apiClient", () => {
  it("uses the configured api base url", () => {
    expect(apiClient.defaults.baseURL).toBe(process.env.NEXT_PUBLIC_API_BASE_URL || "/api");
  });

  it("returns response data from requestJson", async () => {
    apiClient.defaults.adapter = async (config): Promise<AxiosResponse<{ ok: boolean }>> => ({
      data: { ok: true },
      status: 200,
      statusText: "OK",
      headers: {},
      config: config as InternalAxiosRequestConfig,
    });

    await expect(requestJson<{ ok: boolean }>("/health")).resolves.toEqual({ ok: true });
  });
});
