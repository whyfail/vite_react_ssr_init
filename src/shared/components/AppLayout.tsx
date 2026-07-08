import { FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface AppLayoutProps {
  activePath: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AppLayout({ activePath, title, subtitle, children }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="主导航">
        <Link className="brand" href="/docs">
          <span className="brand-mark">SSR</span>
          <span>CWA React SSR</span>
        </Link>
        <nav className="nav-list">
          <Link className="nav-link" href="/docs" data-active={activePath === "/docs"}>
            <FileText size={16} aria-hidden="true" />
            文档中心
          </Link>
          <Link className="nav-link" href="/login" data-active={activePath === "/login"}>
            <ShieldCheck size={16} aria-hidden="true" />
            登录示例
          </Link>
        </nav>
      </aside>
      <main className="content">
        <header className="topbar">
          <div>
            <h1 className="page-title">{title}</h1>
            <p className="page-subtitle">{subtitle}</p>
          </div>
          <div className="toolbar">
            <Link className="button" href="/login">登录示例</Link>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
