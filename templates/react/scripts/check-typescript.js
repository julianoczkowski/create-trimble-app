#!/usr/bin/env node

/**
 * TypeScript Type Checking Script for Vite + React
 *
 * This script runs TypeScript type checking with enhanced developer experience,
 * providing clear success/failure messages and helpful error formatting.
 */

import { execSync } from "child_process";
import path from "path";

function formatTypeScriptError(errorOutput) {
  const lines = errorOutput.split("\n");
  const formattedErrors = [];

  for (const line of lines) {
    if (line.includes(".tsx") || line.includes(".ts")) {
      // Extract file path and line info
      const match = line.match(/([^(]+)\((\d+),(\d+)\): error TS(\d+): (.+)/);
      if (match) {
        const [, filePath, lineNum, colNum, errorCode, message] = match;
        const relativePath = path.relative(process.cwd(), filePath);
        formattedErrors.push({
          file: relativePath,
          line: parseInt(lineNum),
          column: parseInt(colNum),
          code: errorCode,
          message: message.trim(),
          fullLine: line,
        });
      }
    }
  }

  return formattedErrors;
}

function runTypeCheck() {
  try {
    console.log("🔍 Running TypeScript type checking...\n");

    // Run TypeScript compiler with noEmit
    execSync("npx tsc --noEmit --pretty", {
      encoding: "utf8",
      stdio: "pipe",
    });

    // If we get here, no errors were found
    console.log("✅ All TypeScript files are type-safe!");
    console.log("🎯 No type errors found in the codebase.");
    return { success: true, errors: [] };
  } catch (error) {
    // TypeScript found errors
    const errorOutput = error.stdout || error.stderr || error.message;
    const formattedErrors = formatTypeScriptError(errorOutput);

    console.log(`❌ Found ${formattedErrors.length} TypeScript errors:\n`);

    // Group errors by file
    const errorsByFile = formattedErrors.reduce((acc, error) => {
      if (!acc[error.file]) {
        acc[error.file] = [];
      }
      acc[error.file].push(error);
      return acc;
    }, {});

    // Print errors grouped by file
    for (const [file, errors] of Object.entries(errorsByFile)) {
      console.log(`📄 ${file}:`);

      for (const error of errors) {
        console.log(
          `  ${error.line}:${error.column} - TS${error.code}: ${error.message}`
        );
      }
      console.log();
    }

    // Provide helpful suggestions
    console.log("💡 TypeScript Error Resolution Tips:");
    console.log("  • Check for missing type annotations");
    console.log("  • Verify import/export statements");
    console.log("  • Ensure proper interface definitions");
    console.log("  • Check for null/undefined handling");
    console.log("  • Verify component prop types");
    console.log("  • Run 'npm run type-check' to see full details");

    return { success: false, errors: formattedErrors };
  }
}

function main() {
  console.log("🔍 TypeScript Type Check for Vite + React App\n");

  const result = runTypeCheck();

  if (result.success) {
    console.log("\n🎉 Type checking completed successfully!");
    process.exit(0);
  } else {
    console.log("\n💥 Type checking failed. Please fix the errors above.");
    process.exit(1);
  }
}

// Run the script
main();
