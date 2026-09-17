import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "./LoginForm";

describe("loginForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows validation feedback when fields are empty", async () => {
    render(<LoginForm />);

    await userEvent.clear(screen.getByLabelText("账号"));
    await userEvent.clear(screen.getByLabelText("密码"));
    await userEvent.click(screen.getByRole("button", { name: "登录" }));

    expect(screen.getByText("请输入账号和密码。")).toBeInTheDocument();
  });

  it("creates a server session after successful submit", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText("账号"), "admin");
    await userEvent.type(screen.getByLabelText("密码"), "admin");
    await userEvent.click(screen.getByLabelText("记住账号"));
    await userEvent.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
  });
});
