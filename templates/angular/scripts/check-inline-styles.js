#!/usr/bin/env node

/**
 * Inline Styles Linting Script for Angular + Tailwind v4
 *
 * This script checks for usage of inline styles that should be replaced with Tailwind classes
 * to ensure design system consistency and proper styling patterns.
 *
 * It flags common inline style patterns and suggests Tailwind alternatives.
 *
 * EXCEPTIONS: Border-related styles are allowed due to Tailwind v4 + Modus conflicts.
 * However, inline border styles should be replaced with our border utility classes.
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { glob } = require('glob');

// Inline style patterns to detect (Angular template syntax: [style.*] and style="")
const INLINE_STYLE_PATTERNS = [
  // Angular style attribute binding
  /\[style\.[^\]]+=\s*["'][^"']+["']\]/g,
  /\[style\.[^\]]+\.px\]/g,
  /\[style\.[^\]]+\.rem\]/g,
  /\[style\.[^\]]+\.em\]/g,
  /\[style\.[^\]]+\.%\]/g,

  // Regular style attribute
  /style\s*=\s*["'][^"']*background[^"']*["']/gi,
  /style\s*=\s*["'][^"']*color[^"']*["']/gi,
  /style\s*=\s*["'][^"']*margin[^"']*["']/gi,
  /style\s*=\s*["'][^"']*padding[^"']*["']/gi,
  /style\s*=\s*["'][^"']*font-size[^"']*["']/gi,
  /style\s*=\s*["'][^"']*font-weight[^"']*["']/gi,
  /style\s*=\s*["'][^"']*width[^"']*["']/gi,
  /style\s*=\s*["'][^"']*height[^"']*["']/gi,
  /style\s*=\s*["'][^"']*display[^"']*["']/gi,
  /style\s*=\s*["'][^"']*var\(--[^"']*["']/gi,
];

// Tailwind alternatives for common inline styles
const TAILWIND_ALTERNATIVES = {
  // Spacing (most common in Angular templates)
  '[style.margin-right.px]="8"': 'mr-2',
  '[style.margin-left.px]="8"': 'ml-2',
  '[style.margin-top.px]="8"': 'mt-2',
  '[style.margin-bottom.px]="8"': 'mb-2',
  '[style.padding.px]="16"': 'p-4',
  '[style.padding.px]="8"': 'p-2',
  '[style.padding.px]="32"': 'p-8',

  // Background colors - Design System Colors
  'style="background: var(--background)"': 'bg-background',
  'style="background: var(--card)"': 'bg-card',
  'style="background: var(--muted)"': 'bg-muted',
  'style="background: var(--secondary)"': 'bg-secondary',
  'style="background: var(--primary)"': 'bg-primary',
  'style="background: var(--success)"': 'bg-success',
  'style="background: var(--error)"': 'bg-error',
  'style="background: var(--warning)"': 'bg-warning',

  // Text colors - Design System Colors
  'style="color: var(--foreground)"': 'text-foreground',
  'style="color: var(--primary)"': 'text-primary',
  'style="color: var(--success)"': 'text-success',
  'style="color: var(--error)"': 'text-error',
  'style="color: var(--warning)"': 'text-warning',
  'style="color: var(--muted-foreground)"': 'text-muted-foreground',

  // Typography
  'style="font-size: 1.5rem"': 'text-xl',
  'style="font-size: 1.25rem"': 'text-lg',
  'style="font-size: 1rem"': 'text-base',
  'style="font-size: 0.875rem"': 'text-sm',
  'style="font-size: 0.75rem"': 'text-xs',
  'style="font-weight: 600"': 'font-semibold',
  'style="font-weight: 700"': 'font-bold',
  'style="text-align: center"': 'text-center',
  'style="text-align: left"': 'text-left',
  'style="text-align: right"': 'text-right',

  // Layout
  'style="display: flex"': 'flex',
  'style="display: grid"': 'grid',
  'style="display: block"': 'block',
  'style="display: inline-block"': 'inline-block',

  // Sizing
  'style="width: 100%"': 'w-full',
  'style="height: 100%"': 'h-full',
};

// Files to check
const FILE_PATTERNS = ['src/**/*.ts', 'src/**/*.html', 'src/**/*.css', 'src/**/*.scss'];

// Files to exclude
const EXCLUDE_PATTERNS = [
  'node_modules/**',
  'dist/**',
  'build/**',
  '**/*.d.ts',
  'scripts/**',
  'src/styles.css', // Exclude styles.css as it contains the design system definitions
];

function isBorderRelatedStyle(styleContent) {
  // Check for border-related patterns
  const borderPatterns = [
    /border-width/gi,
    /border-top/gi,
    /border-right/gi,
    /border-bottom/gi,
    /border-left/gi,
    /border:\s*["']?\d+px/gi,
    /border:\s*["']?\d+px\s+solid/gi,
    /border:\s*["']?\d+px\s+solid\s+var\(--border\)/gi,
    /border:\s*["']?\d+px\s+solid\s+var\(--modus-wc-color/gi,
  ];

  return borderPatterns.some((pattern) => pattern.test(styleContent));
}

function isDynamicValue(styleContent) {
  // Check for Angular template expressions
  return (
    styleContent.includes('{{') ||
    styleContent.includes('}}') ||
    (styleContent.includes('[') && styleContent.includes(']') && styleContent.includes('=')) ||
    styleContent.includes('*ngIf') ||
    styleContent.includes('*ngFor') ||
    styleContent.includes('@') ||
    styleContent.includes('?') || // Ternary operators
    styleContent.includes('&&') || // Logical operators
    styleContent.includes('||')
  ); // Logical operators
}

function getTailwindSuggestion(styleContent) {
  // Try to find exact matches first
  for (const [inlineStyle, tailwindClass] of Object.entries(TAILWIND_ALTERNATIVES)) {
    if (styleContent.includes(inlineStyle)) {
      return tailwindClass;
    }
  }

  // Generic suggestions based on common patterns
  if (styleContent.includes('background') || styleContent.includes('background-color')) {
    return 'Use bg-* classes (bg-background, bg-card, bg-primary, etc.)';
  }
  if (styleContent.includes('color')) {
    return 'Use text-* classes (text-foreground, text-primary, etc.)';
  }
  if (styleContent.includes('margin')) {
    return 'Use m-* classes (m-2, mr-4, mt-8, etc.)';
  }
  if (styleContent.includes('padding')) {
    return 'Use p-* classes (p-2, px-4, py-8, etc.)';
  }
  if (styleContent.includes('font-size')) {
    return 'Use text-* classes (text-sm, text-lg, text-xl, etc.)';
  }
  if (styleContent.includes('display')) {
    return 'Use display classes (flex, grid, block, etc.)';
  }

  return 'Use appropriate Tailwind utility classes';
}

async function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  for (const pattern of INLINE_STYLE_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split('\n').length;
      const column = match.index - content.lastIndexOf('\n', match.index - 1);

      const styleContent = match[0];

      // Skip if it's a border-related style (allowed, but should use utilities)
      if (isBorderRelatedStyle(styleContent)) {
        continue;
      }

      // Skip if it's a dynamic value (contains template expressions)
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
  console.log('🎨 Checking for inline styles that should use Tailwind classes in Angular app...\n');

  let allViolations = [];

  try {
    // Get all files to check
    const allFiles = [];
    for (const pattern of FILE_PATTERNS) {
      const files = glob.sync(pattern, {
        ignore: EXCLUDE_PATTERNS,
      });
      allFiles.push(...files.map(f => path.resolve(f)));
    }
    const files = [...new Set(allFiles)];

    // Check each file
    for (const file of files) {
      try {
        const violations = await checkFile(file);
        allViolations = allViolations.concat(violations);
      } catch (error) {
        console.warn(`⚠️  Warning: Could not check file ${file}: ${error.message}`);
      }
    }

    // Report results
    if (allViolations.length === 0) {
      console.log('✅ All files are using Tailwind classes correctly!');
      console.log(
        '📝 Note: Border-related styles are allowed due to Tailwind v4 + Modus conflicts'
      );
      process.exit(0);
    } else {
      console.log(`❌ Found ${allViolations.length} inline style violations:\n`);

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
          console.log(`  ${violation.line}:${violation.column} - ${violation.message}`);
          console.log(`    💡 Suggestion: ${violation.suggestion}`);
        }
        console.log();
      }

      console.log('💡 Tailwind Classes Reference:');
      console.log('  ✅ Background: bg-background, bg-card, bg-primary, bg-muted');
      console.log('  ✅ Text: text-foreground, text-primary, text-error');
      console.log('  ✅ Spacing: p-4, m-2, px-4, py-2, gap-4, mr-2, ml-2');
      console.log('  ✅ Typography: text-lg, font-semibold, text-center');
      console.log('  ✅ Layout: flex, grid, items-center, justify-between');
      console.log('  ✅ Sizing: w-full, h-full, max-w-5xl, min-h-screen');
      console.log('  ✅ Effects: opacity-50, rounded-lg, shadow-lg');
      console.log(
        '  📝 Note: Border styles (borderWidth, border) are allowed due to Tailwind v4 conflicts'
      );
      console.log(
        '  🎯 Use border utility classes: border-default, border-thick, border-dashed, etc.'
      );
      console.log('  📖 Documentation: https://tailwindcss.com/docs');

      process.exit(1);
    }
  } catch (error) {
    console.error('💥 Error running inline styles check:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
