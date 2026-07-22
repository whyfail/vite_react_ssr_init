<div align="center">
  <h1>✨ React SSR 企业级开发模板 ✨</h1>

  <p>
    🚀 为 AI 协作而生的 Next.js SSR 项目模板<br>
    📦 开箱即用，内置清晰分层、登录示例、文档入口和质量门禁<br>
    🔧 集成 App Router、API 封装、shadcn/ui、测试体系和提交规范
  </p>

  <div>
    <a href="https://nextjs.org/" target="_blank">
      <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://react.dev/" target="_blank">
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com/" target="_blank">
      <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    </a>
  </div>

  <br>

  <div>
    <img src="https://img.shields.io/badge/Node.js-%5E22.12.0%20%7C%7C%20%5E24.11.0%20%7C%7C%20%3E%3D26.0.0-brightgreen?style=flat-square" alt="Node.js" />
    <img src="https://img.shields.io/badge/pnpm-11.10.0-blue?style=flat-square" alt="pnpm" />
    <img src="https://img.shields.io/badge/License-MIT-yellowgreen?style=flat-square" alt="License" />
  </div>
</div>

---

这是 create-wl-app 的企业级 React SSR 模板。项目基于 Next.js App Router + React 19 构建，默认提供服务端渲染边界、登录示例、开发文档页、shadcn/ui + Tailwind CSS 现代 UI 栈、统一 API 封装、组件测试、E2E 和提交规范，适合团队和 AI Agent 稳定扩展业务代码。

## 🚀 技术栈

- **SSR 框架**：Next.js 16 App Router
- **前端框架**：React 19.2.7
- **开发语言**：TypeScript 6.0.3
- **状态管理**：Zustand 5.0.14
- **UI 组件库**：shadcn/ui + radix-ui
- **样式方案**：Tailwind CSS 4.3.3 + Sass
- **图标方案**：Heroicons + lucide-react 1.25.0
- **代码规范**：ESLint 9.39.5 + Next.js 官方 flat config + oxfmt 0.59.0
- **提交规范**：simple-git-hooks + lint-staged + commitlint
- **API 封装**：Axios 1.18.1
- **测试体系**：Vitest + Testing Library + Playwright + MSW + jest-axe

## 📦 快速开始

### 环境要求

- Node.js `^22.12.0 || ^24.11.0 || >=26.0.0`
- pnpm `11.10.0`

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

开发服务器默认运行在 `http://localhost:3000`。

### 项目打包与预览

```bash
pnpm build
pnpm preview
```

## 📁 项目结构

```txt
src/
├── app/               # Next.js App Router 入口、布局和路由页面
├── features/          # 业务功能模块，如 auth、docs
├── shared/            # 跨业务基础能力，如 ui、api、lib、hooks
├── server/            # server-only 请求上下文和特权调用
└── test/              # Vitest setup、render helper 和测试工具
tests/e2e/             # Playwright E2E 用例
```

### 主要目录说明

- **app/**：Next.js 路由入口和应用级组合代码
- **features/**：业务模块，模块内聚页面、组件、store、api 和业务逻辑
- **features/auth/**：登录示例和 client-safe session 行为
- **features/docs/**：模板文档页，用于说明 SSR 边界、目录职责和依赖职责
- **shared/ui/**：shadcn/ui 基础组件，禁止放业务逻辑
- **shared/api/**：HTTP 基础设施和请求封装
- **shared/lib/**：跨业务纯工具函数
- **server/**：服务端专属能力，存放不能进入客户端 bundle 的逻辑

## 🎯 核心功能

### 🌐 SSR 路由

- ✅ 使用 Next.js App Router 管理页面入口
- ✅ Server Components 默认启用，交互组件通过 `"use client"` 明确边界
- ✅ 登录和文档示例保持 SSR-safe，不在服务端读取浏览器存储
- ✅ Playwright 针对生产预览服务验证真实路由和 hydration

### 🔐 登录示例

- ✅ 提供模板级登录页和 session 示例
- ✅ Demo token 仅在客户端安全交互中写入浏览器存储
- ✅ 真实业务 SSR 登录建议改用 cookie 或请求头

### 🎨 UI 与样式

- ✅ 使用 Tailwind CSS 作为默认样式方案
- ✅ shadcn/ui 基础组件统一放在 `src/shared/ui`
- ✅ Heroicons 和 lucide-react 按需导入
- ✅ 业务组件放在各自 feature 内，避免污染基础组件目录

### 🔌 API 封装

- ✅ 基于 Axios 的统一请求封装
- ✅ 业务请求优先走 `src/shared/api`
- ✅ server-only 请求上下文放在 `src/server`
- ✅ 避免在页面中散落 raw `fetch` 或 Axios 实例

### 📐 代码规范

- ✅ ESLint + oxfmt 保持代码质量和格式稳定
- ✅ simple-git-hooks + lint-staged 处理提交前检查
- ✅ commitlint 校验 Conventional Commit 信息
- ✅ TypeScript 严格类型检查，提交前可运行 `pnpm typecheck`

## 🧪 测试与质量门禁

### 常用测试命令

```bash
# 单元测试、组件测试、a11y 测试
pnpm test

# 覆盖率门禁
pnpm test:coverage

# 生成 JUnit 报告，供 CI 读取
pnpm test:junit

# 检查新增/修改组件是否有组件测试
pnpm test:component-coverage

# Playwright E2E 冒烟测试
pnpm test:e2e
```

### 提交前建议验证

```bash
pnpm test
pnpm test:coverage
pnpm test:component-coverage
pnpm typecheck
pnpm lint
pnpm test:e2e
pnpm build
```

### 测试约定

- 新增或修改组件时，必须同步新增或更新组件测试；每个组件至少保留一个 render smoke test。
- 业务逻辑、session、navigation、API wrapper 等非 UI 能力应补单元测试。
- 网络请求测试使用 MSW，不在测试中请求真实后端。
- 页面级无障碍测试使用 `jest-axe`，E2E 冒烟测试使用 Playwright。
- 覆盖率报告输出到 `coverage/`；Vitest/Playwright JUnit 报告输出到 `test-results/`；Playwright HTML 报告输出到 `playwright-report/`。

## 🛠️ 开发调试开关

### 页面元素定位源码

默认保持关闭，需要在真实环境变量中开启；`.env.example` 仅作为说明，不会自动生效。

```bash
NEXT_ENABLE_CODE_INSPECTOR=true pnpm dev
```

macOS 按住 `shift + option`，Windows 按住 `shift + alt`，点击页面元素即可打开对应源码位置。

### 复制源码位置

```bash
NEXT_ENABLE_CODE_INSPECTOR=true NEXT_CODE_INSPECTOR_ACTION=copy pnpm dev
```

`NEXT_CODE_INSPECTOR_ACTION` 支持 `open`、`copy`、`both`。

## ⚙️ 配置文件说明

| 配置文件                | 说明                         |
| ----------------------- | ---------------------------- |
| `next.config.ts`        | Next.js SSR 构建和插件配置   |
| `eslint.config.mjs`     | ESLint 代码规范配置          |
| `vitest.config.ts`      | Vitest 单元和组件测试配置    |
| `playwright.config.ts`  | Playwright E2E 配置          |
| `components.json`       | shadcn/ui 组件配置           |
| `commitlint.config.cjs` | Conventional Commit 校验配置 |

## 📝 提交规范

提交信息使用 Conventional Commits：

```bash
git add -A
git commit -m "feat: add auth page"
git pull --rebase
git push
```

## 📄 许可证

本项目采用 MIT 许可证，详见 `LICENSE`。
