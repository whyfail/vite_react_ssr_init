// 会话 Mock 开关：仅服务端读取，显式设为 true 才启用。
// 用于无后端的本地开发与模板 E2E；组合模式（create-wl-app preset）保持 false。
export function getAuthMockEnabled(): boolean {
  return process.env.ENABLE_AUTH_MOCK === "true";
}
