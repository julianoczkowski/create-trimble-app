#!/usr/bin/env node

/**
 * Modus Color Linting Script for Angular + Tailwind v4
 *
 * This script checks for usage of non-Modus color patterns in Angular files,
 * CSS files, and TypeScript files to ensure design system consistency.
 *
 * It flags common Tailwind color patterns and suggests Modus alternatives.
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { glob } = require('glob');

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
];

// Design System Color Suggestions (from src/styles.css)
const DESIGN_SYSTEM_COLOR_SUGGESTIONS = {
  // Background colors
  red: 'bg-destructive', // Modus 2.0 standard
  green: 'bg-success',
  blue: 'bg-primary',
  info: 'bg-primary',
  yellow: 'bg-warning',
  black: 'bg-background',
  white: 'bg-background',
  gray100: 'bg-card',
  gray200: 'bg-muted',
  gray300: 'bg-secondary',

  // Text colors (only semantic design system colors allowed)
  'text-red': 'text-foreground', // Use primary text color instead of color-specific text
  'text-green': 'text-foreground', // Use primary text color instead of color-specific text
  'text-blue': 'text-foreground', // Use primary text color instead of color-specific text
  'text-yellow': 'text-foreground', // Use primary text color instead of color-specific text
  'text-black': 'text-foreground', // Primary text color
  'text-white': 'text-foreground', // Primary text color (theme-aware)
  'text-gray': 'text-muted-foreground', // Muted text color

  // CSS Variables to Design System
  'var(--modus-wc-color-base-page)': 'bg-background',
  'var(--modus-wc-color-base-100)': 'bg-card',
  'var(--modus-wc-color-base-200)': 'bg-muted',
  'var(--modus-wc-color-base-300)': 'bg-secondary',
  'var(--modus-wc-color-base-content)': 'text-foreground',
  'var(--modus-wc-color-info)': 'bg-primary',
  'var(--modus-wc-color-success)': 'bg-success',
  'var(--modus-wc-color-error)': 'bg-destructive', // Modus 2.0 standard
  'var(--modus-wc-color-warning)': 'bg-warning',
};

// Files to check
const FILE_PATTERNS = ['src/**/*.ts', 'src/**/*.html', 'src/**/*.css', 'src/**/*.scss'];

// Files to exclude
const EXCLUDE_PATTERNS = [
  'node_modules/**',
  'dist/**',
  'build/**',
  '**/*.d.ts',
  'src/styles.css', // Exclude styles.css as it contains the design system definitions
];

async function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  for (const pattern of TAILWIND_COLOR_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split('\n').length;
      const column = match.index - content.lastIndexOf('\n', match.index - 1);

      // Get color suggestion based on context
      const colorName = match[1] || extractColorFromHex(match[0]);
      const isTextColor = match[0].startsWith('text-');
      const isBorderColor = match[0].startsWith('border-');
      
      let suggestion;
      if (isTextColor) {
        // For text colors, suggest semantic text colors
        suggestion = getTextColorSuggestion(colorName);
      } else if (isBorderColor) {
        // For border colors, suggest border utilities
        suggestion = getBorderColorSuggestion(colorName);
      } else {
        // For background colors, use existing mapping
        suggestion = DESIGN_SYSTEM_COLOR_SUGGESTIONS[colorName] || 
                    DESIGN_SYSTEM_COLOR_SUGGESTIONS[match[0]] || 
                    'bg-primary';
      }

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

function getTextColorSuggestion(colorName) {
  // For text colors, suggest semantic color equivalents (using the color itself as text)
  const textColorMap = {
    red: 'text-destructive',     // Red text → destructive color as text
    green: 'text-success',       // Green text → success color as text
    blue: 'text-primary',        // Blue text → primary color as text
    info: 'text-primary',        // Info text → primary color as text
    yellow: 'text-warning',      // Yellow text → warning color as text
    black: 'text-foreground',    // Black text → primary text
    white: 'text-foreground',    // White text → primary text (theme-aware)
    gray: 'text-muted-foreground', // Gray text → muted text
    gray100: 'text-card-foreground',    // Light gray → card text
    gray200: 'text-muted-foreground',   // Medium gray → muted text
    gray300: 'text-secondary-foreground', // Dark gray → secondary text
  };
  return textColorMap[colorName] || 'text-foreground';
}

function getBorderColorSuggestion(colorName) {
  // For border colors, suggest border utilities
  const borderColorMap = {
    red: 'border-destructive',
    green: 'border-success',
    blue: 'border-primary',
    yellow: 'border-warning',
    black: 'border-default',
    white: 'border-default',
    gray: 'border-default',
  };
  return borderColorMap[colorName] || 'border-default';
}

function extractColorFromHex(hex) {
  const colorMap = {
    // Basic colors
    '#ff0000': 'red',
    '#00ff00': 'green',
    '#0000ff': 'blue',
    '#ffff00': 'yellow',
    '#ffffff': 'white',
    '#000000': 'black',

    // Modus-specific hex values (these should be replaced with CSS variables)
    '#fff': 'white', // Should use: bg-background
    '#000': 'black', // Should use: bg-background [dark theme]
    '#f1f1f6': 'gray100', // Should use: bg-card
    '#252a2e': 'gray100', // Should use: bg-card [dark theme]
    '#cbcdd6': 'gray200', // Should use: bg-muted
    '#464b52': 'gray200', // Should use: bg-muted [dark theme]
    '#b7b9c3': 'gray300', // Should use: bg-secondary
    '#353a40': 'gray300', // Should use: bg-secondary [dark theme]
    '#171c1e': 'black', // Should use: text-foreground
    '#0063a3': 'blue', // Should use: bg-primary
    '#1e8a44': 'green', // Should use: bg-success
    '#da212c': 'red', // Should use: bg-destructive
    '#fbad26': 'yellow', // Should use: bg-warning
  };
  return colorMap[hex.toLowerCase()] || 'info';
}

async function main() {
  console.log('🎨 Checking for design system color compliance in Angular app...\n');

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
      console.log('✅ All files are using design system colors correctly!');
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
          console.log(`  ${violation.line}:${violation.column} - ${violation.message}`);
        }
        console.log();
      }

      console.log('💡 Design System Color Reference (from src/styles.css):');
      console.log('  Use Tailwind classes with design system colors:');
      console.log(
        '  ✅ Background: bg-background, bg-card, bg-muted, bg-secondary, bg-primary, bg-success, bg-destructive, bg-warning'
      );
      console.log(
        '  ✅ Text: text-foreground, text-muted-foreground, text-card-foreground, text-secondary-foreground'
      );
      console.log(
        '  ✅ Colored text: text-primary, text-success, text-destructive, text-warning'
      );
      console.log(
        '  ✅ Text on colored backgrounds: text-primary-foreground, text-success-foreground, text-destructive-foreground, text-warning-foreground'
      );
      console.log(
        '  ✅ Borders: Use border utility classes (border-default, border-thick, border-dashed)'
      );
      console.log(
        '  ✅ Component props: color="primary", color="secondary", color="warning", color="danger" (maps to destructive)'
      );
      console.log(
        '  📝 Note: Use design system colors instead of CSS variables or hardcoded values'
      );
      console.log('  📖 Documentation: See src/styles.css for complete color mapping');

      process.exit(1);
    }
  } catch (error) {
    console.error('💥 Error running color check:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
