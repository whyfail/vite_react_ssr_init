import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { DocsPage } from "./DocsPage";

describe("docsPage", () => {
  it("renders the template guide content", () => {
    render(<DocsPage />);

    expect(screen.getByRole("heading", { name: "项目开发文档" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "推荐开发流程" })).toBeInTheDocument();
    expect(screen.getByText("src/app")).toBeInTheDocument();
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(<DocsPage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
