// 服务端私有配置：后端 API 根地址（例如 http://localhost:8080/api/v1）。
// 禁止使用 NEXT_PUBLIC_* 暴露到浏览器；仅在服务端模块中读取。
export function getBackendApiBaseUrl(): string {
  const raw = process.env.BACKEND_API_BASE_URL;

  if (typeof raw !== "string" || raw.trim() === "") {
    throw new Error("Missing required environment variable: BACKEND_API_BASE_URL");
  }

  const value = raw.trim();

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error(`Invalid BACKEND_API_BASE_URL protocol: ${url.protocol}`);
    }

    return `${url.protocol}//${url.host}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    throw new Error(`Invalid BACKEND_API_BASE_URL: ${value}`);
  }
}
