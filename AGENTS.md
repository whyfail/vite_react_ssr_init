# AGENTS.md

## Reliability

- Fail fast for invalid config, programmer errors, missing dependencies, and unexpected external input.
- Do not hide failures with broad `try/catch`, empty returns, silent fallbacks, or fake defaults.
- Env vars belong in config code and must distinguish missing, blank, invalid, and valid values.
- Never default or auto-`trim()` secrets; avoid `process.env.X || default`.
- Add a fallback or catch block only when the error is recoverable and the recovery is explicit.
- Component changes require a component test; each component needs at least one render smoke test.
- Validate relevant changes before commit; inspect `coverage/`, `test-results/`, and `playwright-report/` before lowering thresholds.

## Package Manager

Use **pnpm**: `pnpm install`, `pnpm dev`, `pnpm test`, `pnpm build`.

## Commands

| Task            | Command                        |
| --------------- | ------------------------------ |
| Test            | `pnpm test`                    |
| Coverage        | `pnpm test:coverage`           |
| Component guard | `pnpm test:component-coverage` |
| Typecheck       | `pnpm typecheck`               |
| Lint            | `pnpm lint`                    |
| E2E             | `pnpm test:e2e`                |
| Build           | `pnpm build`                   |

## Conventions

- Lint uses the official Next.js flat config plus the Tailwind plugin; keep the ESLint 9 compatibility line until the Next.js plugin chain supports ESLint 10.
- Next.js App Router entries live in `src/app`; business code in `src/features`; shared primitives in `src/shared`; server-only code in `src/server`.
- Server components are default; add `"use client"` only for interactive or browser-only code.
- Browser APIs must not run in server-rendered paths.
- Business requests go through `src/shared/api`; privileged calls stay server-only.
- code-inspector uses `NEXT_ENABLE_CODE_INSPECTOR=true` and optional `NEXT_CODE_INSPECTOR_ACTION=open|copy|both`.

## Commit Attribution

AI commits MUST include:

```text
Co-Authored-By: (the agent model's name and attribution byline)
```
