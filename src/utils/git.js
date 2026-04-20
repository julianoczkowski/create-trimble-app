import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directories to skip when copying templates (development artifacts)
const SKIP_DIRECTORIES = new Set([
  "node_modules",
  "dist",
  ".angular",
  ".git",
  "coverage",
  ".nyc_output",
]);

// Files to skip when copying templates (lock files should be generated fresh)
const SKIP_FILES = new Set([
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
]);

/**
 * Copy bundled template to target directory.
 * When cursorScope is "global", the .cursor/ folder is written to ~/.cursor/
 * instead of the project directory.
 * @param {string} templateName - Name of the template (react, angular, solidjs)
 * @param {string} targetPath - Target directory path
 * @param {{ cursorScope?: "project" | "global" }} options
 * @returns {Promise<boolean>}
 */
export async function copyTemplate(templateName, targetPath, { cursorScope = "project" } = {}) {
  const fs = await import("fs/promises");
  const path = await import("path");

  const bundledPath = path.join(
    __dirname,
    "..",
    "..",
    "templates",
    templateName
  );

  try {
    await fs.access(bundledPath);
  } catch {
    throw new Error(
      `Template "${templateName}" not found.\n` +
        `Expected at: ${bundledPath}\n\n` +
        `This is a bug in create-trimble-app. Please report it at:\n` +
        `https://github.com/julianoczkowski/trimble-app/issues`
    );
  }

  if (cursorScope === "global") {
    // Copy project files, skipping .cursor/ (it goes to ~/.cursor/ instead)
    const projectSkipDirs = new Set([...SKIP_DIRECTORIES, ".cursor"]);
    await copyDirectory(bundledPath, targetPath, projectSkipDirs);

    // Copy .cursor/ contents into ~/.cursor/
    const { homedir } = await import("os");
    const cursorSrc = path.join(bundledPath, ".cursor");
    const globalCursorPath = path.join(homedir(), ".cursor");
    await copyDirectory(cursorSrc, globalCursorPath);
  } else {
    await copyDirectory(bundledPath, targetPath);
  }

  return true;
}

/**
 * Copy directory recursively
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 * @param {Set<string>} skipDirs - Directory names to skip (defaults to SKIP_DIRECTORIES)
 */
async function copyDirectory(src, dest, skipDirs = SKIP_DIRECTORIES) {
  const fs = await import("fs/promises");
  const path = await import("path");

  await fs.mkdir(dest, { recursive: true });

  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    // Skip excluded directories (node_modules, dist, .angular, etc.)
    if (entry.isDirectory() && skipDirs.has(entry.name)) {
      continue;
    }

    // Skip excluded files (lock files should be generated fresh)
    if (!entry.isDirectory() && SKIP_FILES.has(entry.name)) {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    // Rename files that npm excludes during publish
    let destName = entry.name;
    if (entry.name === "dot-npmrc") destName = ".npmrc";
    if (entry.name === "gitignore") destName = ".gitignore";
    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath, skipDirs);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

/**
 * Check if a template exists
 * @param {string} templateName - Name of the template
 * @returns {Promise<boolean>}
 */
export async function hasTemplate(templateName) {
  const fs = await import("fs/promises");
  const path = await import("path");

  const bundledPath = path.join(
    __dirname,
    "..",
    "..",
    "templates",
    templateName
  );

  try {
    await fs.access(bundledPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get detailed error message based on error type
 * @param {Error} error - Original error
 * @returns {string}
 */
export function getDetailedErrorMessage(error) {
  const message = error.message || "";

  if (message.includes("ENOENT") || message.includes("no such file")) {
    return (
      `Failed to create project directory.\n\n` +
      `Possible causes:\n` +
      `  • Invalid project name\n` +
      `  • Permission denied\n` +
      `  • Disk full\n\n` +
      `Try a different project name or check disk permissions.`
    );
  }

  if (message.includes("EACCES") || message.includes("permission denied")) {
    return (
      `Permission denied when creating project.\n\n` +
      `Try:\n` +
      `  • Running from a directory you have write access to\n` +
      `  • Checking folder permissions`
    );
  }

  if (message.includes("ENOSPC")) {
    return (
      `Not enough disk space to create project.\n\n` +
      `Free up some disk space and try again.`
    );
  }

  if (message.includes("EEXIST")) {
    return (
      `Directory already exists.\n\n` +
      `Try:\n` +
      `  • Using a different project name\n` +
      `  • Using --current-folder to install in the current directory`
    );
  }

  // Default error message
  return (
    `Failed to create project: ${message}\n\n` +
    `If this problem persists, please report it at:\n` +
    `https://github.com/julianoczkowski/trimble-app/issues`
  );
}
