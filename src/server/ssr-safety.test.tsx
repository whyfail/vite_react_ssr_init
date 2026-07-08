import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DocsPage } from "@/features/docs/pages/DocsPage";
import { AppLayout } from "@/shared/components/AppLayout";

describe("sSR safety", () => {
  it("server-renders the docs view without browser globals", () => {
    expect(() => renderToString(
      <AppLayout activePath="/docs" title="SSR" subtitle="server">
        <DocsPage />
      </AppLayout>,
    )).not.toThrow();
  });

  it("server-renders the login view without browser globals", () => {
    expect(() => renderToString(<LoginPage />)).not.toThrow();
  });
});
