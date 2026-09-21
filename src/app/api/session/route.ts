import { NextResponse } from "next/server";
import { backendFetch } from "@/server/backend";
import { getAuthMockEnabled } from "@/server/config/auth-mock";
import { getBackendApiBaseUrl } from "@/server/config/backend";
import type { LoginResponse, Problem } from "@/server/contract";

interface LoginBody {
  username?: string;
  password?: string;
  remember?: boolean;
}

const SESSION_COOKIE = "auth_token";

// 43+ 字符的 Mock token，仅在显式开启 ENABLE_AUTH_MOCK 时使用
const MOCK_TOKEN = "mock-opaque-token-abcdefghijklmnopqrstuvwxyz0123456789abcdef";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;

  if (!body.username || !body.password) {
    return NextResponse.json({ message: "请输入账号和密码。" }, { status: 400 });
  }

  if (getAuthMockEnabled()) {
    return createSessionCookieResponse(
      MOCK_TOKEN,
      new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    );
  }

  const upstream = await fetch(`${getBackendApiBaseUrl()}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: body.username,
      password: body.password,
      remember: body.remember,
    }),
  });

  if (!upstream.ok) {
    // 错误响应透传 Problem Details 顶层 code/msg/requestId；响应体可能不是 JSON，此时回退到通用提示
    const problem = (await upstream.json().catch(() => null)) as Problem | null;

    return NextResponse.json(
      {
        code: problem?.code,
        msg: problem?.msg || "登录失败，请检查账号和密码。",
        requestId: problem?.requestId,
      },
      { status: upstream.status },
    );
  }

  const login = (await upstream.json()) as LoginResponse;

  return createSessionCookieResponse(login.token, login.expiresAt);
}

export async function DELETE() {
  // Mock 模式没有真实后端会话，跳过撤销调用
  if (!getAuthMockEnabled()) {
    try {
      await backendFetch("/logout", { method: "POST" });
    } catch (error) {
      // 后端不可达时本地登出仍必须成功：清除 Cookie 是安全边界，撤销失败仅记录
      console.error("后端会话撤销失败，本地会话仍将清除", error);
    }
  }

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}

function createSessionCookieResponse(token: string, expiresAt: string) {
  // Cookie 生命周期不超过后端会话过期时间
  const maxAge = Math.max(0, Math.floor((Date.parse(expiresAt) - Date.now()) / 1000));
  const response = NextResponse.json({ authenticated: true });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
