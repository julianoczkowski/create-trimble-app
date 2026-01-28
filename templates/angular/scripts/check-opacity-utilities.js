#!/usr/bin/env node

/**
 * Modus Opacity Utilities Linting Script for Angular + Tailwind v4
 *
 * This script checks for usage of Tailwind opacity syntax (e.g., /80) with design system colors
 * and suggests using our custom opacity utilities instead.
 *
 * It flags patterns like `text-foreground/80` and suggests `text-foreground-80`.
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { glob } = require('glob');

// Tailwind opacity patterns to detect (with design system colors)
const TAILWIND_OPACITY_PATTERNS = [
  // Text opacity patterns
  /\btext-(foreground|muted-foreground|primary|secondary|error|warning|success|card-foreground)\/(\d{2,3}|10|20|30|40|50|60|70|80|90|95)\b/g,

  // Background opacity patterns
  /\bbg-(background|foreground|card|primary|secondary|muted|error|warning|success)\/(\d{2,3}|10|20|30|40|50|60|70|80|90|95)\b/g,

  // Border opacity patterns
  /\bborder-(foreground|primary|secondary|error|warning|success|border)\/(\d{2,3}|10|20|30|40|50|60|70|80|90|95)\b/g,
];

// Design System Opacity Utility Suggestions
const OPACITY_UTILITY_SUGGESTIONS = {
  // Text utilities
  'text-foreground': {
    10: 'text-foreground-20',
    20: 'text-foreground-20',
    30: 'text-foreground-40',
    40: 'text-foreground-40',
    50: 'text-foreground-60',
    60: 'text-foreground-60',
    70: 'text-foreground-80',
    80: 'text-foreground-80',
    90: 'text-foreground-80',
    95: 'text-foreground-80',
  },
  'text-muted-foreground': {
    10: 'text-muted-foreground-20',
    20: 'text-muted-foreground-20',
    30: 'text-muted-foreground-40',
    40: 'text-muted-foreground-40',
    50: 'text-muted-foreground-60',
    60: 'text-muted-foreground-60',
    70: 'text-muted-foreground-80',
    80: 'text-muted-foreground-80',
    90: 'text-muted-foreground-80',
    95: 'text-muted-foreground-80',
  },
  'text-primary': {
    10: 'text-primary-20',
    20: 'text-primary-20',
    30: 'text-primary-40',
    40: 'text-primary-40',
    50: 'text-primary-60',
    60: 'text-primary-60',
    70: 'text-primary-80',
    80: 'text-primary-80',
    90: 'text-primary-80',
    95: 'text-primary-80',
  },
  'text-secondary': {
    10: 'text-secondary-20',
    20: 'text-secondary-20',
    30: 'text-secondary-40',
    40: 'text-secondary-40',
    50: 'text-secondary-60',
    60: 'text-secondary-60',
    70: 'text-secondary-80',
    80: 'text-secondary-80',
    90: 'text-secondary-80',
    95: 'text-secondary-80',
  },
  'text-error': {
    10: 'text-error-20',
    20: 'text-error-20',
    30: 'text-error-40',
    40: 'text-error-40',
    50: 'text-error-60',
    60: 'text-error-60',
    70: 'text-error-80',
    80: 'text-error-80',
    90: 'text-error-80',
    95: 'text-error-80',
  },
  'text-warning': {
    10: 'text-warning-20',
    20: 'text-warning-20',
    30: 'text-warning-40',
    40: 'text-warning-40',
    50: 'text-warning-60',
    60: 'text-warning-60',
    70: 'text-warning-80',
    80: 'text-warning-80',
    90: 'text-warning-80',
    95: 'text-warning-80',
  },
  'text-success': {
    10: 'text-success-20',
    20: 'text-success-20',
    30: 'text-success-40',
    40: 'text-success-40',
    50: 'text-success-60',
    60: 'text-success-60',
    70: 'text-success-80',
    80: 'text-success-80',
    90: 'text-success-80',
    95: 'text-success-80',
  },
  // Background utilities
  'bg-foreground': {
    10: 'bg-foreground-20',
    20: 'bg-foreground-20',
    30: 'bg-foreground-40',
    40: 'bg-foreground-40',
    50: 'bg-foreground-60',
    60: 'bg-foreground-60',
    70: 'bg-foreground-80',
    80: 'bg-foreground-80',
    90: 'bg-foreground-80',
    95: 'bg-foreground-80',
  },
  'bg-primary': {
    10: 'bg-primary-20',
    20: 'bg-primary-20',
    30: 'bg-primary-40',
    40: 'bg-primary-40',
    50: 'bg-primary-60',
    60: 'bg-primary-60',
    70: 'bg-primary-80',
    80: 'bg-primary-80',
    90: 'bg-primary-80',
    95: 'bg-primary-80',
  },
  'bg-secondary': {
    10: 'bg-secondary-20',
    20: 'bg-secondary-20',
    30: 'bg-secondary-40',
    40: 'bg-secondary-40',
    50: 'bg-secondary-60',
    60: 'bg-secondary-60',
    70: 'bg-secondary-80',
    80: 'bg-secondary-80',
    90: 'bg-secondary-80',
    95: 'bg-secondary-80',
  },
  'bg-error': {
    10: 'bg-error-20',
    20: 'bg-error-20',
    30: 'bg-error-40',
    40: 'bg-error-40',
    50: 'bg-error-60',
    60: 'bg-error-60',
    70: 'bg-error-80',
    80: 'bg-error-80',
    90: 'bg-error-80',
    95: 'bg-error-80',
  },
  'bg-warning': {
    10: 'bg-warning-20',
    20: 'bg-warning-20',
    30: 'bg-warning-40',
    40: 'bg-warning-40',
    50: 'bg-warning-60',
    60: 'bg-warning-60',
    70: 'bg-warning-80',
    80: 'bg-warning-80',
    90: 'bg-warning-80',
    95: 'bg-warning-80',
  },
  'bg-success': {
    10: 'bg-success-20',
    20: 'bg-success-20',
    30: 'bg-success-40',
    40: 'bg-success-40',
    50: 'bg-success-60',
    60: 'bg-success-60',
    70: 'bg-success-80',
    80: 'bg-success-80',
    90: 'bg-success-80',
    95: 'bg-success-80',
  },
  // Border utilities
  'border-foreground': {
    10: 'border-foreground-20',
    20: 'border-foreground-20',
    30: 'border-foreground-40',
    40: 'border-foreground-40',
    50: 'border-foreground-60',
    60: 'border-foreground-60',
    70: 'border-foreground-80',
    80: 'border-foreground-80',
    90: 'border-foreground-80',
    95: 'border-foreground-80',
  },
  'border-primary': {
    10: 'border-primary-20',
    20: 'border-primary-20',
    30: 'border-primary-40',
    40: 'border-primary-40',
    50: 'border-primary-60',
    60: 'border-primary-60',
    70: 'border-primary-80',
    80: 'border-primary-80',
    90: 'border-primary-80',
    95: 'border-primary-80',
  },
  'border-error': {
    10: 'border-error-20',
    20: 'border-error-20',
    30: 'border-error-40',
    40: 'border-error-40',
    50: 'border-error-60',
    60: 'border-error-60',
    70: 'border-error-80',
    80: 'border-error-80',
    90: 'border-error-80',
    95: 'border-error-80',
  },
  'border-warning': {
    10: 'border-warning-20',
    20: 'border-warning-20',
    30: 'border-warning-40',
    40: 'border-warning-40',
    50: 'border-warning-60',
    60: 'border-warning-60',
    70: 'border-warning-80',
    80: 'border-warning-80',
    90: 'border-warning-80',
    95: 'border-warning-80',
  },
  'border-success': {
    10: 'border-success-20',
    20: 'border-success-20',
    30: 'border-success-40',
    40: 'border-success-40',
    50: 'border-success-60',
    60: 'border-success-60',
    70: 'border-success-80',
    80: 'border-success-80',
    90: 'border-success-80',
    95: 'border-success-80',
  },
};

// File patterns to check
const FILE_PATTERNS = ['src/**/*.{ts,html}', 'src/**/*.css', 'src/**/*.scss'];

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

/**
 * Gets a suggestion for replacing a Tailwind opacity pattern with a custom utility.
 */
function getSuggestion(match) {
  // Extract the full class name (e.g., "text-foreground/80")
  const fullMatch = match[0];

  // Extract the base class and opacity (e.g., "text-foreground" and "80")
  const matchResult = fullMatch.match(/^(\w+-\w+)\/(\d+)$/);
  if (!matchResult) return null;

  const [, baseClass, opacity] = matchResult;
  if (!baseClass || !opacity) return null;

  const suggestions = OPACITY_UTILITY_SUGGESTIONS[baseClass];
  if (!suggestions) return null;

  const suggestedClass = suggestions[opacity];
  if (!suggestedClass) return null;

  return {
    original: fullMatch,
    suggested: suggestedClass,
    colorName: baseClass,
    opacity: parseInt(opacity),
  };
}

/**
 * Checks a single file for Tailwind opacity syntax violations.
 */
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  for (const pattern of TAILWIND_OPACITY_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const suggestion = getSuggestion(match);
      if (suggestion) {
        const lines = content.substring(0, match.index).split('\n');
        const lineNumber = lines.length;
        const columnNumber = lines[lines.length - 1].length + 1;

        violations.push({
          file: filePath,
          line: lineNumber,
          column: columnNumber,
          match: match[0],
          suggestion: suggestion,
        });
      }
    }
    pattern.lastIndex = 0;
  }

  return violations;
}

/**
 * Formats a violation object for display in the console output.
 */
function formatViolation(violation) {
  const { file, line, column, match, suggestion } = violation;
  const relativePath = path.relative(process.cwd(), file);

  return {
    location: `${relativePath}:${line}:${column}`,
    message: `Found Tailwind opacity syntax: ${colors.yellow}${match}${colors.reset}`,
    suggestion: `Use custom opacity utility: ${colors.green}${suggestion.suggested}${colors.reset}`,
    explanation: `Tailwind /${suggestion.opacity} syntax doesn't work with CSS variables. Use our custom opacity utilities instead.`,
  };
}

/**
 * Main function that orchestrates the opacity utility checking process.
 */
async function main() {
  console.log(
    `${colors.bold}${colors.blue}🔍 Checking for Tailwind opacity syntax violations...${colors.reset}\n`
  );

  const allFiles = [];
  for (const pattern of FILE_PATTERNS) {
    const files = glob.sync(pattern, { cwd: process.cwd() });
    allFiles.push(...files);
  }
  const uniqueFiles = [...new Set(allFiles)];
  let totalViolations = 0;
  const violationsByFile = {};

  // Check each file
  for (const file of uniqueFiles) {
    const violations = checkFile(file);
    if (violations.length > 0) {
      violationsByFile[file] = violations;
      totalViolations += violations.length;
    }
  }

  // Display results
  if (totalViolations === 0) {
    console.log(`${colors.green}✅ No Tailwind opacity syntax violations found!${colors.reset}`);
    console.log(
      `${colors.dim}All design system colors are using custom opacity utilities.${colors.reset}\n`
    );
    process.exit(0);
  }

  console.log(
    `${colors.red}❌ Found ${totalViolations} Tailwind opacity syntax violation${
      totalViolations === 1 ? '' : 's'
    }:${colors.reset}\n`
  );

  // Group violations by file
  for (const [file, violations] of Object.entries(violationsByFile)) {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`${colors.bold}${colors.cyan}📁 ${relativePath}${colors.reset}`);

    for (const violation of violations) {
      const formatted = formatViolation(violation);
      console.log(`  ${colors.dim}${formatted.location}${colors.reset}`);
      console.log(`  ${formatted.message}`);
      console.log(`  ${formatted.suggestion}`);
      console.log(`  ${colors.dim}${formatted.explanation}${colors.reset}\n`);
    }
  }

  // Summary and help
  console.log(`${colors.bold}${colors.yellow}📋 Summary:${colors.reset}`);
  console.log(`• Total violations: ${colors.red}${totalViolations}${colors.reset}`);
  console.log(
    `• Files affected: ${colors.red}${Object.keys(violationsByFile).length}${colors.reset}\n`
  );

  console.log(`${colors.bold}${colors.blue}💡 How to fix:${colors.reset}`);
  console.log(
    `• Replace Tailwind opacity syntax (e.g., text-foreground/80) with custom utilities (e.g., text-foreground-80)`
  );
  console.log(`• Available opacity levels: 20, 40, 60, 80`);
  console.log(`• Available utilities: text-*, bg-*, border-*`);
  console.log(`• See docs/angular-design-system.mdc for detailed usage patterns\n`);

  console.log(`${colors.bold}${colors.magenta}🔧 Available commands:${colors.reset}`);
  console.log(`• ${colors.cyan}npm run lint:opacity${colors.reset} - Run this check`);
  console.log(`• ${colors.cyan}npm run lint:all${colors.reset} - Run all linting checks\n`);

  process.exit(1);
}

// Run the script
main().catch((error) => {
  console.error(`${colors.red}❌ Error running opacity utilities check:${colors.reset}`);
  console.error(error);
  process.exit(1);
});
