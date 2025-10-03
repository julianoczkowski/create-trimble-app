import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export async function updatePackageJson(projectPath, updates) {
  const packageJsonPath = join(projectPath, "package.json");

  try {
    if (!existsSync(packageJsonPath)) {
      throw new Error("package.json not found in template");
    }

    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

    // Update only specified fields
    Object.assign(packageJson, updates);

    writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n",
      "utf-8"
    );
  } catch (error) {
    throw new Error(`Failed to update package.json: ${error.message}`);
  }
}

export function validateProjectName(name) {
  if (!name) return "Project name is required";

  if (!/^[a-z0-9-_]+$/i.test(name)) {
    return "Project name can only contain letters, numbers, dashes and underscores";
  }

  if (existsSync(name)) {
    return `Directory "${name}" already exists`;
  }

  return true;
}
