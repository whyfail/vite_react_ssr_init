interface LoginCredentials {
  username: string;
  password: string;
  remember: boolean;
}

export async function createSession(credentials: LoginCredentials) {
  const response = await fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("登录失败，请检查账号和密码。");
  }
}

export type { LoginCredentials };
