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

    it("project scope: copies .cursor/ into the project folder", async () => {
      const projectDir = testDir + "-project-scope";

      try {
        await copyTemplate("react", projectDir, { cursorScope: "project" });

        expect(existsSync(join(projectDir, "package.json"))).toBe(true);
        expect(existsSync(join(projectDir, ".cursor"))).toBe(true);
        expect(existsSync(join(projectDir, ".cursor", "mcp.json"))).toBe(true);
      } finally {
        rmSync(projectDir, { recursive: true, force: true });
      }
    });

    it("global scope: omits .cursor/ from project folder", async () => {
      const projectDir = join(tmpdir(), "cta-global-project-" + Date.now());
      const globalCursorDir = join(tmpdir(), "cta-global-cursor-" + Date.now());

      // Temporarily redirect homedir by copying to a known temp path and
      // verifying the project folder has no .cursor/
      try {
        await copyTemplate("react", projectDir, { cursorScope: "project" });
        // Re-run with global scope into a separate project dir to verify exclusion
        const projectDirGlobal = projectDir + "-global";
        try {
          // We can't easily override homedir, so we verify the branching
          // logic by checking that project scope includes .cursor and
          // confirming the global path is the real ~/.cursor target.
          // Instead, verify that passing cursorScope="global" skips .cursor/
          // in the project output:
          await copyTemplate("react", projectDirGlobal, { cursorScope: "global" });

          expect(existsSync(join(projectDirGlobal, "package.json"))).toBe(true);
          // .cursor/ must NOT be in the project folder for global scope
          expect(existsSync(join(projectDirGlobal, ".cursor"))).toBe(false);
        } finally {
          rmSync(projectDirGlobal, { recursive: true, force: true });
        }
      } finally {
        rmSync(projectDir, { recursive: true, force: true });
        try { rmSync(globalCursorDir, { recursive: true, force: true }); } catch { /* ok */ }
      }
    });

    it("global scope: writes .cursor/ contents to ~/.cursor/", async () => {
      const { homedir } = await import("os");
      const globalCursorPath = join(homedir(), ".cursor");
      const projectDir = join(tmpdir(), "cta-global-write-" + Date.now());

      try {
        await copyTemplate("react", projectDir, { cursorScope: "global" });

        // ~/.cursor/ should now contain mcp.json from the template
        expect(existsSync(join(globalCursorPath, "mcp.json"))).toBe(true);
      } finally {
        rmSync(projectDir, { recursive: true, force: true });
      }
    });
  });
});
