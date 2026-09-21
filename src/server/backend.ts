import { cookies } from "next/headers";
import { getBackendApiBaseUrl } from "./config/backend";

// 服务端转发：从 HttpOnly Cookie 读取 token 并转换为 Bearer 请求后端。
// 只能在服务端（RSC / Route Handler）中使用。
export async function backendFetch(path: string, init?: RequestInit): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const headers = new Headers(init?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${getBackendApiBaseUrl()}${path}`, {
    ...init,
    headers,
  });
}
