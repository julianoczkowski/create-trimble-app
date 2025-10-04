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
    throw new Error(`Provide this error to the developer: ${error.message}.`);
  }
}
