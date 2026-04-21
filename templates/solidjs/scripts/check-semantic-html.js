#!/usr/bin/env node

/**
 * Semantic HTML Linting Script for Vite + SolidJS
 *
 * This script checks for usage of semantic HTML elements that should be replaced with div elements
 * and Tailwind classes to ensure consistent styling and avoid browser default style conflicts.
 *
 * It flags semantic HTML elements and suggests div alternatives with appropriate Tailwind classes.
 */

import fs from "fs";
import path from "path";
import { glob } from "glob";

// Semantic HTML elements to detect (should be replaced with div + Tailwind)
// Updated patterns to be more specific and avoid TypeScript/JavaScript syntax
const SEMANTIC_HTML_PATTERNS = [
  // Headings - more specific to avoid matching TypeScript generics
  /<h[1-6](?:\s+[^>]*)?>/g,

  // Semantic sections
  /<section(?:\s+[^>]*)?>/g,
  /<header(?:\s+[^>]*)?>/g,
  /<footer(?:\s+[^>]*)?>/g,
  /<main(?:\s+[^>]*)?>/g,
  /<article(?:\s+[^>]*)?>/g,
  /<aside(?:\s+[^>]*)?>/g,
  /<nav(?:\s+[^>]*)?>/g,

  // Text elements - more specific patterns
  /<p(?:\s+[^>]*)?>/g,
  /<span(?:\s+[^>]*)?>/g,

  // Lists
  /<ul(?:\s+[^>]*)?>/g,
  /<ol(?:\s+[^>]*)?>/g,
  /<li(?:\s+[^>]*)?>/g,

  // Other semantic elements - more specific patterns
  /<button(?:\s+[^>]*)?>/g,
  /<blockquote(?:\s+[^>]*)?>/g,
  /<cite(?:\s+[^>]*)?>/g,
  /<address(?:\s+[^>]*)?>/g,
  /<time(?:\s+[^>]*)?>/g,
  /<mark(?:\s+[^>]*)?>/g,
  /<small(?:\s+[^>]*)?>/g,
  /<strong(?:\s+[^>]*)?>/g,
  /<em(?:\s+[^>]*)?>/g,
  /<b(?:\s+[^>]*)?>/g,
  /<i(?:\s+[^>]*)?>/g,
  /<u(?:\s+[^>]*)?>/g,
  // More specific patterns for potentially problematic elements
  /<s(?:\s+[^>]*)?>/g, // Only match <s> with attributes or closing
  /<del(?:\s+[^>]*)?>/g,
  /<ins(?:\s+[^>]*)?>/g,
  /<sub(?:\s+[^>]*)?>/g,
  /<sup(?:\s+[^>]*)?>/g,
  /<pre(?:\s+[^>]*)?>/g,
  /<kbd(?:\s+[^>]*)?>/g,
  /<samp(?:\s+[^>]*)?>/g,
  /<var(?:\s+[^>]*)?>/g,
  /<dfn(?:\s+[^>]*)?>/g,
  /<abbr(?:\s+[^>]*)?>/g,
  /<acronym(?:\s+[^>]*)?>/g,
  /<q(?:\s+[^>]*)?>/g,
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
  "test-*.tsx",
  "test-*.ts",
  "test-*.js",
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  "node_modules/**",
  "dist/**",
  "build/**",
  "**/*.d.ts",
  "scripts/**",
  "**/*.md",
  "**/*.mdx",
  "**/*.txt",
  "**/*.json",
  "**/*.yml",
  "**/*.yaml",
  "**/*.xml",
  "**/*.html",
  "**/*.svg",
  "**/*.png",
  "**/*.jpg",
  "**/*.jpeg",
  "**/*.gif",
  "**/*.ico",
  "**/*.pdf",
  "**/*.doc",
  "**/*.docx",
];

// Tailwind alternatives for common semantic elements
const TAILWIND_ALTERNATIVES = {
  // Headings
  "<h1": '<div class="text-4xl font-bold',
  "<h2": '<div class="text-3xl font-semibold',
  "<h3": '<div class="text-2xl font-semibold',
  "<h4": '<div class="text-xl font-semibold',
  "<h5": '<div class="text-lg font-semibold',
  "<h6": '<div class="text-base font-semibold',

  // Sections
  "<section": '<div class="',
  "<header": '<div class="',
  "<footer": '<div class="',
  "<main": '<div class="',
  "<article": '<div class="',
  "<aside": '<div class="',
  "<nav": '<div class="',

  // Text elements
  "<p": '<div class="text-base',
  "<span": '<div class="',

  // Lists
  "<ul": '<div class="list-none',
  "<ol": '<div class="list-none',
  "<li": '<div class="',

  // Other elements
  "<button": '<ModusWcButton color="primary"',
  "<blockquote": '<div class="border-l-4 pl-4 italic border-left-default',
  "<cite": '<div class="text-sm text-muted-foreground italic',
  "<address": '<div class="text-sm not-italic',
  "<time": '<div class="text-sm',
  "<mark": '<div class="bg-yellow-200 dark:bg-yellow-800',
  "<small": '<div class="text-sm',
  "<strong": '<div class="font-bold',
  "<em": '<div class="italic',
  "<b": '<div class="font-bold',
  "<i": '<div class="italic',
  "<u": '<div class="underline',
  "<s": '<div class="line-through',
  "<del": '<div class="line-through',
  "<ins": '<div class="underline',
  "<sub": '<div class="text-xs align-sub',
  "<sup": '<div class="text-xs align-super',
  "<pre":
    '<div class="bg-muted p-4 rounded text-sm font-mono overflow-x-auto',
  "<kbd": '<div class="bg-muted px-2 py-1 rounded text-sm font-mono border',
  "<samp": '<div class="bg-muted px-1 py-0.5 rounded text-sm font-mono',
  "<var": '<div class="italic',
  "<dfn": '<div class="italic',
  "<abbr": '<div class="underline decoration-dotted',
  "<acronym": '<div class="underline decoration-dotted',
  "<q": '<div class="italic',
};

function getTailwindSuggestion(element) {
  // Try to find exact matches first
  for (const [semanticElement, tailwindAlternative] of Object.entries(
    TAILWIND_ALTERNATIVES
  )) {
    if (element.includes(semanticElement)) {
      return tailwindAlternative;
    }
  }

  // Generic suggestions based on common patterns
  if (element.includes("<h")) {
    return '<div class="text-lg font-semibold';
  }
  if (
    element.includes("<section") ||
    element.includes("<header") ||
    element.includes("<footer")
  ) {
    return '<div class="';
  }
  if (element.includes("<p")) {
    return '<div class="text-base';
  }
  if (element.includes("<ul") || element.includes("<ol")) {
    return '<div class="list-none';
  }
  if (element.includes("<strong") || element.includes("<b")) {
    return '<div class="font-bold';
  }
  if (element.includes("<em") || element.includes("<i")) {
    return '<div class="italic';
  }

  return '<div class="';
}

function isAllowedSemanticElement(element, content, matchIndex) {
  // Allow certain semantic elements in specific contexts
  const beforeMatch = content.substring(0, matchIndex);
  const afterMatch = content.substring(matchIndex + element.length);

  // Check if the element is in a JSX comment
  const commentStart = beforeMatch.lastIndexOf("/*");
  const commentEnd = beforeMatch.lastIndexOf("*/");
  if (commentStart > commentEnd) {
    return true;
  }

  // Check if this is TypeScript/JavaScript syntax, not HTML
  // Look for patterns that indicate TypeScript generics or JavaScript syntax
  const typescriptPatterns = [
    // TypeScript generics: <Map<string, number>>, <string>, <boolean>
    /<[A-Z][a-zA-Z]*<[^>]*>>/,
    /<[a-zA-Z]+(?:,\s*[a-zA-Z]+)*>/,
    // Function calls: <string, number>
    /<[a-zA-Z]+(?:,\s*[a-zA-Z]+)*>/,
    // Array types: <string[]>
    /<[a-zA-Z]+\[\]>/,
    // Union types: <string | number>
    /<[a-zA-Z]+\s*\|\s*[a-zA-Z]+>/,
  ];

  for (const pattern of typescriptPatterns) {
    if (pattern.test(element)) {
      return true;
    }
  }

  // Check if the element is part of TypeScript/JavaScript syntax
  // Look for context clues like type annotations, generics, etc.
  const contextBefore = beforeMatch.slice(-50); // Last 50 characters before match
  const contextAfter = afterMatch.slice(0, 50); // First 50 characters after match

  // TypeScript/JavaScript context patterns
  const codeContextPatterns = [
    // Type annotations: : <string>
    /:\s*$/,
    // Generic parameters: <T extends
    /<[A-Z]\w*\s+extends/,
    // Function parameters: (<string, number>
    /\(\s*$/,
    // Array declarations: Array<
    /Array\s*$/,
    // Map/Set declarations: Map<, Set<
    /(Map|Set)\s*$/,
    // React component props: <ComponentProps<
    /<[A-Z]\w*Props\s*$/,
    // useRef declarations: useRef<
    /useRef\s*$/,
    // useState declarations: useState<
    /useState\s*$/,
    // useCallback declarations: useCallback<
    /useCallback\s*$/,
    // useMemo declarations: useMemo<
    /useMemo\s*$/,
  ];

  for (const pattern of codeContextPatterns) {
    if (pattern.test(contextBefore)) {
      return true;
    }
  }

  // Check if the element is in a string literal (but not JSX attributes)
  // Look for quotes that are actually part of string literals, not JSX attributes
  const singleQuoteStart = beforeMatch.lastIndexOf("'");
  const doubleQuoteStart = beforeMatch.lastIndexOf('"');
  const backtickStart = beforeMatch.lastIndexOf("`");
  const lastQuote = Math.max(singleQuoteStart, doubleQuoteStart, backtickStart);

  if (lastQuote > Math.max(commentStart, commentEnd)) {
    // Check if this quote is part of a JSX attribute (class="...", style="...", etc.)
    // or if it's actually a string literal
    const beforeQuote = content.substring(0, lastQuote);

    // Look for JSX attribute patterns before the quote
    const jsxAttributePattern =
      /(className|style|id|aria-\w+|data-\w+|on\w+)\s*=\s*$/;
    if (jsxAttributePattern.test(beforeQuote)) {
      // This is a JSX attribute, not a string literal - don't allow
      return false;
    }

    // Check if the quote is actually part of a string literal
    // Look for assignment patterns like const str = "..." or function calls like console.log("...")
    const stringLiteralPattern = /(=\s*|\(\s*|,\s*|:\s*)\s*$/;
    if (stringLiteralPattern.test(beforeQuote)) {
      return true;
    }
  }

  // Check if it's styled-jsx syntax (should be allowed)
  if (element.includes("<style jsx") || element.includes("<style jsx global")) {
    return true;
  }

  // Allow <i> elements that are used for Modus icons
  if (element.includes("<i") && element.includes("modus-icons")) {
    return true;
  }

  // Allow <li> and <ul> elements when used inside ModusWcMenu components
  // These are required for the web component's structure
  if (element.includes("<li") || element.includes("<ul")) {
    const beforeMatch = content.substring(0, matchIndex);
    
    // Find the last opening tag for ModusWcMenu or modus-wc-menu before this element
    const lastModusWcMenuOpen = beforeMatch.lastIndexOf("<ModusWcMenu");
    const lastModusWcMenuOpen2 = beforeMatch.lastIndexOf("<modus-wc-menu");
    const lastMenuOpen = Math.max(lastModusWcMenuOpen, lastModusWcMenuOpen2);
    
    // If we found a menu opening tag, check if we're still inside it
    if (lastMenuOpen !== -1) {
      // Find the last closing tag for ModusWcMenu before this element
      const lastModusWcMenuClose = beforeMatch.lastIndexOf("</ModusWcMenu>");
      const lastModusWcMenuClose2 = beforeMatch.lastIndexOf("</modus-wc-menu>");
      const lastMenuClose = Math.max(lastModusWcMenuClose, lastModusWcMenuClose2);
      
      // If the last opening tag is after the last closing tag, we're inside a menu
      if (lastMenuOpen > lastMenuClose) {
        return true;
      }
    }
  }

  // Check if this looks like a real HTML element (has proper attributes or closing)
  // Real HTML elements typically have spaces, attributes, or are self-closing
  const hasAttributes = element.includes(" ") || element.includes("=");
  const isSelfClosing = element.endsWith("/>");
  const hasProperStructure = hasAttributes || isSelfClosing;

  // If it doesn't have proper HTML structure and looks like code syntax, allow it
  if (!hasProperStructure) {
    // Check if it's followed by code syntax (>, =, etc.)
    if (/^[>,=]/.test(contextAfter)) {
      return true;
    }
  }

  return false;
}

async function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const violations = [];

  for (const pattern of SEMANTIC_HTML_PATTERNS) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split("\n").length;
      const column = match.index - content.lastIndexOf("\n", match.index - 1);

      const element = match[0];

      // Skip if it's an allowed semantic element
      if (isAllowedSemanticElement(element, content, match.index)) {
        continue;
      }

      const suggestion = getTailwindSuggestion(element);

      violations.push({
        file: filePath,
        line,
        column,
        match: match[0],
        message: `Semantic HTML element detected: "${match[0]}". Use div with Tailwind classes instead.`,
        suggestion: suggestion,
      });
    }
    pattern.lastIndex = 0;
  }

  return violations;
}

async function main() {
  console.log(
    "🎨 Checking for semantic HTML elements that should use div + Tailwind classes in Vite + SolidJS app...\n"
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
      console.log(
        "✅ All files are using div elements with Tailwind classes correctly!"
      );
      console.log(
        "📝 Note: Semantic HTML elements are avoided to prevent browser default style conflicts"
      );
      process.exit(0);
    } else {
      console.log(
        `❌ Found ${allViolations.length} semantic HTML violations:\n`
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
        "  ✅ Headings: text-4xl font-bold, text-3xl font-semibold, text-2xl font-semibold"
      );
      console.log("  ✅ Sections: Use div with appropriate layout classes");
      console.log("  ✅ Text: text-base, text-sm, text-lg, text-xl");
      console.log(
        "  ✅ Typography: font-bold, font-semibold, italic, underline"
      );
      console.log("  ✅ Layout: flex, grid, block, inline-block");
      console.log("  ✅ Spacing: p-4, m-2, px-4, py-2, gap-4");
      console.log(
        "  ✅ Colors: text-foreground, text-muted-foreground, bg-background"
      );
      console.log(
        "  📝 Note: Use div elements to avoid browser default styles and ensure consistent Tailwind behavior"
      );
      console.log("  📖 Documentation: https://tailwindcss.com/docs");

      process.exit(1);
    }
  } catch (error) {
    console.error("💥 Error running semantic HTML check:", error.message);
    process.exit(1);
  }
}

// Run the script
main();
