import { describe, it, expect } from "vitest";
import {
  checkGit,
  checkNodeVersion,
  checkNpm,
  getPlatform,
  getGitInstallInstructions,
  getNodeUpgradeInstructions,
  getGitHubSignupInfo,
} from "../../src/utils/prerequisites.js";

describe("getPlatform", () => {
  it("should return a valid platform string", () => {
    const platform = getPlatform();
    expect(["macos", "windows", "linux"]).toContain(platform);
  });

  it("should return 'macos' on darwin", () => {
    if (process.platform === "darwin") {
      expect(getPlatform()).toBe("macos");
    }
  });

  it("should return 'windows' on win32", () => {
    if (process.platform === "win32") {
      expect(getPlatform()).toBe("windows");
    }
  });

  it("should return 'linux' on linux", () => {
    if (process.platform === "linux") {
      expect(getPlatform()).toBe("linux");
    }
  });
});

describe("checkNodeVersion", () => {
  it("should return current Node.js version info", () => {
    const result = checkNodeVersion();
    expect(result).toHaveProperty("sufficient");
    expect(result).toHaveProperty("version");
    expect(result).toHaveProperty("major");
    expect(typeof result.sufficient).toBe("boolean");
    expect(typeof result.version).toBe("string");
    expect(typeof result.major).toBe("number");
  });

  it("should report sufficient for Node 18+", () => {
    const result = checkNodeVersion();
    expect(result.sufficient).toBe(true);
    expect(result.major).toBeGreaterThanOrEqual(18);
  });

  it("should return version without leading v", () => {
    const result = checkNodeVersion();
    expect(result.version).not.toMatch(/^v/);
  });
});

describe("checkGit", () => {
  it("should detect git installation", async () => {
    const result = await checkGit();
    expect(result).toHaveProperty("installed");
    expect(result).toHaveProperty("version");
    expect(result.installed).toBe(true);
    expect(result.version).toMatch(/\d+\.\d+/);
  });
});

describe("checkNpm", () => {
  it("should detect npm installation", async () => {
    const result = await checkNpm();
    expect(result).toHaveProperty("installed");
    expect(result).toHaveProperty("version");
    expect(result.installed).toBe(true);
    expect(result.version).toMatch(/\d+\.\d+/);
  });
});

describe("getGitInstallInstructions", () => {
  it("should return macOS instructions for macos", () => {
    const instructions = getGitInstallInstructions("macos");
    expect(instructions).toContain("brew install git");
    expect(instructions).toContain("xcode-select");
    expect(instructions).toContain("git-scm.com");
  });

  it("should return Windows instructions for windows", () => {
    const instructions = getGitInstallInstructions("windows");
    expect(instructions).toContain("winget install Git.Git");
    expect(instructions).toContain("git-scm.com");
  });

  it("should return Linux instructions for linux", () => {
    const instructions = getGitInstallInstructions("linux");
    expect(instructions).toContain("apt install git");
    expect(instructions).toContain("dnf install git");
    expect(instructions).toContain("pacman -S git");
  });
});

describe("getNodeUpgradeInstructions", () => {
  it("should include nvm instructions", () => {
    const instructions = getNodeUpgradeInstructions();
    expect(instructions).toContain("nvm install");
  });

  it("should include fnm instructions", () => {
    const instructions = getNodeUpgradeInstructions();
    expect(instructions).toContain("fnm install");
  });

  it("should include nodejs.org link", () => {
    const instructions = getNodeUpgradeInstructions();
    expect(instructions).toContain("nodejs.org");
  });
});

describe("getGitHubSignupInfo", () => {
  it("should include signup URL", () => {
    const info = getGitHubSignupInfo();
    expect(info).toContain("https://github.com/signup");
  });

  it("should explain why GitHub is useful", () => {
    const info = getGitHubSignupInfo();
    expect(info).toContain("version control");
    expect(info).toContain("collaboration");
    expect(info).toContain("CI/CD");
  });
});

describe("runPrerequisites", () => {
  it("should be importable and callable", async () => {
    const { runPrerequisites } = await import(
      "../../src/utils/prerequisites.js"
    );
    expect(typeof runPrerequisites).toBe("function");
  });
});
