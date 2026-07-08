"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setToken } from "@/features/auth/session";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") || "");
    const password = String(form.get("password") || "");

    if (!username || !password) {
      setError("请输入账号和密码。");
      return;
    }

    setToken("demo-token", remember);
    router.push("/docs");
  }

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
      {error ? (
        <Alert className="bg-white/85" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <div className="grid gap-1.5">
        <Label className="sr-only" htmlFor="username">
          账号
        </Label>
        <Input
          className="h-10 bg-white/80"
          id="username"
          name="username"
          autoComplete="username"
          defaultValue="admin"
          placeholder="请输入账号：admin"
        />
      </div>
      <div className="grid gap-1.5">
        <Label className="sr-only" htmlFor="password">
          密码
        </Label>
        <Input
          className="h-10 bg-white/80"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          defaultValue="admin"
          placeholder="请输入登录密码：admin"
        />
      </div>
      <Button className="h-10 w-full" type="submit">
        登录
      </Button>
      <label className="flex items-center justify-end gap-2 text-sm text-white">
        <input
          className="size-4 rounded border-white/70 bg-white/80 accent-primary"
          checked={remember}
          type="checkbox"
          onChange={(event) => setRemember(event.target.checked)}
        />
        记住账号
      </label>
    </form>
  );
}
