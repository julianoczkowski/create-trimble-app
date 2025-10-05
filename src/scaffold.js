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
import { cloneTemplate } from "./utils/git.js";
import { logger } from "./utils/logger.js";

export async function scaffold(options = {}) {
  // Show welcome screen
  logger.welcome();

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

  // 2. Project Name
  let projectName = options.projectName;
  const isCurrentFolder = options.currentFolder;

  if (isCurrentFolder) {
    // Use current folder name when --current-folder is specified
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
    // Validate provided project name
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

  // 3. Clone Template
  const spinner = ora(`📦 Installing ${config.name} template...`).start();

  try {
    await cloneTemplate(config.repository, projectName, isCurrentFolder);
    spinner.succeed(chalk.green(`Template installed successfully!`));

    // 4. Update package.json with project name
    try {
      const projectPath = isCurrentFolder ? "." : projectName;
      await updatePackageJson(projectPath, {
        name: projectName,
      });
      logger.success("Updated project configuration");
    } catch (error) {
      logger.warning("Could not update package.json name");
    }
  } catch (error) {
    spinner.fail(
      chalk.red(
        `💀 Failed to install template. Contact julian_oczkowski@trimble.com`
      )
    );
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Visual separator before dependency installation
  console.log(chalk.gray("═".repeat(60)));

  // 5. Install Dependencies (optional)
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
      const installPath = isCurrentFolder ? "." : projectName;
      await installDependencies(installPath);
      installSpinner.succeed(chalk.green("Dependencies installed"));
    } catch (error) {
      installSpinner.fail(chalk.red("Failed to install dependencies"));
      console.error(chalk.red(error.message));
      console.log(
        chalk.yellow(`\n💡 You can install dependencies manually by running:`)
      );
      const installCommand = isCurrentFolder
        ? "npm install"
        : `cd ${projectName} && npm install`;
      console.log(chalk.cyan(`   ${installCommand}`));
    }
  }

  // Visual separator before final success message
  console.log(chalk.gray("═".repeat(60)));

  // 6. Success Message
  logger.nextSteps(projectName, config.name, install, isCurrentFolder);
}
