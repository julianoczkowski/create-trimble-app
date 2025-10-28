import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loadFrameworks() {
  try {
    const configPath = join(__dirname, "../templates/config.json");
    const config = JSON.parse(readFileSync(configPath, "utf-8"));

    return Object.entries(config.frameworks)
      .filter(([id, framework]) => !framework.disabled)
      .map(([id, framework]) => ({
        id,
        ...framework,
      }));
  } catch (error) {
    throw new Error(
      `Failed to load framework configurations: ${error.message}`
    );
  }
}

export function getFrameworkById(frameworks, id) {
  return frameworks.find((framework) => framework.id === id);
}
