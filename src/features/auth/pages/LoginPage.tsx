import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <p className="badge">Node SSR</p>
        <h1 id="login-title" className="page-title">CWA React SSR</h1>
        <p className="page-subtitle">登录示例只在客户端写入本地 token，服务端渲染路径保持无浏览器 API 依赖。</p>
        <LoginForm />
        <div className="form-grid">
          <Link className="button" href="/docs">查看文档页</Link>
        </div>
      </section>
    </main>
  );
}
