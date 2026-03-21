#!/usr/bin/env node

/**
 * Inline Styles Linting Script for Vite + React
 *
 * This script checks for usage of inline styles that should be replaced with Tailwind classes
 * to ensure design system consistency and proper styling patterns.
 *
 * It flags common inline style patterns and suggests Tailwind alternatives.
 *
 * EXCEPTIONS: Border-related styles are allowed due to Tailwind v4 + Modus conflicts.
 * However, inline border styles should be replaced with our border utility classes.
 */

import fs from "fs";
import path from "path";
import { glob } from "glob";

// Inline style patterns to detect (excluding border-related styles)
const INLINE_STYLE_PATTERNS = [
  // Background colors
  /style=\{[^}]*backgroundColor[^}]*\}/g,
  /style=\{[^}]*background[^}]*\}/g,

  // Text colors
  /style=\{[^}]*color[^}]*\}/g,

  // CSS Variables (should use design system colors instead)
  /style=\{[^}]*var\(--[^}]*\}/g,

  // Spacing (margins, padding)
  /style=\{[^}]*margin[^}]*\}/g,
  /style=\{[^}]*padding[^}]*\}/g,

  // Typography
  /style=\{[^}]*fontSize[^}]*\}/g,
  /style=\{[^}]*fontWeight[^}]*\}/g,
  /style=\{[^}]*lineHeight[^}]*\}/g,
  /style=\{[^}]*textAlign[^}]*\}/g,
  /style=\{[^}]*textShadow[^}]*\}/g,

  // Layout
  /style=\{[^}]*display[^}]*\}/g,
  /style=\{[^}]*flexDirection[^}]*\}/g,
  /style=\{[^}]*justifyContent[^}]*\}/g,
  /style=\{[^}]*alignItems[^}]*\}/g,
  /style=\{[^}]*gap[^}]*\}/g,
  /style=\{[^}]*width[^}]*\}/g,
  /style=\{[^}]*height[^}]*\}/g,
  /style=\{[^}]*maxWidth[^}]*\}/g,
  /style=\{[^}]*minHeight[^}]*\}/g,

  // Positioning
  /style=\{[^}]*position[^}]*\}/g,
  /style=\{[^}]*top[^}]*\}/g,
  /style=\{[^}]*right[^}]*\}/g,
  /style=\{[^}]*bottom[^}]*\}/g,
  /style=\{[^}]*left[^}]*\}/g,
  /style=\{[^}]*zIndex[^}]*\}/g,

  // Effects
  /style=\{[^}]*opacity[^}]*\}/g,
  /style=\{[^}]*transform[^}]*\}/g,
  /style=\{[^}]*transition[^}]*\}/g,
  /style=\{[^}]*boxShadow[^}]*\}/g,

  // Border radius (but not border width/color)
  /style=\{[^}]*borderRadius[^}]*\}/g,

  // General style object patterns
  /style=\{\{[^}]*\}\}/g,
];

// Tailwind alternatives for common inline styles
const TAILWIND_ALTERNATIVES = {
  // Background colors - Design System Colors
  'backgroundColor: "var(--background)"': "bg-background",
  'backgroundColor: "var(--card)"': "bg-card",
  'backgroundColor: "var(--muted)"': "bg-muted",
  'backgroundColor: "var(--secondary)"': "bg-secondary",
  'backgroundColor: "var(--primary)"': "bg-primary",
  'backgroundColor: "var(--success)"': "bg-success",
  'backgroundColor: "var(--destructive)"': "bg-destructive",
  'backgroundColor: "var(--warning)"': "bg-warning",

  // Text colors - Design System Colors
  'color: "var(--foreground)"': "text-foreground",
  'color: "var(--primary)"': "text-primary",
  'color: "var(--success)"': "text-success",
  'color: "var(--destructive)"': "text-destructive",
  'color: "var(--warning)"': "text-warning",
  'color: "var(--muted-foreground)"': "text-muted-foreground",

  // Spacing
  'marginRight: "8px"': "mr-2",
  'marginLeft: "8px"': "ml-2",
  'marginTop: "8px"': "mt-2",
  'marginBottom: "8px"': "mb-2",
  'padding: "1rem"': "p-4",
  'padding: "0.5rem"': "p-2",
  'padding: "2rem"': "p-8",

  // Typography
  'fontSize: "1.5rem"': "text-xl",
  'fontSize: "1.25rem"': "text-lg",
  'fontSize: "1rem"': "text-base",
  'fontSize: "0.875rem"': "text-sm",
  'fontSize: "0.75rem"': "text-xs",
  'fontWeight: "600"': "font-semibold",
  'fontWeight: "700"': "font-bold",
  'textAlign: "center"': "text-center",
  'textAlign: "left"': "text-left",
  'textAlign: "right"': "text-right",

  // Layout
  'display: "flex"': "flex",
  'display: "grid"': "grid",
  'display: "block"': "block",
  'display: "inline-block"': "inline-block",
  'flexDirection: "column"': "flex-col",
  'flexDirection: "row"': "flex-row",
  'justifyContent: "center"': "justify-center",
  'justifyContent: "space-between"': "justify-between",
  'alignItems: "center"': "items-center",
  'alignItems: "flex-start"': "items-start",
  'alignItems: "flex-end"': "items-end",
  'gap: "1rem"': "gap-4",
  'gap: "0.5rem"': "gap-2",
  'gap: "2rem"': "gap-8",

  // Sizing
  'width: "100%"': "w-full",
  'height: "100%"': "h-full",
  'maxWidth: "1200px"': "max-w-5xl",
  'minHeight: "100vh"': "min-h-screen",

  // Effects
  'opacity: "0.5"': "opacity-50",
  'opacity: "0.8"': "opacity-80",
  'borderRadius: "8px"': "rounded-lg",
  'borderRadius: "4px"': "rounded",
  'borderRadius: "16px"': "rounded-2xl",
};

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
  "src/index.css", // Exclude index.css as it contains the design system definitions
  "src/pages/ColorPalettePage.tsx", // Exclude color-palette as it demonstrates the color system
];

function isBorderRelatedStyle(styleContent) {
  // Check for border-related patterns
  const borderPatterns = [
    /borderWidth/g,
    /borderTopWidth/g,
    /borderRightWidth/g,
    /borderBottomWidth/g,
    /borderLeftWidth/g,
    /borderTop/g,
    /borderRight/g,
    /borderBottom/g,
    /borderLeft/g,
    /border:\s*["']?\d+px/g,
    /border:\s*["']?\d+px\s+solid/g,
    /border:\s*["']?\d+px\s+solid\s+var\(--border\)/g,
    /border:\s*["']?\d+px\s+solid\s+var\(--modus-wc-color/g,
  ];

  return borderPatterns.some((pattern) => pattern.test(styleContent));
}

function isDynamicValue(styleContent) {
  return (
    styleContent.includes("${") ||
    styleContent.includes("process.env") ||
    styleContent.includes("window.") ||
    styleContent.includes("document.") ||
    styleContent.includes("useState") ||
    styleContent.includes("useEffect") ||
    styleContent.includes("?") || // Ternary operators
    styleContent.includes("&&") || // Logical operators
    styleContent.includes("||")
  ); // Logical operators
}

function getTailwindSuggestion(styleContent) {
  // Try to find exact matches first
  for (const [inlineStyle, tailwindClass] of Object.entries(
    TAILWIND_ALTERNATIVES
  )) {
    if (styleContent.includes(inlineStyle)) {
      return tailwindClass;
    }
  }

  // Generic suggestions based on common patterns
  if (styleContent.includes("backgroundColor")) {
    return "Use bg-* classes (bg-background, bg-card, bg-primary, etc.)";
  }
  if (styleContent.includes("color")) {
    return "Use text-* classes (text-foreground, text-primary, etc.)";
  }
  if (styleContent.includes("margin")) {
    return "Use m-* classes (m-2, mr-4, mt-8, etc.)";
  }
  if (styleContent.includes("padding")) {
    return "Use p-* classes (p-2, px-4, py-8, etc.)";
  }
  if (styleContent.includes("fontSize")) {
    return "Use text-* classes (text-sm, text-lg, text-xl, etc.)";
  }
  if (styleContent.includes("display")) {
    return "Use display classes (flex, grid, block, etc.)";
  }

  return "Use appropriate Tailwind utility classes";
}

async function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const violations = [];

  for (const pattern of INLINE_STYLE_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split("\n").length;
      const column = match.index - content.lastIndexOf("\n", match.index - 1);

      const styleContent = match[0];

      // Skip if it's a border-related style (allowed)
      if (isBorderRelatedStyle(styleContent)) {
        continue;
      }

      // Skip if it's a dynamic value (contains variables or expressions)
      if (isDynamicValue(styleContent)) {
        continue;
      }

      const suggestion = getTailwindSuggestion(styleContent);

      violations.push({
        file: filePath,
        line,
        column,
        match: match[0],
        message: `Inline style detected: "${match[0]}". Use Tailwind classes instead.`,
        suggestion: suggestion,
      });
    }
    pattern.lastIndex = 0;
  }

  return violations;
}

async function main() {
  console.log(
    "🎨 Checking for inline styles that should use Tailwind classes in Vite + React app...\n"
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
      console.log("✅ All files are using Tailwind classes correctly!");
      console.log(
        "📝 Note: Border-related styles are allowed due to Tailwind v4 + Modus conflicts"
      );
      process.exit(0);
    } else {
      console.log(
        `❌ Found ${allViolations.length} inline style violations:\n`
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

      console.log("💡 Tailwind Classes Reference:");
      console.log(
        "  ✅ Background: bg-background, bg-card, bg-primary, bg-muted"
      );
      console.log("  ✅ Text: text-foreground, text-primary, text-destructive");
      console.log("  ✅ Spacing: p-4, m-2, px-4, py-2, gap-4");
      console.log("  ✅ Typography: text-lg, font-semibold, text-center");
      console.log("  ✅ Layout: flex, grid, items-center, justify-between");
      console.log("  ✅ Sizing: w-full, h-full, max-w-5xl, min-h-screen");
      console.log("  ✅ Effects: opacity-50, rounded-lg, shadow-lg");
      console.log(
        "  📝 Note: Border styles (borderWidth, border) are allowed due to Tailwind v4 conflicts"
      );
      console.log(
        "  🎯 Use border utility classes: border-default, border-thick, border-dashed, etc."
      );
      console.log("  📖 Documentation: https://tailwindcss.com/docs");

      process.exit(1);
    }
  } catch (error) {
    console.error("💥 Error running inline styles check:", error.message);
    process.exit(1);
  }
}

// Run the script
main();
