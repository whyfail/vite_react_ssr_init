import { defineConfig } from "orval";

// 契约唯一来源：springboot-template 的 openapi.yaml 快照。
// 独立开发使用仓库内快照；组合模式（create-wl-app preset）下由根级脚本
// 指向 apps/api/openapi.yaml。生成产物禁止手工编辑。
export default defineConfig({
  api: {
    input: "./openapi/api-contract.yaml",
    output: {
      client: "axios",
      mode: "split",
      target: "./src/shared/api/generated/index.ts",
      schemas: "./src/shared/api/generated/model",
      clean: true,
    },
  },
});
