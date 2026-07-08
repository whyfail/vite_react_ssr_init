import antfu from "@antfu/eslint-config";

export default antfu(
  {
    react: true,
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: "double",
      semi: true,
    },
    ignores: [".next", "coverage", "playwright-report", "test-results"],
  },
);
