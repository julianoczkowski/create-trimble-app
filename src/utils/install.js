import { execa } from "execa";
import { existsSync } from "fs";
import { join } from "path";

export async function installDependencies(projectPath) {
  const cwd = join(process.cwd(), projectPath);

  // Detect package manager (or default to npm)
  const packageManager = detectPackageManager(cwd);

  try {
    await execa(packageManager, ["install"], {
      cwd,
      stdio: "inherit",
    });
  } catch (error) {
    throw new Error(`Failed to install dependencies: ${error.message}`);
  }
}

function detectPackageManager(projectPath) {
  if (existsSync(join(projectPath, "yarn.lock"))) return "yarn";
  if (existsSync(join(projectPath, "pnpm-lock.yaml"))) return "pnpm";
  return "npm";
}
