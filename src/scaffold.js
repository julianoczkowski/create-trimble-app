import prompts from "prompts";
import ora from "ora";
import chalk from "chalk";
import { loadFrameworks, getFrameworkById } from "./frameworks.js";
import {
  updatePackageJson,
  validateProjectName,
  getCurrentFolderName,
} from "./utils/file.js";
import { installDependencies } from "./utils/install.js";
import { copyTemplate, getDetailedErrorMessage } from "./utils/git.js";
import { logger } from "./utils/logger.js";

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

  const frameworks = loadFrameworks();

  // 1. Framework Selection
  let framework = options.framework;

  if (!framework) {
    const result = await prompts({
      type: "select",
      name: "framework",
      message: "Select your framework:",
      choices: frameworks.map((f) => ({
        title: `${f.badge} ${f.name}`,
        description: f.description + (f.note ? ` (${f.note})` : ""),
        value: f.id,
      })),
    });
    framework = result.framework;
  }

  if (!framework) {
    console.log(chalk.yellow("X Cancelled"));
    process.exit(0);
  }

  const config = getFrameworkById(frameworks, framework);

  if (!config) {
    console.error(chalk.red(`Error: Unknown framework "${framework}"`));
    console.log(
      chalk.yellow(
        `Available frameworks: ${frameworks.map((f) => f.id).join(", ")}`,
      ),
    );
    process.exit(1);
  }

  // 2. Installation Location Choice
  let installInCurrentFolder = options.currentFolder;
  let projectName = options.projectName;

  if (!installInCurrentFolder && !projectName) {
    const currentFolderName = getCurrentFolderName();

    const result = await prompts({
      type: "select",
      name: "installLocation",
      message: "Where would you like to install your app?",
      choices: [
        {
          title: `📁 Install in current directory (${currentFolderName})`,
          description: "Use the current folder as your project directory",
          value: "current",
        },
        {
          title: "📂 Create new directory",
          description: "Create a new folder for your project",
          value: "new",
        },
      ],
    });

    if (!result.installLocation) {
      console.log(chalk.yellow("X Cancelled"));
      process.exit(0);
    }

    installInCurrentFolder = result.installLocation === "current";
  }

  // 3. Project Name
  if (installInCurrentFolder) {
    projectName = getCurrentFolderName();
    console.log(chalk.blue(`📁 Using current folder name: ${projectName}`));
  } else if (!projectName) {
    const result = await prompts({
      type: "text",
      name: "projectName",
      message: "Project name:",
      initial: "my-modus-app",
      validate: (name) => validateProjectName(name, false),
    });
    projectName = result.projectName;
  } else {
    const validation = validateProjectName(projectName, false);
    if (validation !== true) {
      console.error(chalk.red(`Error: ${validation}`));
      process.exit(1);
    }
  }

  if (!projectName) {
    console.log(chalk.yellow("X Cancelled"));
    process.exit(0);
  }

  const projectPath = installInCurrentFolder ? "." : projectName;

  // Dry-run mode: show what would be created without executing
  if (dryRun) {
    console.log(chalk.cyan("\n🔍 Dry-run mode - no changes will be made\n"));
    console.log(chalk.white("Would create project with:"));
    console.log(chalk.gray(`  Framework: ${config.name}`));
    console.log(chalk.gray(`  Project name: ${projectName}`));
    console.log(
      chalk.gray(
        `  Location: ${installInCurrentFolder ? "Current directory" : `New directory: ${projectName}`}`,
      ),
    );
    console.log(chalk.gray(`  Template: Bundled (included in CLI package)`));
    console.log();
    process.exit(0);
  }

  // 4. Copy Template
  const spinner = ora(`📦 Creating ${config.name} project...`).start();

  try {
    await copyTemplate(framework, projectPath);
    spinner.succeed(chalk.green(`Project created successfully!`));

    // 5. Update package.json with project name
    try {
      await updatePackageJson(projectPath, {
        name: projectName,
      });
      logger.success("Updated project configuration");
    } catch (error) {
      logger.warning("Could not update package.json name");
      if (verbose) {
        console.log(chalk.gray(`  Error: ${error.message}`));
      }
    }
  } catch (error) {
    spinner.fail(chalk.red(`Failed to create project`));
    const detailedMessage = getDetailedErrorMessage(error);
    console.error(chalk.red(`\n${detailedMessage}`));
    process.exit(1);
  }

  // Visual separator before dependency installation
  console.log(chalk.gray("═".repeat(60)));

  // 6. Install Dependencies (optional)
  let install = options.install;

  if (install === undefined) {
    const result = await prompts({
      type: "confirm",
      name: "install",
      message: "📦 Install dependencies now (default: yes)?",
      initial: true,
    });
    install = result.install;
  }

  if (install) {
    const installSpinner = ora("Installing dependencies...").start();
    try {
      await installDependencies(projectPath);
      installSpinner.succeed(chalk.green("Dependencies installed"));
    } catch (error) {
      installSpinner.fail(chalk.red("Failed to install dependencies"));
      console.error(chalk.red(error.message));
      console.log(
        chalk.yellow(`\n💡 You can install dependencies manually by running:`),
      );
      const installCommand = installInCurrentFolder
        ? "npm install"
        : `cd ${projectName} && npm install`;
      console.log(chalk.cyan(`   ${installCommand}`));
    }
  }

  // Visual separator before final success message
  console.log(chalk.gray("═".repeat(60)));

  // 7. Success Message
  logger.nextSteps(projectName, config.name, install, installInCurrentFolder);
}
