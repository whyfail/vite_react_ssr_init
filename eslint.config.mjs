import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import tailwindcss from "eslint-plugin-tailwindcss";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      tailwindcss,
    },
    settings: {
      tailwindcss: {
        cssConfigPath: "./src/app/tailwind.css",
      },
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "off",
    },
  },
  globalIgnores([".next/**", "coverage/**", "playwright-report/**", "test-results/**"]),
]);
