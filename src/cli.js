#!/usr/bin/env node

import { scaffold } from "./scaffold.js";
import chalk from "chalk";

// Parse command line arguments
const args = process.argv.slice(2);

// Show help if requested
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
🎯 Create Modus App - Interactive CLI for Modus 2.0 Applications

Usage:
  npx @julianoczkowski/create-modus-app [project-name] [options]

Options:
  --framework <name>    Specify framework (react, vue, angular, html)
  --help, -h           Show this help message
  --version, -v        Show version number

Examples:
  npx @julianoczkowski/create-modus-app                    # Interactive mode
  npx @julianoczkowski/create-modus-app my-app             # With your project name
  npx @julianoczkowski/create-modus-app my-app --framework vue

Frameworks:
  ⚛️ react    - Build with React and Modus 2 Web Components
  💚 vue      - Build with Vue 3 and Modus 2 Web Components  
  🅰️ angular  - Build with Angular and Modus 2 Web Components
  🎓 html     - Vanilla JavaScript with Modus 2 Web Components

For more information, visit: https://github.com/julianoczkowski/create-modus-app
`);
  process.exit(0);
}

// Show version if requested
if (args.includes("--version") || args.includes("-v")) {
  const packageJson = JSON.parse(
    await import("fs").then((fs) =>
      fs.readFileSync(new URL("../package.json", import.meta.url), "utf-8")
    )
  );
  console.log(packageJson.version);
  process.exit(0);
}

// Parse options
const options = {};

// Extract project name if provided as first argument (not starting with --)
if (args[0] && !args[0].startsWith("--")) {
  options.projectName = args[0];
}

// Parse framework option
const frameworkIndex = args.indexOf("--framework");
if (frameworkIndex !== -1 && args[frameworkIndex + 1]) {
  options.framework = args[frameworkIndex + 1];
}

// Parse install option
if (args.includes("--no-install")) {
  options.install = false;
}

export async function cli() {
  try {
    await scaffold(options);
  } catch (error) {
    console.error(chalk.red("Error:"), error.message);
    process.exit(1);
  }
}
