import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LoginForm } from "./LoginForm";

describe("loginForm", () => {
  it("shows validation feedback when fields are empty", async () => {
    render(<LoginForm />);

    await userEvent.click(screen.getByRole("button", { name: "登录" }));

    expect(screen.getByText("请输入账号和密码。")).toBeInTheDocument();
  });

  it("stores a token after successful submit", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText("账号"), "admin");
    await userEvent.type(screen.getByLabelText("密码"), "admin");
    await userEvent.click(screen.getByRole("button", { name: "登录" }));

    expect(localStorage.getItem("cwa_ssr_token")).toBe("demo-token");
  });
});
