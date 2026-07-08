"use client";

import { RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="error-title">
        <p className="badge">Error</p>
        <h1 id="error-title" className="page-title">页面加载失败</h1>
        <p className="page-subtitle">{error.message || "请稍后重试。"}</p>
        <div className="form-grid">
          <button className="button primary" type="button" onClick={reset}>
            <RefreshCw size={16} aria-hidden="true" />
            重试
          </button>
        </div>
      </section>
    </main>
  );
}
