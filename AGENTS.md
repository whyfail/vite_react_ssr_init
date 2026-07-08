# AGENTS.md

## AI Project Notes

- This is the CWA enterprise React SSR template built with Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Vitest, Playwright, MSW, and jest-axe.
- Keep the project layered by responsibility: route entries live in `src/app`, business code in `src/features`, shared primitives in `src/shared`, server-only helpers in `src/server`, and test helpers in `src/test`.
- Server components are the default. Add `"use client"` only for interactive components or modules that need browser-only APIs.
- Do not access `window`, `document`, `localStorage`, `sessionStorage`, canvas, or browser performance APIs from server-rendered paths. Move those calls behind client boundaries or runtime guards.
- Business requests should use shared API wrappers in `src/shared/api`; do not scatter raw `fetch` or `axios` setup across pages.
- When adding or changing any component, add or update a component test for it; every component should have at least a render smoke test.
- Validate with `pnpm test`, `pnpm test:coverage`, `pnpm test:component-coverage`, `pnpm typecheck`, `pnpm lint`, `pnpm test:e2e`, and `pnpm build`.
- Test reports are written to `coverage/`, `test-results/`, and `playwright-report/`; inspect them before lowering coverage thresholds.

## SSR Rules

- Keep secrets and privileged calls in server-only modules under `src/server`.
- Client components may import shared UI and client-safe feature modules, but server modules must not import client components.
- Authentication in this template is a demo. Server render must not depend on browser storage; use cookies or request headers for real SSR auth.
- Playwright E2E must run against the production preview server so hydration and routing match deployment behavior.

## Code Style

- Prefer TypeScript and named exports for reusable modules.
- Keep UI text concise and business-like. This template is a work surface, not a marketing page.
- Use lucide-react icons for common actions and keep controls accessible with semantic labels.
