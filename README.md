# {{ name }}

{{ description }}

Enterprise React SSR template for create-wl-app, based on Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Vitest, Playwright, MSW, and jest-axe.

## Stack

- Next.js 16 App Router with Node SSR
- React 19 and TypeScript
- Tailwind CSS 4 with Geist font
- `src/app` route entries plus `features/shared/server/test` layering
- Vitest component tests, coverage gate, component coverage guard, accessibility tests, and Playwright E2E
- Git hooks with Conventional Commit validation

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the SSR development server |
| `pnpm build` | Build the production SSR app |
| `pnpm preview` | Run the production Node SSR server |
| `pnpm test` | Run unit and component tests |
| `pnpm test:coverage` | Run coverage gate |
| `pnpm test:component-coverage` | Ensure every component has a component test |
| `pnpm test:e2e` | Run Playwright against production preview |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm lint` | Run ESLint |

## Project Structure

```txt
src/
  app/                 Next.js App Router entries
  features/            Business features
  shared/              Shared API, UI, components, and utilities
  server/              Server-only request helpers
  test/                Vitest setup and render helpers
tests/e2e/             Playwright specs
```

## SSR Constraints

- Server-rendered code must not directly access `window`, `document`, `localStorage`, `sessionStorage`, canvas, or browser performance APIs.
- Put browser-only behavior in explicit client components with `"use client"`.
- Keep API setup in `src/shared/api` and server-only request context in `src/server`.
- Demo auth writes to browser storage only after hydration. Real SSR auth should use cookies or headers.

## Testing Baseline

Every component must have at least one render smoke test. More complex components should also cover interaction, error, loading, empty, and accessibility states.

Before publishing template changes, run:

```bash
pnpm test
pnpm test:coverage
pnpm test:component-coverage
pnpm typecheck
pnpm lint
pnpm test:e2e
pnpm build
```
