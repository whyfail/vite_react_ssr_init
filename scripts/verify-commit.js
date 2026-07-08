import { readFileSync } from "node:fs";
import process from "node:process";

const messageFile = process.argv[2];
const message = readFileSync(messageFile, "utf8").trim();
const pattern =
  /^(?:feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(?:\([^)]+\))?: .{1,72}/;

if (!pattern.test(message)) {
  console.error(
    "Commit message must follow Conventional Commits, for example: feat: add docs page",
  );
  process.exit(1);
}
