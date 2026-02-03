import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  hasTemplate,
  getDetailedErrorMessage,
  copyTemplate,
} from "../../src/utils/git.js";
import { rmSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

describe("git utilities", () => {
  describe("hasTemplate", () => {
    it("should return true for bundled react template", async () => {
      const result = await hasTemplate("react");
      expect(result).toBe(true);
    });

    it("should return true for bundled angular template", async () => {
      const result = await hasTemplate("angular");
      expect(result).toBe(true);
    });

    it("should return false for non-existent template", async () => {
      const result = await hasTemplate("nonexistent");
      expect(result).toBe(false);
    });
  });

  describe("getDetailedErrorMessage", () => {
    it("should provide helpful message for permission errors", () => {
      const error = new Error("EACCES: permission denied");
      const message = getDetailedErrorMessage(error);
      expect(message).toContain("Permission denied");
      expect(message).toContain("write access");
    });

    it("should provide helpful message for disk space errors", () => {
      const error = new Error("ENOSPC: no space left on device");
      const message = getDetailedErrorMessage(error);
      expect(message).toContain("disk space");
    });

    it("should provide helpful message for existing directory", () => {
      const error = new Error("EEXIST: file already exists");
      const message = getDetailedErrorMessage(error);
      expect(message).toContain("already exists");
    });

    it("should provide generic message for unknown errors", () => {
      const error = new Error("Something unexpected happened");
      const message = getDetailedErrorMessage(error);
      expect(message).toContain("Something unexpected happened");
      expect(message).toContain("report it");
    });
  });

  describe("copyTemplate", () => {
    const testDir = join(tmpdir(), "create-trimble-app-test-" + Date.now());

    afterEach(() => {
      try {
        rmSync(testDir, { recursive: true, force: true });
      } catch {
        // Ignore cleanup errors
      }
    });

    it("should copy react template without node_modules", async () => {
      await copyTemplate("react", testDir);

      // Verify template was copied (package.json should exist)
      expect(existsSync(join(testDir, "package.json"))).toBe(true);

      // Verify excluded directories are NOT copied
      expect(existsSync(join(testDir, "node_modules"))).toBe(false);
      expect(existsSync(join(testDir, "dist"))).toBe(false);

      // Verify excluded files are NOT copied
      expect(existsSync(join(testDir, "package-lock.json"))).toBe(false);
    });

    it("should copy angular template without node_modules", async () => {
      const angularTestDir = testDir + "-angular";

      try {
        await copyTemplate("angular", angularTestDir);

        // Verify template was copied
        expect(existsSync(join(angularTestDir, "package.json"))).toBe(true);

        // Verify excluded directories are NOT copied
        expect(existsSync(join(angularTestDir, "node_modules"))).toBe(false);
        expect(existsSync(join(angularTestDir, "dist"))).toBe(false);
        expect(existsSync(join(angularTestDir, ".angular"))).toBe(false);

        // Verify excluded files are NOT copied
        expect(existsSync(join(angularTestDir, "package-lock.json"))).toBe(
          false,
        );
      } finally {
        rmSync(angularTestDir, { recursive: true, force: true });
      }
    });
  });
});
