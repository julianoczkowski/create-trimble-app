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

function detectPackageManager(projectPath) {
  if (existsSync(join(projectPath, "yarn.lock"))) return "yarn";
  if (existsSync(join(projectPath, "pnpm-lock.yaml"))) return "pnpm";
  return "npm";
}
