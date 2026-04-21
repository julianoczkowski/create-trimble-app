#!/usr/bin/env node

/**
 * Generates TEMPLATE-HEALTH.md with current status of all templates.
 * Run manually or via CI after template-validation workflow.
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const TEMPLATES_DIR = path.join(process.cwd(), "templates");
const OUTPUT_FILE = path.join(process.cwd(), "TEMPLATE-HEALTH.md");

function getPackageVersion(dir, pkg) {
  try {
    const pkgJson = JSON.parse(
      fs.readFileSync(path.join(dir, "package.json"), "utf8")
    );
    const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
    return deps[pkg] || "N/A";
  } catch {
    return "N/A";
  }
}

function getLintScripts(dir) {
  try {
    const pkgJson = JSON.parse(
      fs.readFileSync(path.join(dir, "package.json"), "utf8")
    );
    return Object.keys(pkgJson.scripts || {}).filter(
      (s) => s.startsWith("lint:") && s !== "lint:all"
    );
  } catch {
    return [];
  }
}

function getPreCommitChecks(dir) {
  try {
    const hook = fs.readFileSync(
      path.join(dir, ".husky", "pre-commit"),
      "utf8"
    );
    return (hook.match(/npm run /g) || []).length;
  } catch {
    return 0;
  }
}

function hasFile(dir, filePath) {
  return fs.existsSync(path.join(dir, filePath));
}

function countDemos(dir) {
  const demosDir = path.join(dir, "src", "demos") + path.sep;
  const altDemosDir = path.join(dir, "src", "app", "demos") + path.sep;
  const target = fs.existsSync(demosDir) ? demosDir : altDemosDir;
  if (!fs.existsSync(target)) return 0;
  try {
    const entries = fs.readdirSync(target, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory() && e.name !== "shared").length;
  } catch {
    return 0;
  }
}

function countComponents(dir) {
  const compDir = path.join(dir, "src", "components");
  const altCompDir = path.join(dir, "src", "app", "components");
  const target = fs.existsSync(compDir) ? compDir : altCompDir;
  if (!fs.existsSync(target)) return 0;
  try {
    const files = fs.readdirSync(target);
    return files.filter(
      (f) =>
        (f.endsWith(".tsx") || f.endsWith(".ts")) &&
        (f.startsWith("Modus") || f.startsWith("modus-"))
    ).length;
  } catch {
    return 0;
  }
}

function getCursorRulesCount(dir) {
  const rulesDir = path.join(dir, ".cursor", "rules");
  if (!fs.existsSync(rulesDir)) return 0;
  try {
    return fs.readdirSync(rulesDir).filter((f) => f.endsWith(".mdc")).length;
  } catch {
    return 0;
  }
}

function getGitLastModified(dir) {
  try {
    const result = execSync(
      `git log -1 --format="%ai" -- "${dir}"`,
      { encoding: "utf8", cwd: process.cwd() }
    );
    return result.trim().split(" ")[0];
  } catch {
    return "unknown";
  }
}

function analyzeTemplate(name, dir) {
  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(dir, "package.json"), "utf8")
  );

  const lintScripts = getLintScripts(dir);
  const preCommitChecks = getPreCommitChecks(dir);

  const info = {
    name,
    displayName: pkgJson.name || name,
    demos: countDemos(dir),
    components: countComponents(dir),
    lintScripts: lintScripts.length,
    lintScriptNames: lintScripts,
    preCommitChecks,
    cursorRules: getCursorRulesCount(dir),
    hasRunAllChecks: hasFile(dir, "scripts/run-all-checks.js"),
    hasCI: hasFile(dir, ".github/workflows/ci.yml"),
    hasCLAUDE: hasFile(dir, "CLAUDE.md"),
    hasREADME: hasFile(dir, "README.md"),
    lastModified: getGitLastModified(dir),
  };

  // Framework-specific versions
  if (name === "react") {
    info.framework = "React";
    info.frameworkVersion = getPackageVersion(dir, "react");
    info.bundler = "Vite";
    info.bundlerVersion = getPackageVersion(dir, "vite");
  } else if (name === "solidjs") {
    info.framework = "SolidJS";
    info.frameworkVersion = getPackageVersion(dir, "solid-js");
    info.bundler = "Vite";
    info.bundlerVersion = getPackageVersion(dir, "vite");
  } else if (name === "angular") {
    info.framework = "Angular";
    info.frameworkVersion = getPackageVersion(dir, "@angular/core");
    info.bundler = "Angular CLI";
    info.bundlerVersion = getPackageVersion(dir, "@angular/cli");
  }

  info.modusWC = getPackageVersion(
    dir,
    name === "react"
      ? "@trimble-oss/moduswebcomponents-react"
      : name === "angular"
        ? "@trimble-oss/moduswebcomponents-angular"
        : "@trimble-oss/moduswebcomponents"
  );
  info.modusIcons = getPackageVersion(dir, "@trimble-oss/modus-icons");
  info.tailwind = getPackageVersion(dir, "tailwindcss");

  return info;
}

function generateMarkdown(templates) {
  const now = new Date().toISOString().split("T")[0];

  let md = `# Template Health Report

> Auto-generated on ${now}. Do not edit manually.
> Run \`node scripts/generate-template-health.js\` to regenerate.

## Overview

| | ${templates.map((t) => `**${t.framework}**`).join(" | ")} |
|---|${templates.map(() => "---").join("|")}|
| Framework | ${templates.map((t) => `${t.frameworkVersion}`).join(" | ")} |
| Bundler | ${templates.map((t) => `${t.bundler} ${t.bundlerVersion}`).join(" | ")} |
| Modus WC | ${templates.map((t) => `${t.modusWC}`).join(" | ")} |
| Modus Icons | ${templates.map((t) => `${t.modusIcons}`).join(" | ")} |
| Tailwind | ${templates.map((t) => `${t.tailwind || "v4"}`).join(" | ")} |
| Components | ${templates.map((t) => `${t.components}`).join(" | ")} |
| Demos | ${templates.map((t) => `${t.demos}`).join(" | ")} |
| Cursor Rules | ${templates.map((t) => `${t.cursorRules}`).join(" | ")} |
| Lint Scripts | ${templates.map((t) => `${t.lintScripts}`).join(" | ")} |
| Pre-commit Checks | ${templates.map((t) => `${t.preCommitChecks}`).join(" | ")} |
| run-all-checks.js | ${templates.map((t) => (t.hasRunAllChecks ? "Yes" : "Missing")).join(" | ")} |
| CLAUDE.md | ${templates.map((t) => (t.hasCLAUDE ? "Yes" : "Missing")).join(" | ")} |
| README.md | ${templates.map((t) => (t.hasREADME ? "Yes" : "Missing")).join(" | ")} |
| Last Modified | ${templates.map((t) => `${t.lastModified}`).join(" | ")} |

## Lint Scripts by Template

`;

  for (const t of templates) {
    md += `### ${t.framework}\n\n`;
    if (t.lintScriptNames.length === 0) {
      md += `No lint scripts found.\n\n`;
    } else {
      md += `| Script | Command |\n|--------|--------|\n`;
      for (const s of t.lintScriptNames) {
        md += `| \`${s}\` | \`npm run ${s}\` |\n`;
      }
      md += `\n`;
    }
  }

  md += `## Notes

- **Lint Scripts**: Number of individual \`lint:*\` scripts (excluding \`lint:all\`)
- **Pre-commit Checks**: Number of \`npm run\` commands in \`.husky/pre-commit\`
- **run-all-checks.js**: Runs all checks and shows summary table (doesn't stop at first failure)
- Angular does not include \`lint:semantic\` because the template uses standard semantic HTML
- React and SolidJS use the div-only approach with 8 lint checks; Angular uses 7
`;

  return md;
}

// Main
const templateNames = ["react", "solidjs", "angular"];
const templates = [];

for (const name of templateNames) {
  const dir = path.join(TEMPLATES_DIR, name);
  if (!fs.existsSync(dir)) {
    console.warn(`Template "${name}" not found at ${dir}, skipping`);
    continue;
  }
  templates.push(analyzeTemplate(name, dir));
}

const markdown = generateMarkdown(templates);
fs.writeFileSync(OUTPUT_FILE, markdown);
console.log(`Generated ${OUTPUT_FILE}`);
console.log(
  `Templates analyzed: ${templates.map((t) => t.framework).join(", ")}`
);
