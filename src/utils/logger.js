import chalk from "chalk";

// Helper function to create clickable terminal links
function createClickableLink(url, text) {
  // OSC 8 hyperlink format: \u001b]8;;URL\u0007TEXT\u001b]8;;\u0007
  return `\u001b]8;;${url}\u0007${chalk.blue(text)}\u001b]8;;\u0007`;
}

export const logger = {
  info: (message) => console.log(chalk.blue("ℹ"), message),
  success: (message) => console.log(chalk.green("✓"), message),
  warning: (message) => console.log(chalk.yellow("⚠"), message),
  error: (message) => console.log(chalk.red("✗"), message),

  // Styled messages
  title: (message) => console.log(chalk.cyan.bold(message)),
  subtitle: (message) => console.log(chalk.gray(message)),
  highlight: (message) => console.log(chalk.magenta(message)),

  // Special formatting
  welcome: () => {
    console.log(
      chalk.cyan(`
+ ═════════════════════════════════════════════════════════╗
║                                                          ║
║       ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗███████╗      ║
║       ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██╔════╝      ║
║       ██╔████╔██║██║   ██║██║  ██║██║   ██║███████╗      ║
║       ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║╚════██║      ║
║       ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████║      ║
║       ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝      ║
║                                                          ║
║             Create Your Modus 2.0 Application            ║
║            Modus Icons 🞧 Theming 🞧 MCP 🞧 Rules           ║
║                                                          ║
║            by Julian Oczkowski for Trimble Inc.          ║
║                                                          ║
╚═════════════════════════════════════════════════════════ 🞧
    `)
    );
  },

  nextSteps: (
    projectName,
    framework,
    shouldInstall,
    isCurrentFolder = false
  ) => {
    const projectPath = isCurrentFolder ? "current directory" : projectName;
    const openCommand = isCurrentFolder
      ? "open current directory in your code editor"
      : `open: '${projectName}' in your code editor`;

    console.log(
      chalk.green(`
🎉 Success! Your ${framework} project is ready!

📁 Project created at: ${chalk.cyan(projectPath)}

${chalk.gray("═".repeat(60))}
${chalk.gray("Next steps:")}
${chalk.cyan(openCommand)}
${!shouldInstall ? chalk.cyan(`run: npm install`) + "\n  " : ""}${chalk.cyan(
        `run: npm run dev`
      )}

${chalk.gray("═".repeat(60))}
${chalk.gray("How to use this project:")} ${createClickableLink(
        "https://youtube.com",
        "Watch Tutorial on YouTube"
      )}
${chalk.gray("═".repeat(60))}
${chalk.gray("Additional Links:")}
${chalk.gray("Modus 2.0 Storybook:")} ${createClickableLink(
        "https://trimble-oss.github.io/modus-wc-2.0/main/?path=/docs/documentation-getting-started--docs",
        "Modus 2.0 Storybook"
      )}
${chalk.gray("Modus Icons:")} ${createClickableLink(
        "https://modus-icons.trimble.com/",
        "Modus Icons"
      )}
${chalk.gray("Figma Modus MCP:")} ${createClickableLink(
        "https://trimble-oss.github.io/modus-wc-2.0/main/?path=/docs/documentation-modus-figma-mcp-integration-guide--docs",
        "Figma Modus MCP"
      )}
${chalk.gray("═".repeat(60))}

    `)
    );
  },
};
