import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { LoginPage } from "./LoginPage";

describe("loginPage", () => {
  it("renders the login page", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: "登录" })).toBeInTheDocument();
    expect(screen.getByLabelText("账号")).toBeInTheDocument();
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = render(<LoginPage />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
