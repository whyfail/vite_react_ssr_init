"use client";

import type { FormEvent } from "react";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setToken } from "@/features/auth/session";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") || "");
    const password = String(form.get("password") || "");

    if (!username || !password) {
      setError("请输入账号和密码。");
      return;
    }

    setToken("demo-token", true);
    router.push("/docs");
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      {error ? <div className="alert">{error}</div> : null}
      <div className="field">
        <label htmlFor="username">账号</label>
        <input id="username" name="username" autoComplete="username" placeholder="admin" />
      </div>
      <div className="field">
        <label htmlFor="password">密码</label>
        <input id="password" name="password" type="password" autoComplete="current-password" placeholder="任意密码" />
      </div>
      <button className="button primary" type="submit">
        <LogIn size={16} aria-hidden="true" />
        登录
      </button>
    </form>
  );
}
