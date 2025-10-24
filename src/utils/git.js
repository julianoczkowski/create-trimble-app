import degit from "degit";
import { logger } from "./logger.js";
import { cwd } from "process";
import { join } from "path";

export async function cloneTemplate(
  repository,
  projectName,
  isCurrentFolder = false
) {
  try {
    const emitter = degit(repository, {
      cache: false,
      force: true,
      verbose: false,
    });

    if (isCurrentFolder) {
      // Clone to current directory
      await emitter.clone(".");
    } else {
      // Clone to new directory
      await emitter.clone(projectName);
    }
    return true;
  } catch (error) {
    throw new Error(`Provide this error to the developer: ${error.message}.`);
  }
}

export async function cloneDemoContent(projectPath) {
  try {
    // Download demos directly to a subfolder first, then we'll move the contents
    const demosPath = join(projectPath, "demos-temp");
    const emitter = degit("julianoczkowski/modus-nextjs-demos/demos", {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(demosPath);

    // Now copy the contents to the app/demos folder using Node.js built-in modules
    const fs = await import("fs/promises");
    const path = await import("path");
    const targetPath = join(projectPath, "app", "demos");

    // Recursively copy files from demos-temp to app/demos folder
    await copyDirectory(demosPath, targetPath);

    // Clean up the temporary demos folder
    await fs.rm(demosPath, { recursive: true, force: true });

    return true;
  } catch (error) {
    throw new Error(`Failed to download demo content: ${error.message}`);
  }
}

async function copyDirectory(src, dest) {
  const fs = await import("fs/promises");
  const path = await import("path");

  try {
    await fs.mkdir(dest, { recursive: true });
  } catch (error) {
    // Directory might already exist, that's fine
  }

  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      // Only copy if the file doesn't already exist
      try {
        await fs.access(destPath);
        // File exists, skip it
      } catch {
        // File doesn't exist, copy it
        await fs.copyFile(srcPath, destPath);
      }
    }
  }
}
