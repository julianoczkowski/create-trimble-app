#!/usr/bin/env node

/**
 * Modus Color Linting Script for Vite + React
 *
 * This script checks for usage of non-Modus color patterns in React/Vite files,
 * CSS files, and TypeScript files to ensure design system consistency.
 *
 * It flags common Tailwind color patterns and suggests Modus alternatives.
 */

import fs from "fs";
import path from "path";
import { glob } from "glob";

// Common Tailwind color patterns to detect
const TAILWIND_COLOR_PATTERNS = [
  // Tailwind color classes
  /\b(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(\d{2,3}|50)\b/g,

  // Tailwind background colors
  /\bbg-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(\d{2,3}|50)\b/g,

  // Tailwind text colors
  /\btext-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(\d{2,3}|50)\b/g,

  // Tailwind border colors
  /\bborder-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(\d{2,3}|50)\b/g,

  // CSS hex colors (Modus-specific hex values that should be flagged)
  /#(ff0000|00ff00|0000ff|ffff00|ff00ff|00ffff|ffffff|000000|fff|000|f1f1f6|252a2e|cbcdd6|464b52|b7b9c3|353a40|171c1e|0063a3|1e8a44|da212c|fbad26)\b/gi,

  // CSS rgb/rgba colors (basic ones)
  /rgb\(\s*(255,\s*0,\s*0|0,\s*255,\s*0|0,\s*0,\s*255|255,\s*255,\s*0|255,\s*0,\s*255|0,\s*255,\s*255|255,\s*255,\s*255|0,\s*0,\s*0)\s*\)/gi,

  // CSS Variables (should use design system colors instead)
  /var\(--modus-wc-color-[^)]*\)/g,
  // Allow border-related CSS variables (exception for Tailwind v4 conflicts)
  /var\(--(?!border|ring|input|radius)[^)]*\)/g,
];

// Design System Color Suggestions (from globals.css)
const DESIGN_SYSTEM_COLOR_SUGGESTIONS = {
  // Background colors
  red: "bg-destructive",
  green: "bg-success",
  blue: "bg-primary",
  info: "bg-primary",
  yellow: "bg-warning",
  black: "bg-background",
  white: "bg-background",
  gray100: "bg-card",
  gray200: "bg-muted",
  gray300: "bg-secondary",

  // Text colors
  "text-red": "text-destructive",
  "text-green": "text-success",
  "text-blue": "text-primary",
  "text-yellow": "text-warning",
  "text-black": "text-foreground",
  "text-white": "text-foreground",
  "text-gray": "text-muted-foreground",

  // CSS Variables to Design System
  "var(--modus-wc-color-base-page)": "bg-background",
  "var(--modus-wc-color-base-100)": "bg-card",
  "var(--modus-wc-color-base-200)": "bg-muted",
  "var(--modus-wc-color-base-300)": "bg-secondary",
  "var(--modus-wc-color-base-content)": "text-foreground",
  "var(--modus-wc-color-info)": "bg-primary",
  "var(--modus-wc-color-success)": "bg-success",
  "var(--modus-wc-color-error)": "bg-destructive",
  "var(--modus-wc-color-warning)": "bg-warning",
};

// Files to check
const FILE_PATTERNS = [
  "src/**/*.tsx",
  "src/**/*.ts",
  "src/**/*.jsx",
  "src/**/*.js",
  "src/**/*.css",
  "src/**/*.scss",
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  "node_modules/**",
  "dist/**",
  "build/**",
  "**/*.d.ts",
  "src/index.css", // Exclude index.css as it contains the design system definitions
  "src/pages/ColorPalettePage.tsx", // Exclude color-palette as it demonstrates the color system
];

async function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const violations = [];

  for (const pattern of TAILWIND_COLOR_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split("\n").length;
      const column = match.index - content.lastIndexOf("\n", match.index - 1);

      // Get color suggestion
      const colorName = match[1] || extractColorFromHex(match[0]);
      const suggestion =
        DESIGN_SYSTEM_COLOR_SUGGESTIONS[colorName] ||
        DESIGN_SYSTEM_COLOR_SUGGESTIONS[match[0]] ||
        "bg-primary";

      violations.push({
        file: filePath,
        line,
        column,
        match: match[0],
        suggestion,
        message: `Use design system color instead of "${match[0]}". Consider: ${suggestion}`,
      });
    }

    // Reset regex lastIndex for next iteration
    pattern.lastIndex = 0;
  }

  return violations;
}

function extractColorFromHex(hex) {
  const colorMap = {
    // Basic colors
    "#ff0000": "red",
    "#00ff00": "green",
    "#0000ff": "blue",
    "#ffff00": "yellow",
    "#ffffff": "white",
    "#000000": "black",

    // Modus-specific hex values (these should be replaced with CSS variables)
    "#fff": "white", // Should use: var(--modus-wc-color-base-page)
    "#000": "black", // Should use: var(--modus-wc-color-base-page) [dark theme]
    "#f1f1f6": "gray100", // Should use: var(--modus-wc-color-base-100)
    "#252a2e": "gray100", // Should use: var(--modus-wc-color-base-100) [dark theme]
    "#cbcdd6": "gray200", // Should use: var(--modus-wc-color-base-200)
    "#464b52": "gray200", // Should use: var(--modus-wc-color-base-200) [dark theme]
    "#b7b9c3": "gray300", // Should use: var(--modus-wc-color-base-300)
    "#353a40": "gray300", // Should use: var(--modus-wc-color-base-300) [dark theme]
    "#171c1e": "black", // Should use: var(--modus-wc-color-base-content)
    "#0063a3": "blue", // Should use: var(--modus-wc-color-info)
    "#1e8a44": "green", // Should use: var(--modus-wc-color-success)
    "#da212c": "red", // Should use: var(--modus-wc-color-error)
    "#fbad26": "yellow", // Should use: var(--modus-wc-color-warning)
  };
  return colorMap[hex.toLowerCase()] || "info";
}

async function main() {
  console.log(
    "🎨 Checking for design system color compliance in Vite + React app...\n"
  );

  let allViolations = [];

  try {
    // Get all files to check
    const files = await glob(FILE_PATTERNS, {
      ignore: EXCLUDE_PATTERNS,
      absolute: true,
    });

    // Check each file
    for (const file of files) {
      try {
        const violations = await checkFile(file);
        allViolations = allViolations.concat(violations);
      } catch (error) {
        console.warn(
          `⚠️  Warning: Could not check file ${file}: ${error.message}`
        );
      }
    }

    // Report results
    if (allViolations.length === 0) {
      console.log("✅ All files are using design system colors correctly!");
      process.exit(0);
    } else {
      console.log(`❌ Found ${allViolations.length} color violations:\n`);

      // Group violations by file
      const violationsByFile = allViolations.reduce((acc, violation) => {
        if (!acc[violation.file]) {
          acc[violation.file] = [];
        }
        acc[violation.file].push(violation);
        return acc;
      }, {});

      // Print violations
      for (const [file, violations] of Object.entries(violationsByFile)) {
        const relativePath = path.relative(process.cwd(), file);
        console.log(`📄 ${relativePath}:`);

        for (const violation of violations) {
          console.log(
            `  ${violation.line}:${violation.column} - ${violation.message}`
          );
        }
        console.log();
      }

      console.log("💡 Design System Color Reference (from globals.css):");
      console.log("  Use Tailwind classes with design system colors:");
      console.log(
        "  ✅ Background: bg-background, bg-card, bg-muted, bg-secondary, bg-primary, bg-success, bg-destructive, bg-warning"
      );
      console.log(
        "  ✅ Text: text-foreground, text-primary, text-success, text-destructive, text-warning, text-muted-foreground"
      );
      console.log(
        "  ✅ Borders: Use border utility classes (border-default, border-thick, border-dashed)"
      );
      console.log(
        '  ✅ Component props: color="primary", color="secondary", color="tertiary", color="warning", color="danger"'
      );
      console.log(
        "  📝 Note: Use design system colors instead of CSS variables or hardcoded values"
      );
      console.log(
        "  📖 Documentation: See globals.css for complete color mapping"
      );

      process.exit(1);
    }
  } catch (error) {
    console.error("💥 Error running color check:", error.message);
    process.exit(1);
  }
}

// Run the script
main();
