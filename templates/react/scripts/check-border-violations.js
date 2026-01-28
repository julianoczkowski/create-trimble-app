#!/usr/bin/env node

/**
 * Border Violations Linting Script for Vite + React
 *
 * This script checks for usage of incorrect border patterns that violate
 * Tailwind 3 + Modus design system rules.
 *
 * It flags Tailwind color classes in borders and suggests
 * proper design system color alternatives.
 */

import fs from "fs";
import { glob } from "glob";

// Border violation patterns to detect (Tailwind 3 + Design System)
const BORDER_VIOLATION_PATTERNS = [
  // Border with Tailwind color classes (should use design system colors)
  {
    pattern:
      /className="[^"]*\bborder-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(\d{2,3}|50)\b[^"]*"/g,
    type: "tailwind-border-color",
    description:
      "Tailwind border with color classes (should use design system colors)",
  },

  // Border-t, border-b, border-l, border-r with Tailwind colors
  {
    pattern:
      /className="[^"]*\bborder-[tblr]-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(\d{2,3}|50)\b[^"]*"/g,
    type: "tailwind-border-side-color",
    description:
      "Tailwind directional border with color classes (should use design system)",
    exclude: /border-(?:top|bottom|left|right)-default/,
  },

  // Border with hardcoded colors
  {
    pattern: /className="[^"]*\bborder-[^"]*#[0-9a-fA-F]{3,6}[^"]*"/g,
    type: "hardcoded-border-color",
    description: "Border with hardcoded hex colors (should use design system)",
  },

  // Inline border styles that should use utility classes
  {
    pattern:
      /style=\{\{\s*border:\s*["']1px\s+solid\s+var\(--border\)["']\s*\}\}/g,
    type: "inline-border-style",
    description: "Inline border style should use border-default utility class",
  },

  // Inline border styles with different widths
  {
    pattern:
      /style=\{\{\s*border:\s*["']2px\s+solid\s+var\(--border\)["']\s*\}\}/g,
    type: "inline-border-thick",
    description:
      "Inline thick border style should use border-thick utility class",
  },

  // Inline border styles with dashed
  {
    pattern:
      /style=\{\{\s*border:\s*["']1px\s+dashed\s+var\(--border\)["']\s*\}\}/g,
    type: "inline-border-dashed",
    description:
      "Inline dashed border style should use border-dashed utility class",
  },

  // Inline border styles with thick dashed
  {
    pattern:
      /style=\{\{\s*border:\s*["']2px\s+dashed\s+var\(--border\)["']\s*\}\}/g,
    type: "inline-border-thick-dashed",
    description:
      "Inline thick dashed border style should use border-thick-dashed utility class",
  },

  // Inline border styles for specific sides
  {
    pattern:
      /style=\{\{\s*borderTop:\s*["']1px\s+solid\s+var\(--border\)["']\s*\}\}/g,
    type: "inline-border-top",
    description:
      "Inline top border style should use border-top-default utility class",
  },

  {
    pattern:
      /style=\{\{\s*borderBottom:\s*["']1px\s+solid\s+var\(--border\)["']\s*\}\}/g,
    type: "inline-border-bottom",
    description:
      "Inline bottom border style should use border-bottom-default utility class",
  },

  {
    pattern:
      /style=\{\{\s*borderLeft:\s*["']1px\s+solid\s+var\(--border\)["']\s*\}\}/g,
    type: "inline-border-left",
    description:
      "Inline left border style should use border-left-default utility class",
  },

  {
    pattern:
      /style=\{\{\s*borderRight:\s*["']1px\s+solid\s+var\(--border\)["']\s*\}\}/g,
    type: "inline-border-right",
    description:
      "Inline right border style should use border-right-default utility class",
  },
];

// Correct border patterns (for suggestions) - Now using our new utility classes!
const CORRECT_BORDER_PATTERNS = {
  // Tailwind border violations → Our utility classes
  "border border-border": 'className="border-default"',
  "border-2 border-border": 'className="border-thick-border"',
  "border-4 border-border": 'className="border-thick-border"',
  border: 'className="border-default"',
  "border-2": 'className="border-thick-border"',
  "border-4": 'className="border-thick-border"',
  "border-t border-border": 'className="border-top-default"',
  "border-b border-border": 'className="border-bottom-default"',
  "border-l border-border": 'className="border-left-default"',
  "border-r border-border": 'className="border-right-default"',
  "border-t": 'className="border-top-default"',
  "border-b": 'className="border-bottom-default"',
  "border-l": 'className="border-left-default"',
  "border-r": 'className="border-right-default"',

  // Tailwind color classes → Our design system colors
  "border border-red-500": 'className="border-destructive"',
  "border border-green-500": 'className="border-success"',
  "border border-yellow-500": 'className="border-warning"',
  "border border-blue-500": 'className="border-primary"',
  "border-2 border-red-500": 'className="border-thick-destructive"',
  "border-2 border-green-500": 'className="border-thick-success"',
  "border-2 border-yellow-500": 'className="border-thick-warning"',
  "border-2 border-blue-500": 'className="border-thick-primary"',

  // Inline border styles → Our utility classes
  'style={{ border: "1px solid var(--border)" }}': 'className="border-default"',
  'style={{ border: "2px solid var(--border)" }}':
    'className="border-thick-border"',
  'style={{ border: "1px dashed var(--border)" }}': 'className="border-dashed"',
  'style={{ border: "2px dashed var(--border)" }}':
    'className="border-thick-dashed"',
  'style={{ borderTop: "1px solid var(--border)" }}':
    'className="border-top-default"',
  'style={{ borderBottom: "1px solid var(--border)" }}':
    'className="border-bottom-default"',
  'style={{ borderLeft: "1px solid var(--border)" }}':
    'className="border-left-default"',
  'style={{ borderRight: "1px solid var(--border)" }}':
    'className="border-right-default"',

  // Fallback for any other border patterns
  default: 'className="border-default"',
};

// Files to check
const FILE_PATTERNS = [
  "src/**/*.tsx",
  "src/**/*.ts",
  "src/**/*.jsx",
  "src/**/*.js",
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/*.d.ts",
  "scripts/**",
];

async function findBorderViolations() {
  console.log("🎨 Checking for border violations in Vite + React app...\n");

  let totalViolations = 0;
  const violations = [];

  try {
    // Get all files to check
    const allFiles = [];
    for (const pattern of FILE_PATTERNS) {
      const files = await glob(pattern, { ignore: EXCLUDE_PATTERNS });
      allFiles.push(...files);
    }

    // Remove duplicates
    const uniqueFiles = [...new Set(allFiles)];

    console.log(
      `🔍 Scanning ${uniqueFiles.length} files for border violations...\n`
    );

    for (const filePath of uniqueFiles) {
      if (!fs.existsSync(filePath)) continue;

      const content = fs.readFileSync(filePath, "utf8");
      const fileViolations = [];

      // Check for border violations
      for (const violationRule of BORDER_VIOLATION_PATTERNS) {
        const matches = content.match(violationRule.pattern);
        if (matches) {
          for (const match of matches) {
            // Skip if this match should be excluded (our utility classes)
            if (violationRule.exclude && violationRule.exclude.test(match)) {
              continue;
            }

            const lines = content
              .substring(0, content.indexOf(match))
              .split("\n");
            const lineNumber = lines.length;
            const columnNumber = lines[lines.length - 1].length + 1;

            fileViolations.push({
              line: lineNumber,
              column: columnNumber,
              match: match,
              type: violationRule.type,
              description: violationRule.description,
              suggestion: getSuggestion(match, violationRule.type),
            });
          }
        }
      }

      if (fileViolations.length > 0) {
        violations.push({
          file: filePath,
          violations: fileViolations,
        });
        totalViolations += fileViolations.length;
      }
    }

    if (totalViolations === 0) {
      console.log("✅ All files are using correct border patterns!");
      console.log(
        "📝 Note: Border violations are avoided to ensure design system compliance"
      );
      return;
    }

    // Report violations
    console.log(`❌ Found ${totalViolations} border violation(s):\n`);

    for (const { file, violations: fileViolations } of violations) {
      console.log(`📄 ${file}:`);
      for (const violation of fileViolations) {
        console.log(
          `  ${violation.line}:${violation.column} - ${violation.description}`
        );
        console.log(`  ❌ Found: ${violation.match}`);
        console.log(`  ✅ Use instead: ${violation.suggestion}\n`);
      }
    }

    console.log("🔧 Border Violation Resolution - Use Design System Colors:");
    console.log(
      "  ✅ RECOMMENDED: Use custom border utilities with design system colors"
    );
    console.log('     • border → className="border-default"');
    console.log('     • border-2 → className="border-thick"');
    console.log('     • border-t → className="border-top-default"');
    console.log('     • border-b → className="border-bottom-default"');
    console.log(
      '     • For dashed borders → className="border-dashed" or "border-thick-dashed"'
    );
    console.log("");
    console.log("  🎨 Context-Specific Design System Colors:");
    console.log("     • Success: border-success + border-thick-success");
    console.log("     • Warning: border-warning + border-thick-warning");
    console.log("     • Error: border-destructive + border-thick-destructive");
    console.log("     • Primary: border-primary + border-thick-primary");
    console.log("     • Default: border-default + border-thick-border");
    console.log("");
    console.log("  💡 Benefits of our utility classes:");
    console.log(
      "     • Theme-aware (automatically adapts to light/dark themes)"
    );
    console.log("     • Uses design system colors (var(--border))");
    console.log("     • Linting compliant");
    console.log("     • No inline styles needed");
    console.log("     • Consistent with project patterns");
    console.log("");
    console.log("  ⚠️  Why avoid Tailwind color classes:");
    console.log("     • Tailwind color classes don't use our design system");
    console.log(
      "     • Our utilities are more maintainable and theme-consistent"
    );
    console.log("     • Ensures consistent branding across the application");
    console.log("");
    console.log(
      "  📖 Documentation: See index.css for all available border utilities"
    );

    process.exit(1);
  } catch (error) {
    console.error("❌ Error checking border violations:", error.message);
    process.exit(1);
  }
}

function getSuggestion(violation, violationType) {
  // Check if it's an inline style violation first
  if (violation.includes("style={{")) {
    // Extract the style content
    const styleMatch = violation.match(/style=\{\{([^}]+)\}\}/);
    if (styleMatch) {
      const styleContent = styleMatch[1].trim();

      // Map inline styles to utility classes
      if (styleContent.includes('border: "1px solid var(--border)"')) {
        return CORRECT_BORDER_PATTERNS[
          'style={{ border: "1px solid var(--border)" }}'
        ];
      }
      if (styleContent.includes('border: "2px solid var(--border)"')) {
        return CORRECT_BORDER_PATTERNS[
          'style={{ border: "2px solid var(--border)" }}'
        ];
      }
      if (styleContent.includes('border: "1px dashed var(--border)"')) {
        return CORRECT_BORDER_PATTERNS[
          'style={{ border: "1px dashed var(--border)" }}'
        ];
      }
      if (styleContent.includes('border: "2px dashed var(--border)"')) {
        return CORRECT_BORDER_PATTERNS[
          'style={{ border: "2px dashed var(--border)" }}'
        ];
      }
      if (styleContent.includes('borderTop: "1px solid var(--border)"')) {
        return CORRECT_BORDER_PATTERNS[
          'style={{ borderTop: "1px solid var(--border)" }}'
        ];
      }
      if (styleContent.includes('borderBottom: "1px solid var(--border)"')) {
        return CORRECT_BORDER_PATTERNS[
          'style={{ borderBottom: "1px solid var(--border)" }}'
        ];
      }
      if (styleContent.includes('borderLeft: "1px solid var(--border)"')) {
        return CORRECT_BORDER_PATTERNS[
          'style={{ borderLeft: "1px solid var(--border)" }}'
        ];
      }
      if (styleContent.includes('borderRight: "1px solid var(--border)"')) {
        return CORRECT_BORDER_PATTERNS[
          'style={{ borderRight: "1px solid var(--border)" }}'
        ];
      }
    }
  }

  // Extract the border classes from the className attribute
  const classNameMatch = violation.match(/className="([^"]*)"/);
  if (!classNameMatch) return CORRECT_BORDER_PATTERNS.default;

  const classNames = classNameMatch[1];

  // Map common patterns to our utility classes
  if (classNames.includes("border border-border")) {
    return CORRECT_BORDER_PATTERNS["border border-border"];
  }
  if (
    classNames.includes("border-2 border-border") ||
    classNames.includes("border-2")
  ) {
    return CORRECT_BORDER_PATTERNS["border-2"];
  }
  if (
    classNames.includes("border-t border-border") ||
    classNames.includes("border-t")
  ) {
    return CORRECT_BORDER_PATTERNS["border-t"];
  }
  if (
    classNames.includes("border-b border-border") ||
    classNames.includes("border-b")
  ) {
    return CORRECT_BORDER_PATTERNS["border-b"];
  }
  if (
    classNames.includes("border-l border-border") ||
    classNames.includes("border-l")
  ) {
    return CORRECT_BORDER_PATTERNS["border-l"];
  }
  if (
    classNames.includes("border-r border-border") ||
    classNames.includes("border-r")
  ) {
    return CORRECT_BORDER_PATTERNS["border-r"];
  }
  if (classNames.includes("border-4")) {
    return CORRECT_BORDER_PATTERNS["border-4"];
  }

  // Handle Tailwind color classes with our design system colors
  if (classNames.includes("border border-red-500")) {
    return CORRECT_BORDER_PATTERNS["border border-red-500"];
  }
  if (classNames.includes("border border-green-500")) {
    return CORRECT_BORDER_PATTERNS["border border-green-500"];
  }
  if (classNames.includes("border border-yellow-500")) {
    return CORRECT_BORDER_PATTERNS["border border-yellow-500"];
  }
  if (classNames.includes("border border-blue-500")) {
    return CORRECT_BORDER_PATTERNS["border border-blue-500"];
  }
  if (classNames.includes("border-2 border-red-500")) {
    return CORRECT_BORDER_PATTERNS["border-2 border-red-500"];
  }
  if (classNames.includes("border-2 border-green-500")) {
    return CORRECT_BORDER_PATTERNS["border-2 border-green-500"];
  }
  if (classNames.includes("border-2 border-yellow-500")) {
    return CORRECT_BORDER_PATTERNS["border-2 border-yellow-500"];
  }
  if (classNames.includes("border-2 border-blue-500")) {
    return CORRECT_BORDER_PATTERNS["border-2 border-blue-500"];
  }

  if (classNames.includes("border ") || classNames.endsWith("border")) {
    return CORRECT_BORDER_PATTERNS["border"];
  }

  // Default suggestion based on violation type
  switch (violationType) {
    case "tailwind-border-border":
    case "tailwind-border-alone":
      return CORRECT_BORDER_PATTERNS["border"];
    case "tailwind-border-width":
      return CORRECT_BORDER_PATTERNS["border-2"];
    case "tailwind-border-side":
      return CORRECT_BORDER_PATTERNS["border-b"]; // Most common side border
    case "inline-border-style":
      return CORRECT_BORDER_PATTERNS[
        'style={{ border: "1px solid var(--border)" }}'
      ];
    case "inline-border-thick":
      return CORRECT_BORDER_PATTERNS[
        'style={{ border: "2px solid var(--border)" }}'
      ];
    case "inline-border-dashed":
      return CORRECT_BORDER_PATTERNS[
        'style={{ border: "1px dashed var(--border)" }}'
      ];
    case "inline-border-thick-dashed":
      return CORRECT_BORDER_PATTERNS[
        'style={{ border: "2px dashed var(--border)" }}'
      ];
    case "inline-border-top":
      return CORRECT_BORDER_PATTERNS[
        'style={{ borderTop: "1px solid var(--border)" }}'
      ];
    case "inline-border-bottom":
      return CORRECT_BORDER_PATTERNS[
        'style={{ borderBottom: "1px solid var(--border)" }}'
      ];
    case "inline-border-left":
      return CORRECT_BORDER_PATTERNS[
        'style={{ borderLeft: "1px solid var(--border)" }}'
      ];
    case "inline-border-right":
      return CORRECT_BORDER_PATTERNS[
        'style={{ borderRight: "1px solid var(--border)" }}'
      ];
    default:
      return CORRECT_BORDER_PATTERNS.default;
  }
}

// Run the check
findBorderViolations();
