#!/usr/bin/env node

/**
 * Modus Icons Linting Script for Vite + React
 *
 * This script checks for usage of non-Modus icon patterns in React/Vite files
 * to ensure design system consistency and proper Modus Icons usage.
 *
 * It flags common non-Modus icon patterns and suggests Modus alternatives.
 */

import fs from "fs";
import path from "path";
import { glob } from "glob";

// Non-Modus icon patterns to detect
const NON_MODUS_ICON_PATTERNS = [
  // Font Awesome icons (specific patterns)
  /\b(fa|fas|far|fab|fal|fad|fat)-[a-zA-Z0-9-]+\b/g,

  // Material Icons (specific patterns)
  /\bmaterial-icons\b/g,
  /\bmaterial-symbols\b/g,

  // Heroicons (specific patterns)
  /\bheroicons\b/g,

  // Lucide icons (specific patterns)
  /\blucide\b/g,
  /\blucide-react\b/g,

  // React Icons (specific imports)
  /\bfrom ['"]react-icons\b/g,
  /\bfrom ['"]@heroicons\b/g,
  /\bfrom ['"]lucide-react\b/g,

  // Common icon libraries (specific imports)
  /\b@ant-design\/icons\b/g,
  /\b@mui\/icons-material\b/g,
  /\b@tabler\/icons\b/g,
  /\b@phosphor-icons\b/g,

  // SVG icon patterns (non-Modus) - only if they're not Modus
  /<svg[^>]*class="[^"]*icon[^"]*"[^>]*>/g,
  /<svg[^>]*className="[^"]*icon[^"]*"[^>]*>/g,

  // Icon components (non-Modus) - exclude ModusIcon
  /<Icon[^>]*>/g,
  /<Icons[^>]*>/g,
  /<IconButton[^>]*>/g,

  // Common icon imports (exclude ModusIcon)
  /import.*Icon.*from(?!.*ModusIcon)/g,
  /import.*Icons.*from/g,
  /import.*@heroicons/g,
  /import.*@lucide/g,
  /import.*react-icons/g,
  /import.*@ant-design\/icons/g,
  /import.*@mui\/icons-material/g,
];

// Modus Icons patterns (these are GOOD)
const MODUS_ICON_PATTERNS = [
  /<i className="modus-icons"[^>]*>/g,
  /className="modus-icons"/g,
  /@trimble-oss\/modus-icons/g,
  /modus-icons\.css/g,
];

// Files to check
const FILE_PATTERNS = [
  "src/**/*.tsx",
  "src/**/*.ts",
  "src/**/*.jsx",
  "src/**/*.js",
  "src/**/*.css",
  "src/**/*.scss",
  "*.tsx",
  "*.ts",
  "*.js",
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  "node_modules/**",
  "dist/**",
  "build/**",
  "**/*.d.ts",
  "scripts/**",
];

async function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const violations = [];
  const modusIconsFound = [];

  // Check for Modus Icons usage (good patterns)
  for (const pattern of MODUS_ICON_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split("\n").length;
      modusIconsFound.push({
        file: filePath,
        line,
        match: match[0],
        type: "modus-icon",
      });
    }
    pattern.lastIndex = 0;
  }

  // Check for non-Modus icon patterns (violations)
  for (const pattern of NON_MODUS_ICON_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split("\n").length;
      const column = match.index - content.lastIndexOf("\n", match.index - 1);

      // Skip if it's a legitimate Modus pattern or legitimate component/import
      const matchText = match[0];
      if (
        matchText.includes("ModusIcon") ||
        matchText.includes("ModusWcIcon") ||
        matchText.includes("modus-icons") ||
        (matchText.includes("icon-light") && content.includes("modus-icons")) ||
        (matchText.includes("icon-dark") && content.includes("modus-icons")) ||
        (matchText.includes("icon-alert") && content.includes("modus-icons")) ||
        (matchText.includes("icon-demo") && content.includes("modus-icons")) ||
        // Skip legitimate component names and imports
        matchText.includes("IconsPage") ||
        matchText.includes("modusIcons") ||
        matchText.includes("totalIconCount") ||
        matchText.includes("categoryCount") ||
        // Skip legitimate import patterns
        (matchText.includes("import") &&
          (matchText.includes("IconsPage") ||
            matchText.includes("modusIcons") ||
            matchText.includes("totalIconCount") ||
            matchText.includes("categoryCount") ||
            (matchText.includes("from") &&
              (matchText.includes("./pages/IconsPage") ||
                matchText.includes("../pages/IconsPage") ||
                matchText.includes("./data/modusIcons") ||
                matchText.includes("../data/modusIcons"))))) ||
        // Skip legitimate JSX component usage
        (matchText.includes("<") &&
          matchText.includes(">") &&
          (matchText.includes("IconsPage") ||
            matchText.includes("modusIcons") ||
            matchText.includes("totalIconCount") ||
            matchText.includes("categoryCount")))
      ) {
        continue;
      }

      violations.push({
        file: filePath,
        line,
        column,
        match: match[0],
        message: `Non-Modus icon pattern detected: "${match[0]}". Use Modus Icons instead.`,
        suggestion: 'Replace with <i className="modus-icons">icon_name</i>',
      });
    }
    pattern.lastIndex = 0;
  }

  return { violations, modusIconsFound };
}

async function main() {
  console.log("🎨 Checking for Modus Icons usage in Vite + React app...\n");

  let allViolations = [];
  let allModusIcons = [];

  try {
    // Get all files to check
    const files = await glob(FILE_PATTERNS, {
      ignore: EXCLUDE_PATTERNS,
      absolute: true,
    });

    // Check each file
    for (const file of files) {
      try {
        const { violations, modusIconsFound } = await checkFile(file);
        allViolations = allViolations.concat(violations);
        allModusIcons = allModusIcons.concat(modusIconsFound);
      } catch (error) {
        console.warn(
          `⚠️  Warning: Could not check file ${file}: ${error.message}`
        );
      }
    }

    // Report results
    if (allViolations.length === 0) {
      console.log("✅ All files are using Modus Icons correctly!");
      console.log(
        `📊 Found ${allModusIcons.length} proper Modus Icons usage(s)`
      );
      process.exit(0);
    } else {
      console.log(
        `❌ Found ${allViolations.length} non-Modus icon violations:\n`
      );

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
          console.log(`    💡 Suggestion: ${violation.suggestion}`);
        }
        console.log();
      }

      console.log("💡 Modus Icons Reference:");
      console.log(
        '  ✅ Correct usage: <i className="modus-icons">icon_name</i>'
      );
      console.log(
        '  ✅ Import in globals.css: @import url("https://cdn.jsdelivr.net/npm/@trimble-oss/modus-icons@1.17.0/dist/field-systems/fonts/modus-icons.css");'
      );
      console.log(
        "  📚 Icon Catalog: https://modus-icons.trimble.com/field-systems/"
      );
      console.log("  🎨 Available Icons: 623 Field Systems icons");
      console.log(
        "  📖 Documentation: https://trimble-oss.github.io/modus-wc-2.0/main/"
      );

      process.exit(1);
    }
  } catch (error) {
    console.error("💥 Error running icon check:", error.message);
    process.exit(1);
  }
}

// Run the script
main();
