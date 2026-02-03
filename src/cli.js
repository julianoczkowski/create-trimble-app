#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { scaffold } from "./scaffold.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load package.json for version info
const packageJsonPath = join(__dirname, "..", "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

// Check for updates (non-blocking)
async function checkForUpdates() {
  try {
    const { default: updateNotifier } = await import("update-notifier");
    const notifier = updateNotifier({
      pkg: packageJson,
      updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
    });
    notifier.notify({ isGlobal: true });
  } catch {
    // Silently ignore update check failures
  }
}

const program = new Command();

program
  .name("create-trimble-app")
  .description(
    "Interactive CLI to scaffold Modus 2.0 web component applications",
  )
  .version(packageJson.version, "-v, --version", "Display version number")
  .argument("[project-name]", "Name of the project to create")
  .option(
    "-f, --framework <name>",
    "Framework to use (react, angular)",
    validateFramework,
  )
  .option(
    "--current-folder",
    "Install in current folder and use folder name as project name",
  )
  .option("--no-install", "Skip automatic dependency installation")
  .option("--dry-run", "Preview what would be created without making changes")
  .option("--verbose", "Enable verbose output for debugging")
  .option("--info", "Show information about this CLI")
  .addHelpText(
    "after",
    chalk.cyan(`
╔════════════════════════════════════════════════════════════════════════════╗
║                          CREATE TRIMBLE APP - HELP                         ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Quick Start:                                                              ║
║    npx @julianoczkowski/create-trimble-app@latest                          ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Examples:                                                                 ║
║    # Interactive mode - choose framework and name                          ║
║    npx @julianoczkowski/create-trimble-app@latest                          ║
║                                                                            ║
║    # Create a React project                                                ║
║    npx @julianoczkowski/create-trimble-app@latest my-app --framework react ║
║                                                                            ║
║    # Create an Angular project                                             ║
║    npx @julianoczkowski/create-trimble-app@latest my-app -f angular        ║
║                                                                            ║
║    # Install in current folder                                             ║
║    npx @julianoczkowski/create-trimble-app@latest --current-folder         ║
║                                                                            ║
║    # Preview without creating files                                        ║
║    npx @julianoczkowski/create-trimble-app@latest my-app --dry-run         ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Frameworks:                                                               ║
║    react    - React with Vite and Modus 2.0 Components                     ║
║    angular  - Angular with Modus 2.0 Web Components                        ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Security:                                                                 ║
║    Templates are bundled directly in this CLI package.                     ║
║    No external downloads - works offline, always consistent.               ║
║    Use --info for more details.                                            ║
║                                                                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  More information:                                                         ║
║    https://github.com/julianoczkowski/trimble-app                          ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
`),
  )
  .action(async (projectName, options) => {
    // Check for updates in background
    checkForUpdates();

    try {
      await scaffold({
        projectName,
        framework: options.framework,
        currentFolder: options.currentFolder,
        install: options.install,
        dryRun: options.dryRun,
        verbose: options.verbose,
        showInfo: options.info,
      });
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      if (options.verbose) {
        console.error(chalk.gray(error.stack));
      }
      process.exit(1);
    }
  });

/**
 * Validate framework option
 * @param {string} value - Framework name
 * @returns {string} - Validated framework name
 */
function validateFramework(value) {
  const validFrameworks = ["react", "angular"];
  const lowercaseValue = value.toLowerCase();

  if (!validFrameworks.includes(lowercaseValue)) {
    throw new Error(
      `Invalid framework "${value}". Valid options: ${validFrameworks.join(", ")}`,
    );
  }

  return lowercaseValue;
}

// Export for testing
export async function cli(args = process.argv) {
  await program.parseAsync(args);
}

// Run CLI if this is the main module
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cli();
}
