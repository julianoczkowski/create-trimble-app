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

  // Security notice
  securityNotice: () => {
    console.log(
      chalk.cyan(`
╔════════════════════════════════════════════════════════════╗
║              CREATE TRIMBLE APP - INFORMATION              ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Templates are bundled directly in this npm package.       ║
║  No external downloads required - works fully offline.     ║
║                                                            ║
║  Available Templates:                                      ║
║  • React - React + Vite + Modus 2.0 Components             ║
║  • Angular - Angular + Modus 2.0 Web Components            ║
║                                                            ║
║  Security:                                                 ║
║  • No runtime network dependencies                         ║
║  • Templates verified at publish time                      ║
║  • Published with npm provenance                           ║
║                                                            ║
║  Source repositories (private):                            ║
║  • github.com/julianoczkowski/modus-react-app              ║
║  • github.com/julianoczkowski/modus-angular-app            ║
║                                                            ║
║  Report issues & discuss:                                  ║
║  https://github.com/julianoczkowski/trimble-app            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `),
    );
  },

  // Special formatting
  welcome: () => {
    console.log(
      chalk.cyan(`
+ ════════════════════════════════════════════════════════════╗
║                                                             ║
║   ████████╗██████╗ ██╗███╗   ███╗██████╗ ██╗     ███████╗   ║
║   ╚══██╔══╝██╔══██╗██║████╗ ████║██╔══██╗██║     ██╔════╝   ║
║      ██║   ██████╔╝██║██╔████╔██║██████╔╝██║     █████╗     ║
║      ██║   ██╔══██╗██║██║╚██╔╝██║██╔══██╗██║     ██╔══╝     ║
║      ██║   ██║  ██║██║██║ ╚═╝ ██║██████╔╝███████╗███████╗   ║
║      ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝   ║
║                                                             ║
║            Create Your Trimble Application v1.0.0           ║
║                     Modus 2 Web Components                  ║
║            Icons + Theming + MCP + Rules + Skills           ║
║                                                             ║
║                     by Julian Oczkowski                     ║
║                                                             ║
╚════════════════════════════════════════════════════════════ +
    `),
    );
  },

  nextSteps: (
    projectName,
    framework,
    shouldInstall,
    isCurrentFolder = false,
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
${!shouldInstall ? chalk.cyan(`run: npm install`) + "\n" : ""}${chalk.cyan(
        `run: ${framework.toLowerCase().includes("angular") ? "npm run start" : "npm run dev"}`,
      )}

${chalk.gray("═".repeat(60))}
${createClickableLink(
        "https://github.com/julianoczkowski/trimble-app",
        "More Information, issues, discussions, tutorials",
      )}
${chalk.gray("═".repeat(60))}

    `),
    );
  },
};
