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
import { cloneTemplate, cloneDemoContent } from "./utils/git.js";
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
    // Use current folder name when installing in current directory
    projectName = getCurrentFolderName();
    console.log(chalk.blue(`📁 Using current folder name: ${projectName}`));
  } else if (!projectName) {
    // Only ask for project name if creating new directory
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
    await cloneTemplate(config.repository, projectName, installInCurrentFolder);
    spinner.succeed(chalk.green(`Template installed successfully!`));

    // 4. Update package.json with project name
    try {
      const projectPath = installInCurrentFolder ? "." : projectName;
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

  // 5. Demo Content (Next.js only)
  if (framework === "nextjs") {
    const demoResult = await prompts({
      type: "confirm",
      name: "includeDemos",
      message: "🎨 Would you like to include demo pages?",
      initial: false,
    });

    if (demoResult.includeDemos) {
      const demoSpinner = ora("📥 Downloading demo content...").start();
      try {
        const projectPath = installInCurrentFolder ? "." : projectName;
        await cloneDemoContent(projectPath);
        demoSpinner.succeed(chalk.green("Demo content added successfully!"));
      } catch (error) {
        demoSpinner.fail(chalk.yellow("Failed to download demo content"));
        console.log(
          chalk.yellow(
            `\n💡 You can manually add demo content later if needed.`
          )
        );
        console.log(chalk.gray(`   Error: ${error.message}`));
      }
    }
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
      const installPath = installInCurrentFolder ? "." : projectName;
      await installDependencies(installPath);
      installSpinner.succeed(chalk.green("Dependencies installed"));
    } catch (error) {
      installSpinner.fail(chalk.red("Failed to install dependencies"));
      console.error(chalk.red(error.message));
      console.log(
        chalk.yellow(`\n💡 You can install dependencies manually by running:`)
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
