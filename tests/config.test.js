import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("config.json", () => {
  let config;

  beforeAll(() => {
    const configPath = join(__dirname, "..", "templates", "config.json");
    config = JSON.parse(readFileSync(configPath, "utf-8"));
  });

  it("should have valid JSON structure", () => {
    expect(config).toHaveProperty("frameworks");
    expect(typeof config.frameworks).toBe("object");
  });

  it("should have meta information", () => {
    expect(config).toHaveProperty("meta");
    expect(config.meta).toHaveProperty("configVersion");
    expect(config.meta.templatesIncluded).toBe(true);
  });

  it("should have react framework configured", () => {
    expect(config.frameworks).toHaveProperty("react");
    const react = config.frameworks.react;

    expect(react).toHaveProperty("name");
    expect(react).toHaveProperty("description");
  });

  it("should have angular framework configured", () => {
    expect(config.frameworks).toHaveProperty("angular");
    const angular = config.frameworks.angular;

    expect(angular).toHaveProperty("name");
    expect(angular).toHaveProperty("description");
  });
});

describe("bundled templates", () => {
  it("should have react template directory", () => {
    const reactPath = join(__dirname, "..", "templates", "react");
    expect(existsSync(reactPath)).toBe(true);
  });

  it("should have react package.json", () => {
    const packagePath = join(
      __dirname,
      "..",
      "templates",
      "react",
      "package.json",
    );
    expect(existsSync(packagePath)).toBe(true);
  });

  it("should have angular template directory", () => {
    const angularPath = join(__dirname, "..", "templates", "angular");
    expect(existsSync(angularPath)).toBe(true);
  });

  it("should have angular package.json", () => {
    const packagePath = join(
      __dirname,
      "..",
      "templates",
      "angular",
      "package.json",
    );
    expect(existsSync(packagePath)).toBe(true);
  });
});
