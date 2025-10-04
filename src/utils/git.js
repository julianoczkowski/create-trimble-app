import degit from "degit";
import { logger } from "./logger.js";

export async function cloneTemplate(repository, projectName) {
  try {
    const emitter = degit(repository, {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(projectName);
    return true;
  } catch (error) {
    logger.error(`Failed to install template from ${repository}`);
    throw new Error(`Error: ${error.message}.`);
  }
}
