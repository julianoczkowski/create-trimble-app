import * as p from "@clack/prompts";
import { loadFrameworks, getFrameworkById } from "./frameworks.js";
import {
  updatePackageJson,
  validateProjectName,
  getCurrentFolderName,
} from "./utils/file.js";
import {
  installDependencies,
  runPostScaffoldValidation,
} from "./utils/install.js";
import { copyTemplate, getDetailedErrorMessage } from "./utils/git.js";
import { runPrerequisites } from "./utils/prerequisites.js";
import { logger } from "./utils/logger.js";
import { colors } from "./utils/colors.js";

export async function scaffold(options = {}) {
  const { verbose = false, dryRun = false } = options;

  // Set verbose mode
  if (verbose) {
    process.env.VERBOSE = "true";
  }

  // Show welcome screen
  logger.welcome();

  // Show security notice if requested
  if (options.showInfo) {
    logger.securityNotice();
    process.exit(0);
  }

  // Start clack intro (creates the threaded UI)
  p.intro(colors.brand("Project Setup"));

  // Run prerequisite checks (unless skipped)
  if (!options.skipChecks) {
    await runPrerequisites({ verbose: options.verbose });
  }

  const frameworks = loadFrameworks();

  // 1. Framework Selection
  let framework = options.framework;

  if (!framework) {
    framework = await p.select({
      message: "Select your framework:",
      options: frameworks.map((f) => ({
        label: `${f.badge} ${f.name}`,
        value: f.id,
        hint: f.note || f.description,
      })),
    });

    if (p.isCancel(framework)) {
      p.cancel("Operation cancelled");
      process.exit(0);
    }
  }

  const config = getFrameworkById(frameworks, framework);

  if (!config) {
    p.cancel(`Unknown framework "${framework}"`);
    console.log(
      colors.warning(
        `Available frameworks: ${frameworks.map((f) => f.id).join(", ")}`,
      ),
    );
    process.exit(1);
  }

  // 2. Cursor Config Scope
  let installScope = options.installScope;

  if (!installScope) {
    installScope = await p.select({
      message: "Where should Cursor config (MCP, Rules, Skills) be installed?",
      options: [
        {
          label: "Project  (.cursor/ in project folder)",
          value: "project",
          hint: "Only active for this project",
        },
        {
          label: "Global   (~/.cursor/)",
          value: "global",
          hint: "Active across all your Cursor projects",
        },
      ],
    });

    if (p.isCancel(installScope)) {
      p.cancel("Operation cancelled");
      process.exit(0);
    }
  }

  // 4. Installation Location Choice
  let installInCurrentFolder = options.currentFolder;
  let projectName = options.projectName;

  if (!installInCurrentFolder && !projectName) {
    const currentFolderName = getCurrentFolderName();

    const location = await p.select({
      message: "Where would you like to install?",
      options: [
        {
          label: `Current directory (./${currentFolderName})`,
          value: "current",
          hint: "Use this folder as your project",
        },
        {
          label: "Create new directory",
          value: "new",
          hint: "Specify a new folder name",
        },
      ],
    });

    if (p.isCancel(location)) {
      p.cancel("Operation cancelled");
      process.exit(0);
    }

    installInCurrentFolder = location === "current";
  }

  // 5. Project Name
  if (installInCurrentFolder) {
    projectName = getCurrentFolderName();
    p.log.info(`Using current folder: ${colors.brand(projectName)}`);
  } else if (!projectName) {
    projectName = await p.text({
      message: "Project name:",
      placeholder: "my-modus-app",
      defaultValue: "my-modus-app",
      validate: (name) => {
        const result = validateProjectName(name, false);
        if (result !== true) return result;
      },
    });

    if (p.isCancel(projectName)) {
      p.cancel("Operation cancelled");
      process.exit(0);
    }
  } else {
    // Validate CLI-provided project name
    const validation = validateProjectName(projectName, false);
    if (validation !== true) {
      p.cancel(validation);
      process.exit(1);
    }
  }

  const projectPath = installInCurrentFolder ? "." : projectName;

  // Dry-run mode: show what would be created without executing
  if (dryRun) {
    p.log.info(colors.brand("Dry-run mode - no changes will be made"));
    p.log.message(`Framework: ${config.name}`);
    p.log.message(`Project: ${projectName}`);
    p.log.message(
      `Location: ${installInCurrentFolder ? "Current directory" : projectName}`,
    );
    p.log.message(
      `Cursor config: ${installScope === "global" ? "~/.cursor/ (global)" : ".cursor/ (project)"}`,
    );
    p.outro("Preview complete");
    process.exit(0);
  }

  // 6. Copy Template with spinner
  const copySpinner = p.spinner();
  copySpinner.start(`Creating ${config.name} project`);

  try {
    await copyTemplate(framework, projectPath, { cursorScope: installScope });
    copySpinner.stop(`${colors.success("\u2713")} Project created`);

    // 5. Update package.json with project name
    try {
      await updatePackageJson(projectPath, {
        name: projectName,
      });
    } catch (error) {
      if (verbose) {
        p.log.warn(`Could not update package.json: ${error.message}`);
      }
    }
  } catch (error) {
    copySpinner.stop(`${colors.error("\u2717")} Failed to create project`);
    const detailedMessage = getDetailedErrorMessage(error);
    p.cancel(detailedMessage);
    process.exit(1);
  }

  // 7. Install Dependencies (optional)
  let install = options.install;

  if (install === undefined) {
    install = await p.confirm({
      message: "Install dependencies now?",
      initialValue: true,
    });

    if (p.isCancel(install)) {
      install = false; // Don't exit, just skip installation
    }
  }

  if (install) {
    const installSpinner = p.spinner();
    installSpinner.start("Fetching dependencies... (This may take a moment)");

    try {
      await installDependencies(projectPath);
      installSpinner.stop(`${colors.success("\u2713")} Dependencies installed`);
    } catch (error) {
      installSpinner.stop(`${colors.error("\u2717")} Installation failed`);
      p.log.warn(error.message);
      p.log.info("You can install dependencies manually later");
    }
  }

  // 8. Post-scaffold validation (only if deps were installed)
  if (install) {
    const validateSpinner = p.spinner();
    validateSpinner.start("Validating template integrity");

    try {
      const result = await runPostScaffoldValidation(projectPath);
      if (result.success) {
        validateSpinner.stop(
          `${colors.success("\u2713")} Template validation passed`
        );
      } else {
        validateSpinner.stop(
          `${colors.warning("\u26A0")} Template validation: ${result.failures} check(s) need attention`
        );
      }
    } catch {
      validateSpinner.stop(
        `${colors.success("\u2713")} Template created (validation skipped)`
      );
    }
  }

  // 9. Success outro
  p.outro(colors.success("Done! Configuration updated."));

  // 9. Detailed next steps
  logger.nextSteps(projectName, config.name, install, installInCurrentFolder, installScope);
}
