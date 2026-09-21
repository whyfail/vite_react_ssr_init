import type { LoginRequest } from "@/server/contract";

interface SessionProblem {
  code?: string;
  msg?: string;
  requestId?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
  remember: boolean;
}

export async function createSession(credentials: LoginCredentials): Promise<void> {
  const response = await fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials satisfies LoginRequest),
  });

  if (!response.ok) {
    // 错误响应体可能不是 JSON，此时回退到通用提示，不吞掉可用的 msg
    const problem = (await response.json().catch(() => null)) as SessionProblem | null;

    throw new Error(problem?.msg || "登录失败，请检查账号和密码。");
  }
}

export async function destroySession(): Promise<void> {
  await fetch("/api/session", { method: "DELETE" });
}

export type { LoginCredentials };
