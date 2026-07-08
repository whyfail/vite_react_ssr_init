import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppLayout } from "./AppLayout";
import { Loading } from "./Loading";

describe("shared components", () => {
  it("renders the app layout", () => {
    render(
      <AppLayout activePath="/docs" title="标题" subtitle="副标题">
        <p>内容</p>
      </AppLayout>,
    );

    expect(screen.getByText("CWA React SSR")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "标题" })).toBeInTheDocument();
    expect(screen.getByText("内容")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<Loading label="处理中" />);

    expect(screen.getByRole("status")).toHaveTextContent("处理中");
  });
});
