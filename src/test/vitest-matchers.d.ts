import "vitest";

// Vitest 5 removed the global jest.Matchers type bridge, so jest-axe's
// matcher is declared on vitest's own Matchers extension point instead.
declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- _T only mirrors vitest's Matchers declaration positionally
  interface Matchers<R extends void | Promise<void> = void, _T = unknown> {
    toHaveNoViolations(): R;
  }
}
