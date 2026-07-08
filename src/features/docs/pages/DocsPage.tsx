import type { ComponentType, SVGProps } from "react";
import {
  BellAlertIcon,
  BoltIcon,
  CircleStackIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  DocumentTextIcon,
  FolderIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

interface LibraryItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  role: string;
}

interface StructureItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path: string;
  description: string;
}

interface SwitchItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  key: string;
  plugin: string;
  description: string;
}

const structures: StructureItem[] = [
  {
    icon: RocketLaunchIcon,
    path: "src/app",
    description: "只放 Next App Router 入口：route page、layout、loading、error 与 metadata。",
  },
  {
    icon: FolderIcon,
    path: "src/features",
    description: "业务归属目录：page、component、api、store、business logic 都跟随 feature。",
  },
  {
    icon: PuzzlePieceIcon,
    path: "src/shared",
    description: "跨业务基础能力：ui、api、lib、components。不要放具体业务行为。",
  },
  {
    icon: ShieldCheckIcon,
    path: "src/features/auth",
    description: "登录与 session 边界。演示 token 只在 client boundary 写入。",
  },
  {
    icon: DocumentTextIcon,
    path: "src/server",
    description: "服务端专属能力。SSR 密钥、请求上下文和特权调用只放这里。",
  },
];

const libraries: LibraryItem[] = [
  {
    icon: BoltIcon,
    name: "Next.js",
    role: "App Router SSR、路由入口与生产预览服务。",
  },
  {
    icon: CubeTransparentIcon,
    name: "React",
    role: "组件化视图、Server Components 与 client boundary。",
  },
  {
    icon: PaintBrushIcon,
    name: "Tailwind CSS",
    role: "默认样式表达方式，主题变量映射在 app/tailwind.css。",
  },
  {
    icon: PuzzlePieceIcon,
    name: "shadcn/ui",
    role: "基础 UI primitives；只放 shared/ui。",
  },
  {
    icon: SparklesIcon,
    name: "Heroicons",
    role: "文档与信息展示图标；从 @heroicons/react 按需导入。",
  },
  {
    icon: SparklesIcon,
    name: "lucide-react",
    role: "常见操作图标；用于导航、按钮和控制类 UI。",
  },
  {
    icon: CodeBracketSquareIcon,
    name: "Axios",
    role: "HTTP 基础库；统一封装在 shared/api。",
  },
  {
    icon: BellAlertIcon,
    name: "Sonner",
    role: "Toast 基础能力，业务层按封装入口调用。",
  },
  {
    icon: CircleStackIcon,
    name: "Zustand",
    role: "feature-local 状态管理。",
  },
];

const switches: SwitchItem[] = [
  {
    icon: WrenchScrewdriverIcon,
    key: "NEXT_ENABLE_CODE_INSPECTOR",
    plugin: "code-inspector-plugin",
    description: "在页面上按住组合键点击元素，快速定位组件源码位置；模板默认关闭。",
  },
  {
    icon: DocumentTextIcon,
    key: "NEXT_CODE_INSPECTOR_ACTION",
    plugin: "code-inspector-plugin",
    description: "控制源码定位动作，可选 open、copy 或 both；copy 会把源码位置复制到剪贴板。",
  },
  {
    icon: BoltIcon,
    key: "next.config.ts",
    plugin: "Next config",
    description: "集中维护 Next SSR 构建配置、插件开关与部署约束。",
  },
  {
    icon: CodeBracketSquareIcon,
    key: "vitest.config.ts",
    plugin: "Vitest",
    description: "组件测试与单元测试配置，覆盖 SSR 安全边界和共享模块。",
  },
  {
    icon: ShieldCheckIcon,
    key: "playwright.config.ts",
    plugin: "Playwright",
    description: "E2E 针对生产预览服务执行，验证真实路由、hydration 与登录路径。",
  },
];

export function DocsPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8">
        <header className="rounded-lg border border-cyan-400/20 bg-slate-900/80 p-8 shadow-[0_18px_60px_rgba(8,145,178,0.16)]">
          <p className="text-sm font-semibold text-cyan-300">React SSR Template Guide</p>
          <h2 className="mt-3 text-3xl font-bold text-white">项目开发文档</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            这是给开发者看的极简索引。AI 执行规则已同步到根目录 AGENTS.md；这里保留 SSR
            边界、目录职责和依赖职责的短说明。
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {structures.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
                key={item.path}
              >
                <div className="flex items-center gap-3">
                  <Icon aria-hidden="true" className="size-5 text-cyan-300" />
                  <code className="text-sm font-semibold text-cyan-300">{item.path}</code>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </article>
            );
          })}
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">推荐开发流程</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-md bg-slate-950 p-4">
              <strong className="text-cyan-300">1. 建模块</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">业务代码进 features。</p>
            </div>
            <div className="rounded-md bg-slate-950 p-4">
              <strong className="text-cyan-300">2. 配路由</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">路由入口集中在 src/app。</p>
            </div>
            <div className="rounded-md bg-slate-950 p-4">
              <strong className="text-cyan-300">3. 控边界</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                浏览器 API 留在 client boundary。
              </p>
            </div>
            <div className="rounded-md bg-slate-950 p-4">
              <strong className="text-cyan-300">4. 做验证</strong>
              <p className="mt-2 text-sm leading-6 text-slate-300">执行 pnpm lint/build。</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">核心库职责</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {libraries.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="rounded-md border border-slate-800 bg-slate-950 p-4"
                  key={item.name}
                >
                  <div className="flex items-center gap-3">
                    <Icon aria-hidden="true" className="size-5 text-cyan-300" />
                    <h3 className="font-semibold text-slate-100">{item.name}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.role}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">构建开关</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            SSR
            模板通过环境变量和配置文件集中管理构建行为；实验性能力默认关闭，开启后需要回归验证渲染和
            hydration。
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {switches.map((item) => {
              const Icon = item.icon;

              return (
                <div className="rounded-md border border-slate-800 bg-slate-950 p-4" key={item.key}>
                  <div className="flex items-center gap-3">
                    <Icon aria-hidden="true" className="size-5 text-cyan-300" />
                    <code className="text-sm font-semibold text-cyan-300">{item.key}</code>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    插件：<code className="text-slate-300">{item.plugin}</code>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <PaintBrushIcon aria-hidden="true" className="size-5 text-cyan-300" />
              <h2 className="text-lg font-semibold text-white">UI 约定</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              基础组件放 shared/ui；业务组件留在 feature。
            </p>
          </article>
          <article className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon aria-hidden="true" className="size-5 text-cyan-300" />
              <h2 className="text-lg font-semibold text-white">SSR 边界</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              server-only 代码进 src/server；客户端存储只在 client component 中访问。
            </p>
          </article>
          <article className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <SparklesIcon aria-hidden="true" className="size-5 text-cyan-300" />
              <h2 className="text-lg font-semibold text-white">样式方式</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              默认 Tailwind；全局样式只放 app/globals.scss 与 app/tailwind.css。
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
