import antfu from "@antfu/eslint-config";
import tailwindcss from "eslint-plugin-tailwindcss";

export default antfu({
  react: true,
  typescript: true,
  stylistic: false,
  jsonc: false,
  yaml: false,
  ignores: [".next", "coverage", "playwright-report", "test-results"],
}).append({
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
});
