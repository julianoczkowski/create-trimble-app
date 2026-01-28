import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { hasTemplate, getDetailedErrorMessage } from "../../src/utils/git.js";
import { rmSync } from "fs";

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
});
