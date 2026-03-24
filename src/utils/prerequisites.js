import * as p from "@clack/prompts";
import { execa } from "execa";
import boxen from "boxen";
import { colors } from "./colors.js";

/**
 * Detect the current platform for installation instructions.
 * @returns {"macos" | "windows" | "linux"}
 */
function getPlatform() {
  const platform = process.platform;
  if (platform === "darwin") return "macos";
  if (platform === "win32") return "windows";
  return "linux";
}

/**
 * Check if git is installed and return version string.
 * @returns {Promise<{installed: boolean, version: string|null}>}
 */
async function checkGit() {
  try {
    const { stdout } = await execa("git", ["--version"]);
    const version = stdout.replace("git version ", "").trim();
    return { installed: true, version };
  } catch {
    return { installed: false, version: null };
  }
}

/**
 * Check if Node.js version meets minimum requirement (>= 18).
 * @returns {{sufficient: boolean, version: string, major: number}}
 */
function checkNodeVersion() {
  const version = process.version;
  const major = parseInt(version.slice(1).split(".")[0], 10);
  return {
    sufficient: major >= 18,
    version: version.slice(1),
    major,
  };
}

/**
 * Check if npm is installed and return version string.
 * @returns {Promise<{installed: boolean, version: string|null}>}
 */
async function checkNpm() {
  try {
    const { stdout } = await execa("npm", ["--version"]);
    return { installed: true, version: stdout.trim() };
  } catch {
    return { installed: false, version: null };
  }
}

/**
 * Get platform-specific git installation instructions.
 * @param {"macos" | "windows" | "linux"} platform
 * @returns {string}
 */
function getGitInstallInstructions(platform) {
  const instructions = {
    macos: [
      colors.brandBold("Install Git on macOS:"),
      "",
      `  ${colors.brand("Option 1:")} Install via Homebrew`,
      `  ${colors.dim("$")} brew install git`,
      "",
      `  ${colors.brand("Option 2:")} Install via Xcode Command Line Tools`,
      `  ${colors.dim("$")} xcode-select --install`,
      "",
      `  ${colors.brand("Option 3:")} Download from git-scm.com`,
      `  ${colors.dim("https://git-scm.com/download/mac")}`,
    ],
    windows: [
      colors.brandBold("Install Git on Windows:"),
      "",
      `  ${colors.brand("Option 1:")} Install via winget`,
      `  ${colors.dim(">")} winget install Git.Git`,
      "",
      `  ${colors.brand("Option 2:")} Download installer`,
      `  ${colors.dim("https://git-scm.com/download/win")}`,
    ],
    linux: [
      colors.brandBold("Install Git on Linux:"),
      "",
      `  ${colors.brand("Debian/Ubuntu:")}`,
      `  ${colors.dim("$")} sudo apt install git`,
      "",
      `  ${colors.brand("Fedora:")}`,
      `  ${colors.dim("$")} sudo dnf install git`,
      "",
      `  ${colors.brand("Arch:")}`,
      `  ${colors.dim("$")} sudo pacman -S git`,
    ],
  };
  return instructions[platform].join("\n");
}

/**
 * Get Node.js upgrade instructions.
 * @returns {string}
 */
function getNodeUpgradeInstructions() {
  return [
    colors.brandBold("Upgrade Node.js to version 18 or higher:"),
    "",
    `  ${colors.brand("Option 1:")} Use nvm (recommended)`,
    `  ${colors.dim("$")} nvm install 18`,
    `  ${colors.dim("$")} nvm use 18`,
    "",
    `  ${colors.brand("Option 2:")} Use fnm`,
    `  ${colors.dim("$")} fnm install 18`,
    `  ${colors.dim("$")} fnm use 18`,
    "",
    `  ${colors.brand("Option 3:")} Download from nodejs.org`,
    `  ${colors.dim("https://nodejs.org/en/download")}`,
  ].join("\n");
}

/**
 * Get GitHub signup information.
 * @returns {string}
 */
function getGitHubSignupInfo() {
  return [
    colors.brandBold("Create a GitHub Account"),
    "",
    "GitHub enables version control, collaboration, and CI/CD",
    "for your Trimble application.",
    "",
    colors.dim("Why GitHub?"),
    `  ${colors.brand("\u2022")} Track changes to your code with Git`,
    `  ${colors.brand("\u2022")} Collaborate with your team via pull requests`,
    `  ${colors.brand("\u2022")} Automate builds and deployments with GitHub Actions`,
    `  ${colors.brand("\u2022")} Free for public and private repositories`,
    "",
    colors.dim("Create your account:"),
    `  ${colors.brandBold("https://github.com/signup")}`,
    "",
    colors.dim("Steps:"),
    "  1. Visit the link above",
    "  2. Enter your email and create a password",
    "  3. Choose a username",
    "  4. Verify your email address",
  ].join("\n");
}

/**
 * Run prerequisite checks for the development environment.
 * Checks: Git installation, Node.js version, npm availability.
 * Then prompts about GitHub account.
 *
 * @param {Object} options
 * @param {boolean} [options.verbose=false] - Show extra debug output
 * @returns {Promise<void>}
 */
export async function runPrerequisites(options = {}) {
  const { verbose = false } = options;

  p.log.step(colors.brandBold("Checking development environment..."));

  // 1. Check Git
  const git = await checkGit();
  if (git.installed) {
    p.log.success(`Git ${colors.dim(`v${git.version}`)}`);
  } else {
    p.log.error("Git is not installed");
    const platform = getPlatform();
    console.log(
      boxen(getGitInstallInstructions(platform), {
        padding: 1,
        borderColor: "red",
        borderStyle: "round",
        title: "Git Required",
        titleAlignment: "center",
      }),
    );
    p.log.info("Install Git, then re-run this command.");
    p.cancel("Prerequisites not met");
    process.exit(1);
  }

  // 2. Check Node.js version
  const node = checkNodeVersion();
  if (node.sufficient) {
    p.log.success(`Node.js ${colors.dim(`v${node.version}`)}`);
  } else {
    p.log.error(`Node.js v${node.version} (v18+ required)`);
    console.log(
      boxen(getNodeUpgradeInstructions(), {
        padding: 1,
        borderColor: "red",
        borderStyle: "round",
        title: "Node.js Upgrade Required",
        titleAlignment: "center",
      }),
    );
    p.log.info("Upgrade Node.js, then re-run this command.");
    p.cancel("Prerequisites not met");
    process.exit(1);
  }

  // 3. Check npm
  const npm = await checkNpm();
  if (npm.installed) {
    p.log.success(`npm ${colors.dim(`v${npm.version}`)}`);
  } else {
    p.log.error("npm is not available");
    p.log.info("npm should come bundled with Node.js.");
    p.log.info("Try reinstalling Node.js from https://nodejs.org");
    p.cancel("Prerequisites not met");
    process.exit(1);
  }

  // 4. GitHub account prompt (only in interactive/TTY mode)
  if (process.stdout.isTTY && !process.env.CI) {
    const hasGitHub = await p.select({
      message: "Do you have a GitHub account?",
      options: [
        { label: "Yes", value: true, hint: "Continue to project setup" },
        { label: "No", value: false, hint: "We'll help you get started" },
      ],
    });

    if (p.isCancel(hasGitHub)) {
      p.cancel("Operation cancelled");
      process.exit(0);
    }

    if (!hasGitHub) {
      console.log(
        boxen(getGitHubSignupInfo(), {
          padding: 1,
          borderColor: "blue",
          borderStyle: "round",
          title: "GitHub",
          titleAlignment: "center",
        }),
      );

      const ready = await p.confirm({
        message: "Continue to project setup?",
        initialValue: true,
      });

      if (p.isCancel(ready) || !ready) {
        p.cancel("Operation cancelled");
        process.exit(0);
      }
    }
  } else if (verbose) {
    p.log.info("Skipping GitHub prompt (non-interactive mode)");
  }

  p.log.success(colors.brand("All prerequisites met!"));
}

// Export internals for testing
export {
  checkGit,
  checkNodeVersion,
  checkNpm,
  getPlatform,
  getGitInstallInstructions,
  getNodeUpgradeInstructions,
  getGitHubSignupInfo,
};
