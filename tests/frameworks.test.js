import { describe, it, expect } from "vitest";
import { loadFrameworks, getFrameworkById } from "../src/frameworks.js";

describe("frameworks", () => {
  describe("loadFrameworks", () => {
    it("should load frameworks from config", () => {
      const frameworks = loadFrameworks();

      expect(Array.isArray(frameworks)).toBe(true);
      expect(frameworks.length).toBeGreaterThan(0);
    });

    it("should only return enabled frameworks", () => {
      const frameworks = loadFrameworks();

      const disabledFramework = frameworks.find((f) => f.disabled === true);
      expect(disabledFramework).toBeUndefined();
    });

    it("should include required properties for each framework", () => {
      const frameworks = loadFrameworks();

      for (const framework of frameworks) {
        expect(framework).toHaveProperty("id");
        expect(framework).toHaveProperty("name");
        expect(framework).toHaveProperty("description");
        expect(framework).toHaveProperty("badge");
      }
    });

    it("should include react and angular frameworks", () => {
      const frameworks = loadFrameworks();
      const frameworkIds = frameworks.map((f) => f.id);

      expect(frameworkIds).toContain("react");
      expect(frameworkIds).toContain("angular");
    });
  });

  describe("getFrameworkById", () => {
    it("should return framework by id", () => {
      const frameworks = loadFrameworks();

      const react = getFrameworkById(frameworks, "react");
      expect(react).toBeDefined();
      expect(react.id).toBe("react");

      const angular = getFrameworkById(frameworks, "angular");
      expect(angular).toBeDefined();
      expect(angular.id).toBe("angular");
    });

    it("should return undefined for unknown framework", () => {
      const frameworks = loadFrameworks();

      const unknown = getFrameworkById(frameworks, "unknown");
      expect(unknown).toBeUndefined();
    });
  });
});
