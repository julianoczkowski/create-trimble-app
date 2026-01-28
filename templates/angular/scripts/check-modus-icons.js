#!/usr/bin/env node

/**
 * Modus Icons Linting Script for Angular + Tailwind v4
 *
 * This script checks for usage of non-Modus icon patterns in Angular files
 * to ensure design system consistency and proper Modus Icons usage.
 *
 * It flags common non-Modus icon patterns and suggests Modus alternatives.
 */

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { glob } = require('glob');

// Non-Modus icon patterns to detect
const NON_MODUS_ICON_PATTERNS = [
  // Font Awesome icons
  /\b(fa|fas|far|fab|fal|fad|fat)-[a-zA-Z0-9-]+\b/g,

  // Material Icons
  /\bmaterial-icons\b/g,
  /\bmaterial-symbols\b/g,

  // Heroicons
  /\bheroicons\b/g,

  // Lucide icons
  /\blucide\b/g,
  /\blucide-react\b/g,

  // React Icons (Angular might have similar patterns)
  /\bfrom ['"]react-icons\b/g,
  /\bfrom ['"]@heroicons\b/g,
  /\bfrom ['"]lucide-react\b/g,

  // Common icon libraries
  /\b@ant-design\/icons\b/g,
  /\b@mui\/icons-material\b/g,
  /\b@tabler\/icons\b/g,
  /\b@phosphor-icons\b/g,

  // SVG icon patterns (non-Modus) - only if they're not Modus
  /<svg[^>]*class="[^"]*icon[^"]*"[^>]*>/g,

  // Icon components (non-Modus) - exclude modus-icon
  /<Icon[^>]*>/g,
  /<Icons[^>]*>/g,
  /<IconButton[^>]*>/g,

  // Common icon imports (exclude modus-icon and modus-icons)
  /import.*Icon.*from(?!.*modus)/g,
  /import.*Icons.*from/g,
  /import.*@heroicons/g,
  /import.*@lucide/g,
  /import.*react-icons/g,
  /import.*@ant-design\/icons/g,
  /import.*@mui\/icons-material/g,
];

// Modus Icons patterns (these are GOOD)
const MODUS_ICON_PATTERNS = [
  /<i\s+class="modus-icons"[^>]*>/g,
  /class="modus-icons"/g,
  /@trimble-oss\/modus-icons/g,
  /modus-icons\.css/g,
  /<modus-icon[^>]*>/g,
  /<modus-wc-icon[^>]*>/g,
  /ModusWcIcon/g,
];

// Files to check
const FILE_PATTERNS = ['src/**/*.ts', 'src/**/*.html', 'src/**/*.css', 'src/**/*.scss'];

// Files to exclude
const EXCLUDE_PATTERNS = ['node_modules/**', 'dist/**', 'build/**', '**/*.d.ts', 'scripts/**'];

async function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  const modusIconsFound = [];

  // Check for Modus Icons usage (good patterns)
  for (const pattern of MODUS_ICON_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split('\n').length;
      modusIconsFound.push({
        file: filePath,
        line,
        match: match[0],
        type: 'modus-icon',
      });
    }
    pattern.lastIndex = 0;
  }

  // Check for non-Modus icon patterns (violations)
  for (const pattern of NON_MODUS_ICON_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split('\n').length;
      const column = match.index - content.lastIndexOf('\n', match.index - 1);

      // Skip if it's a legitimate Modus pattern or legitimate component/import
      const matchText = match[0];
      const matchIndex = match.index;

      // Check if it's a TypeScript type annotation (e.g., input<IconPosition>, output<IconType>, etc.)
      const beforeMatch = content.substring(Math.max(0, matchIndex - 100), matchIndex);

      // Check if this is in a TypeScript generic context
      const isTypeScriptType =
        // Angular signals/inputs/outputs with generics: input<IconPosition>, output<IconType>
        /(?:input|output|model|signal|computed|effect|event|Output|Input|Signal|Model|ReadonlySignal)\s*<\s*[^>]*Icon/i.test(
          beforeMatch
        ) ||
        // Function return types with generics: Promise<IconType>, Observable<IconType>
        /:\s*(?:Promise<|Observable<|Array<).*Icon/i.test(beforeMatch) ||
        // Type declarations: type Icon = ..., interface Icon = ...
        /(?:type|interface|enum)\s+\w*Icon\s*[=:{]/i.test(beforeMatch) ||
        // Variable declarations with types: const x: IconType =
        /(?:const|let|var)\s+\w+\s*:\s*.*Icon/i.test(beforeMatch) ||
        // Generic constraints: extends Icon, T extends Icon
        /(?:extends|implements)\s+.*Icon/i.test(beforeMatch) ||
        // Array types: Icon[], IconType[]
        /\w*Icon\w*\s*\[\]/i.test(beforeMatch) ||
        // Generic angle brackets with Icon inside: <IconPosition>, <IconType>
        (matchText.startsWith('<') &&
          matchText.endsWith('>') &&
          /[<>]\s*\w*Icon/i.test(beforeMatch + matchText));

      if (
        matchText.includes('modus-icon') ||
        matchText.includes('ModusIcon') ||
        matchText.includes('ModusWcIcon') ||
        matchText.includes('modus-icons') ||
        (matchText.includes('icon') && content.includes('modus-icons')) ||
        // Skip legitimate component names and imports
        matchText.includes('IconsPage') ||
        matchText.includes('modusIcons') ||
        matchText.includes('totalIconCount') ||
        matchText.includes('categoryCount') ||
        // Skip TypeScript type annotations
        isTypeScriptType ||
        // Skip legitimate import patterns
        (matchText.includes('import') &&
          (matchText.includes('IconsPage') ||
            matchText.includes('modusIcons') ||
            matchText.includes('totalIconCount') ||
            matchText.includes('categoryCount') ||
            (matchText.includes('from') &&
              (matchText.includes('./pages/IconsPage') ||
                matchText.includes('../pages/IconsPage') ||
                matchText.includes('./data/modusIcons') ||
                matchText.includes('../data/modusIcons') ||
                matchText.includes('data/modusIcons'))))) ||
        // Skip legitimate Angular component usage
        (matchText.includes('<') &&
          matchText.includes('>') &&
          (matchText.includes('IconsPage') ||
            matchText.includes('modusIcons') ||
            matchText.includes('totalIconCount') ||
            matchText.includes('categoryCount')))
      ) {
        continue;
      }

      violations.push({
        file: filePath,
        line,
        column,
        match: match[0],
        message: `Non-Modus icon pattern detected: "${match[0]}". Use Modus Icons instead.`,
        suggestion:
          'Replace with <i class="modus-icons">icon_name</i> or <modus-icon name="icon_name" />',
      });
    }
    pattern.lastIndex = 0;
  }

  return { violations, modusIconsFound };
}

async function main() {
  console.log('🎨 Checking for Modus Icons usage in Angular app...\n');

  let allViolations = [];
  let allModusIcons = [];

  try {
    // Get all files to check
    const allFiles = [];
    for (const pattern of FILE_PATTERNS) {
      const files = glob.sync(pattern, {
        ignore: EXCLUDE_PATTERNS,
      });
      allFiles.push(...files.map((f) => path.resolve(f)));
    }
    const files = [...new Set(allFiles)];

    // Check each file
    for (const file of files) {
      try {
        const { violations, modusIconsFound } = await checkFile(file);
        allViolations = allViolations.concat(violations);
        allModusIcons = allModusIcons.concat(modusIconsFound);
      } catch (error) {
        console.warn(`⚠️  Warning: Could not check file ${file}: ${error.message}`);
      }
    }

    // Report results
    if (allViolations.length === 0) {
      console.log('✅ All files are using Modus Icons correctly!');
      console.log(`📊 Found ${allModusIcons.length} proper Modus Icons usage(s)`);
      process.exit(0);
    } else {
      console.log(`❌ Found ${allViolations.length} non-Modus icon violations:\n`);

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

      console.log('💡 Modus Icons Reference:');
      console.log('  ✅ Angular component: <modus-icon name="icon_name" size="md" />');
      console.log('  ✅ Direct usage: <i class="modus-icons">icon_name</i>');
      console.log(
        '  ✅ Import in src/styles.css: @import "@trimble-oss/moduswebcomponents/modus-wc-styles.css";'
      );
      console.log('  📚 Icon Catalog: https://modus-icons.trimble.com/field-systems/');
      console.log('  🎨 Available Icons: Check data/modusIcons.ts for complete list');
      console.log('  📖 Documentation: https://trimble-oss.github.io/modus-wc-2.0/main/');

      process.exit(1);
    }
  } catch (error) {
    console.error('💥 Error running icon check:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
