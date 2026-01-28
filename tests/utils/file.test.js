import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  validateProjectName,
  getCurrentFolderName,
} from "../../src/utils/file.js";
import { mkdirSync, rmdirSync, existsSync } from "fs";
import { join } from "path";

describe("file utilities", () => {
  describe("validateProjectName", () => {
    it("should accept valid project names", () => {
      expect(validateProjectName("my-app")).toBe(true);
      expect(validateProjectName("my_app")).toBe(true);
      expect(validateProjectName("myApp")).toBe(true);
      expect(validateProjectName("my-app-123")).toBe(true);
      expect(validateProjectName("MyApp")).toBe(true);
    });

    it("should reject empty project names", () => {
      expect(validateProjectName("")).toBe("Project name is required");
      expect(validateProjectName(null)).toBe("Project name is required");
      expect(validateProjectName(undefined)).toBe("Project name is required");
    });

    it("should reject project names with spaces", () => {
      const result = validateProjectName("my app");
      expect(result).toContain("can't contain spaces");
    });

    it("should reject project names with special characters", () => {
      const result = validateProjectName("my@app");
      expect(result).toContain("can't contain spaces");
    });

    it("should reject existing directory names when not in current folder mode", () => {
      const testDir = "test-existing-dir-" + Date.now();
      mkdirSync(testDir);

      try {
        const result = validateProjectName(testDir, false);
        expect(result).toContain("already exists");
      } finally {
        rmdirSync(testDir);
      }
    });

    it("should allow existing directory names when in current folder mode", () => {
      const testDir = "test-existing-dir-" + Date.now();
      mkdirSync(testDir);

      try {
        const result = validateProjectName(testDir, true);
        expect(result).toBe(true);
      } finally {
        rmdirSync(testDir);
      }
    });
  });

  describe("getCurrentFolderName", () => {
    it("should return the current folder name", () => {
      const folderName = getCurrentFolderName();
      expect(typeof folderName).toBe("string");
      expect(folderName.length).toBeGreaterThan(0);
    });
  });
});
