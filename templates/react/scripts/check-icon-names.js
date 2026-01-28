#!/usr/bin/env node

/**
 * Modus Icon Names Validation Script for Vite + React
 *
 * This script validates that all Modus icon names used in the codebase
 * are correct and exist in the official Modus Icons list.
 *
 * It checks for typos, invalid names, and suggests corrections.
 */

import fs from "fs";
import path from "path";
import { glob } from "glob";

// Read and parse the Modus icons data from TypeScript file
const iconsContent = fs.readFileSync(
  path.join(process.cwd(), "src/data/modusIcons.ts"),
  "utf8"
);

// Extract the modusIcons object using regex
const modusIconsMatch = iconsContent.match(
  /export const modusIcons = ({[\s\S]*?});/
);
if (!modusIconsMatch) {
  console.error("Could not extract modusIcons object from TypeScript file");
  process.exit(1);
}

// Evaluate the modusIcons object (safe since we control the content)
const modusIcons = eval(`(${modusIconsMatch[1]})`);

// Flatten all icons for easy access
const allModusIcons = Object.values(modusIcons).flat();

// File patterns to check
const FILE_PATTERNS = [
  "src/**/*.{ts,tsx,js,jsx}",
  "src/**/*.css",
  "src/**/*.scss",
  "src/**/*.sass",
  "src/**/*.less",
];

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

// Icon usage patterns to detect
const ICON_USAGE_PATTERNS = [
  // ModusIcon component usage
  /<ModusIcon[^>]*name=["']([^"']+)["'][^>]*>/g,

  // Direct icon class usage - only match content between <i> tags with modus-icons class
  /<i[^>]*class=["'][^"']*modus-icons[^"']*["'][^>]*>([^<]+)<\/i>/g,
  /<i[^>]*className=["'][^"']*modus-icons[^"']*["'][^>]*>([^<]+)<\/i>/g,

  // Icon in string literals - only for specific icon-related attributes
  /icon=["']([a-zA-Z0-9_-]+)["']/g,
  /iconName=["']([a-zA-Z0-9_-]+)["']/g,
  /startIcon=["']([a-zA-Z0-9_-]+)["']/g,
  /endIcon=["']([a-zA-Z0-9_-]+)["']/g,

  // ModusButton and other Modus component icon attributes
  /<ModusButton[^>]*icon=["']([^"']+)["'][^>]*>/g,
  /<ModusCard[^>]*icon=["']([^"']+)["'][^>]*>/g,
  /<ModusChip[^>]*icon=["']([^"']+)["'][^>]*>/g,
  /<ModusAlert[^>]*icon=["']([^"']+)["'][^>]*>/g,
  /<ModusTooltip[^>]*icon=["']([^"']+)["'][^>]*>/g,

  // Icon in template literals - only if they're likely icon names
  /`([a-zA-Z0-9_-]+)`(?=.*modus-icons)/g,
];

/**
 * Find similar icon names using Levenshtein distance
 */
function findSimilarIcons(iconName, maxDistance = 2) {
  const similar = [];

  for (const validIcon of allModusIcons) {
    const distance = levenshteinDistance(
      iconName.toLowerCase(),
      validIcon.toLowerCase()
    );

    // Only include if distance is reasonable and the icon name is meaningful
    if (distance <= maxDistance && distance > 0) {
      // Filter out very short matches that are likely meaningless
      if (validIcon.length >= 3 && iconName.length >= 3) {
        similar.push({
          name: validIcon,
          distance: distance,
        });
      }
    }
  }

  return similar.sort((a, b) => a.distance - b.distance).slice(0, 5);
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Find icon by partial name match
 */
function findIconByPartial(iconName) {
  // Only search for partial matches if the input is meaningful
  if (iconName.length < 3) {
    return [];
  }

  const partialMatches = allModusIcons.filter((icon) => {
    // Only include icons that are at least 3 characters long
    if (icon.length < 3) return false;

    // Check if the icon name contains the search term or vice versa
    const iconLower = icon.toLowerCase();
    const searchLower = iconName.toLowerCase();

    return iconLower.includes(searchLower) || searchLower.includes(iconLower);
  });

  // Sort by relevance (exact substring matches first, then by length)
  return partialMatches
    .sort((a, b) => {
      const aExact = a.toLowerCase().includes(iconName.toLowerCase());
      const bExact = b.toLowerCase().includes(iconName.toLowerCase());

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      return a.length - b.length;
    })
    .slice(0, 5);
}

/**
 * Get icon category
 */
function getIconCategory(iconName) {
  for (const [category, icons] of Object.entries(modusIcons)) {
    if (icons.includes(iconName)) {
      return category;
    }
  }
  return null;
}

/**
 * Check a single file for icon name violations
 */
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const violations = [];

  for (const pattern of ICON_USAGE_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const iconName = match[1];

      // Skip if it's not a potential icon name (too short, contains spaces, etc.)
      if (
        iconName.length < 2 ||
        iconName.includes(" ") ||
        iconName.includes("\n") ||
        iconName.includes("\t")
      ) {
        continue;
      }

      // Skip common non-icon words that might be caught by the regex
      const commonWords = [
        "description",
        "title",
        "content",
        "text",
        "label",
        "value",
        "name",
        "id",
        "class",
        "type",
        "src",
        "alt",
        "href",
        "target",
        "rel",
        "style",
        "width",
        "height",
        "size",
        "onClick",
        "onChange",
        "onSubmit",
        "onFocus",
        "onBlur",
        "onMouseOver",
        "onMouseOut",
        "className",
        "htmlFor",
        "ariaLabel",
        "ariaDescribedBy",
        "role",
        "tabIndex",
        "true",
        "false",
        "null",
        "undefined",
        "this",
        "that",
        "here",
        "there",
        "where",
        "and",
        "or",
        "but",
        "the",
        "a",
        "an",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "have",
        "has",
        "had",
        "do",
        "does",
        "did",
        "will",
        "would",
        "could",
        "should",
        "get",
        "set",
        "put",
        "take",
        "make",
        "go",
        "come",
        "see",
        "look",
        "find",
        "use",
        "used",
        "using",
        "new",
        "old",
        "good",
        "bad",
        "big",
        "small",
        "long",
        "short",
      ];

      if (commonWords.includes(iconName.toLowerCase())) {
        continue;
      }

      // Check if the icon name exists in the official list
      if (!allModusIcons.includes(iconName)) {
        const lines = content.substring(0, match.index).split("\n");
        const lineNumber = lines.length;
        const columnNumber = lines[lines.length - 1].length + 1;

        // Find similar icons
        const similarIcons = findSimilarIcons(iconName);
        const partialMatches = findIconByPartial(iconName);

        violations.push({
          file: filePath,
          line: lineNumber,
          column: columnNumber,
          iconName: iconName,
          match: match[0],
          similarIcons: similarIcons,
          partialMatches: partialMatches,
        });
      }
    }
  }

  return violations;
}

/**
 * Format violation for display
 */
function formatViolation(violation) {
  const { file, line, column, iconName, similarIcons, partialMatches } =
    violation;
  const relativePath = path.relative(process.cwd(), file);

  let suggestions = [];

  if (similarIcons.length > 0) {
    suggestions.push(
      `Did you mean: ${colors.green}${similarIcons
        .map((s) => s.name)
        .join(", ")}${colors.reset}`
    );
  }

  if (partialMatches.length > 0) {
    suggestions.push(
      `Similar icons: ${colors.cyan}${partialMatches.join(", ")}${colors.reset}`
    );
  }

  return {
    location: `${relativePath}:${line}:${column}`,
    message: `Invalid Modus icon name: ${colors.red}${iconName}${colors.reset}`,
    suggestions: suggestions,
    explanation: `The icon "${iconName}" is not found in the official Modus Icons list.`,
  };
}

/**
 * Main function
 */
async function main() {
  console.log(
    `${colors.bold}${colors.blue}🔍 Validating Modus icon names...${colors.reset}\n`
  );

  const allFiles = await glob(FILE_PATTERNS, { cwd: process.cwd() });
  let totalViolations = 0;
  const violationsByFile = {};

  // Check each file
  for (const file of allFiles) {
    const violations = checkFile(file);
    if (violations.length > 0) {
      violationsByFile[file] = violations;
      totalViolations += violations.length;
    }
  }

  // Display results
  if (totalViolations === 0) {
    console.log(
      `${colors.green}✅ All Modus icon names are valid!${colors.reset}`
    );
    console.log(
      `${colors.dim}Found ${allModusIcons.length} valid Modus icons across ${
        Object.keys(modusIcons).length
      } categories.${colors.reset}\n`
    );
    process.exit(0);
  }

  console.log(
    `${colors.red}❌ Found ${totalViolations} invalid Modus icon name${
      totalViolations === 1 ? "" : "s"
    }:${colors.reset}\n`
  );

  // Group violations by file
  for (const [file, violations] of Object.entries(violationsByFile)) {
    const relativePath = path.relative(process.cwd(), file);
    console.log(
      `${colors.bold}${colors.cyan}📁 ${relativePath}${colors.reset}`
    );

    for (const violation of violations) {
      const formatted = formatViolation(violation);
      console.log(`  ${colors.dim}${formatted.location}${colors.reset}`);
      console.log(`  ${formatted.message}`);
      if (formatted.suggestions.length > 0) {
        formatted.suggestions.forEach((suggestion) => {
          console.log(`  ${suggestion}`);
        });
      }
      console.log(`  ${colors.dim}${formatted.explanation}${colors.reset}\n`);
    }
  }

  // Summary and help
  console.log(`${colors.bold}${colors.yellow}📋 Summary:${colors.reset}`);
  console.log(
    `• Total violations: ${colors.red}${totalViolations}${colors.reset}`
  );
  console.log(
    `• Files affected: ${colors.red}${Object.keys(violationsByFile).length}${
      colors.reset
    }`
  );
  console.log(
    `• Valid icons available: ${colors.green}${allModusIcons.length}${colors.reset}\n`
  );

  console.log(`${colors.bold}${colors.blue}💡 How to fix:${colors.reset}`);
  console.log(`• Check the icon name spelling and case`);
  console.log(`• Use the suggestions provided above`);
  console.log(
    `• Browse available icons at: ${colors.cyan}src/data/modusIcons.ts${colors.reset}`
  );
  console.log(
    `• See .cursor/rules/modus-icon-names.mdc for the complete list\n`
  );

  console.log(
    `${colors.bold}${colors.magenta}🔧 Available commands:${colors.reset}`
  );
  console.log(
    `• ${colors.cyan}npm run lint:icon-names${colors.reset} - Run this check`
  );
  console.log(
    `• ${colors.cyan}npm run lint:all${colors.reset} - Run all linting checks\n`
  );

  // Show some popular icon categories
  console.log(
    `${colors.bold}${colors.blue}📚 Popular Icon Categories:${colors.reset}`
  );
  const popularCategories = [
    "Navigation & UI",
    "Actions & Operations",
    "Status & Feedback",
    "Files & Documents",
  ];

  popularCategories.forEach((category) => {
    const count = modusIcons[category]?.length || 0;
    console.log(`• ${colors.cyan}${category}${colors.reset}: ${count} icons`);
  });
  console.log();

  process.exit(1);
}

// Run the script
main().catch((error) => {
  console.error(
    `${colors.red}❌ Error running icon names validation:${colors.reset}`
  );
  console.error(error);
  process.exit(1);
});
