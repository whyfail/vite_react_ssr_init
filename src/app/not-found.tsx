import Link from "next/link";

export default function NotFound() {
  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="not-found-title">
        <p className="badge">404</p>
        <h1 id="not-found-title" className="page-title">页面不存在</h1>
        <p className="page-subtitle">当前地址没有匹配到模板路由。</p>
        <div className="form-grid">
          <Link className="button primary" href="/docs">返回文档页</Link>
        </div>
      </section>
    </main>
  );
}
