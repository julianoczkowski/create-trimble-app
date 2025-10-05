import degit from "degit";
import { logger } from "./logger.js";
import { cwd } from "process";

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
