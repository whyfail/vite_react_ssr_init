import type { NextConfig } from "next";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const projectRoot = dirname(fileURLToPath(import.meta.url));
const enableCodeInspector =
  process.env.NEXT_ENABLE_CODE_INSPECTOR === "true" && process.env.NODE_ENV !== "production";
const codeInspectorAction = process.env.NEXT_CODE_INSPECTOR_ACTION || "open";
const shouldCopyCodeInspectorInfo = ["copy", "both"].includes(codeInspectorAction);
const shouldLocateCodeInspectorInfo = codeInspectorAction !== "copy";

function getCodeInspectorRules() {
  const { codeInspectorPlugin } =
    require("code-inspector-plugin") as typeof import("code-inspector-plugin");

  return codeInspectorPlugin({
    bundler: "turbopack",
    dev: true,
    behavior: {
      copy: shouldCopyCodeInspectorInfo,
      defaultAction: codeInspectorAction === "copy" ? "copy" : "locate",
      locate: shouldLocateCodeInspectorInfo,
    },
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: projectRoot,
    ...(enableCodeInspector ? { rules: getCodeInspectorRules() } : {}),
  },
};

export default nextConfig;
