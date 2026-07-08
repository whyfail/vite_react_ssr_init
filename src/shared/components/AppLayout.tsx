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
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[248px_minmax(0,1fr)]">
      <aside
        className="border-b border-border bg-card px-4.5 py-6 md:border-r md:border-b-0"
        aria-label="主导航"
      >
        <Link className="flex items-center gap-2.5 text-sm font-semibold" href="/docs">
          <span className="grid size-8.5 place-items-center rounded-full bg-primary text-primary-foreground">
            SSR
          </span>
          <span>CWA React SSR</span>
        </Link>
        <nav className="mt-7 grid gap-1.5">
          <Link
            className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-secondary-foreground hover:bg-muted hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
            href="/docs"
            data-active={activePath === "/docs"}
          >
            <FileText size={16} aria-hidden="true" />
            文档中心
          </Link>
          <Link
            className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-secondary-foreground hover:bg-muted hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary"
            href="/login"
            data-active={activePath === "/login"}
          >
            <ShieldCheck size={16} aria-hidden="true" />
            登录示例
          </Link>
        </nav>
      </aside>
      <main className="min-w-0 p-5 md:p-7">
        <header className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl leading-tight font-semibold">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm text-foreground hover:bg-muted"
              href="/login"
            >
              登录示例
            </Link>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
