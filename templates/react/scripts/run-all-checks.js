#!/usr/bin/env node

/**
 * Runs all linting checks and reports results.
 * Unlike && chaining, this runs ALL checks even if some fail,
 * so developers see every issue at once.
 */

import { execSync } from "child_process";

const checks = [
  { name: "TypeScript", cmd: "npm run type-check" },
  { name: "Modus Icons", cmd: "npm run lint:icons" },
  { name: "Semantic HTML", cmd: "npm run lint:semantic" },
  { name: "Design System Colors", cmd: "npm run lint:colors" },
  { name: "Inline Styles", cmd: "npm run lint:styles" },
  { name: "Border Patterns", cmd: "npm run lint:borders" },
  { name: "Opacity Utilities", cmd: "npm run lint:opacity" },
  { name: "Icon Names", cmd: "npm run lint:icon-names" },
];

let failures = 0;
const results = [];

for (const check of checks) {
  try {
    execSync(check.cmd, { stdio: "inherit" });
    results.push({ name: check.name, passed: true });
  } catch {
    failures++;
    results.push({ name: check.name, passed: false });
  }
  console.log(""); // blank line between checks
}

console.log("━".repeat(50));
console.log("Results:");
for (const r of results) {
  console.log(`  ${r.passed ? "PASS" : "FAIL"}  ${r.name}`);
}
console.log("━".repeat(50));

if (failures > 0) {
  console.log(`\n${failures} check(s) failed.\n`);
  process.exit(1);
} else {
  console.log("\nAll checks passed.\n");
}
