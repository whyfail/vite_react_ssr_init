import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DocsPage } from "./DocsPage";

describe("docsPage", () => {
  it("renders the SSR baseline table", () => {
    render(<DocsPage />);

    expect(screen.getByRole("heading", { name: "企业级 SSR 基线" })).toBeInTheDocument();
    expect(screen.getByText("服务端渲染")).toBeInTheDocument();
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(<DocsPage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
