import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, extname, join, relative, sep } from "node:path";
import process from "node:process";

const root = process.cwd();
const srcRoot = join(root, "src");
const componentDirs = [
  join(srcRoot, "features"),
  join(srcRoot, "shared", "components"),
  join(srcRoot, "shared", "ui"),
];
const componentExtensions = new Set([".tsx"]);
const testExtensions = new Set([".ts", ".tsx"]);

function walk(dir, predicate) {
  if (!existsSync(dir))
    return [];

  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return walk(fullPath, predicate);
    }

    return predicate(fullPath) ? [fullPath] : [];
  });
}

function toImportPath(filePath) {
  return relative(srcRoot, filePath).split(sep).join("/").replace(/\.[^.]+$/, "");
}

function hasComponentNameReference(testContent, componentName) {
  const escapedName = componentName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`import\\s+${escapedName}\\b`),
    new RegExp(`import\\s*\\{[^}]*\\b${escapedName}\\b[^}]*\\}`),
    new RegExp(`<${escapedName}(\\s|/|>)`),
    new RegExp(`render\\([^)]*\\b${escapedName}\\b`),
  ];

  return patterns.some(pattern => pattern.test(testContent));
}

const components = componentDirs.flatMap(dir =>
  walk(dir, filePath =>
    componentExtensions.has(extname(filePath)) && !filePath.includes(".test.")));

const tests = walk(srcRoot, filePath =>
  filePath.includes(".test.") && testExtensions.has(extname(filePath))).map(filePath => readFileSync(filePath, "utf8")).join("\n");

const missing = components.filter((componentPath) => {
  const componentName = basename(componentPath, extname(componentPath));
  const importPath = toImportPath(componentPath);
  const relativePath = relative(srcRoot, componentPath).split(sep).join("/");

  return !tests.includes(importPath)
    && !tests.includes(relativePath)
    && !hasComponentNameReference(tests, componentName);
});

if (missing.length > 0) {
  console.error("Missing component test coverage for:");
  missing.forEach(filePath => console.error(`- ${relative(root, filePath)}`));
  process.exit(1);
}

console.info(`Component test coverage check passed for ${components.length} components.`);
