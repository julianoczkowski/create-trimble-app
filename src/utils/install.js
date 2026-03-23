import { execa } from "execa";
import { existsSync } from "fs";
import { join } from "path";

export async function installDependencies(projectPath) {
  const cwd = join(process.cwd(), projectPath);

  // Detect package manager (or default to npm)
  const packageManager = detectPackageManager(cwd);

  try {
    // Use pipe instead of inherit to capture and suppress output
    // This allows spinners to animate and hides npm noise
    await execa(packageManager, ["install"], {
      cwd,
      stdio: "pipe",
      env: {
        ...process.env,
        // Suppress npm warnings and audit
        npm_config_loglevel: "error",
        npm_config_audit: "false",
        npm_config_fund: "false",
        // Prevent husky from running during install
        HUSKY: "0",
      },
    });
  } catch (error) {
    // Extract meaningful error message from stderr
    const stderr = error.stderr || "";
    const meaningfulLines = stderr
      .split("\n")
      .filter((line) => line.includes("ERR!") || line.includes("error"))
      .join("\n");

    throw new Error(
      meaningfulLines || `Failed to install dependencies: ${error.message}`,
    );
  }
}

export async function runPostScaffoldValidation(projectPath) {
  const cwd = join(process.cwd(), projectPath);

  try {
    await execa("npm", ["run", "lint:all"], {
      cwd,
      stdio: "pipe",
      env: {
        ...process.env,
        npm_config_loglevel: "error",
      },
    });
    return { success: true, failures: 0 };
  } catch (error) {
    const stdout = error.stdout || "";
    const failMatch = stdout.match(/(\d+) check\(s\) failed/);
    const failures = failMatch ? parseInt(failMatch[1], 10) : 1;
    return { success: false, failures };
  }
}

function detectPackageManager(projectPath) {
  if (existsSync(join(projectPath, "yarn.lock"))) return "yarn";
  if (existsSync(join(projectPath, "pnpm-lock.yaml"))) return "pnpm";
  return "npm";
}
