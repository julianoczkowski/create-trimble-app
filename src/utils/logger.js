import chalk from "chalk";

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
╔══════════════════════════════════════════════════════╗
║                                                      ║
║     ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗███████╗    ║
║     ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██╔════╝    ║
║     ██╔████╔██║██║   ██║██║  ██║██║   ██║███████╗    ║
║     ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║╚════██║    ║
║     ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████║    ║
║     ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝    ║
║                                                      ║
║           Create Your Modus 2.0 Application          ║
║          Modus Icons 🞧 Theming 🞧 MCP 🞧 Rules         ║
║                                                      ║
║               by Julian Oczkowski 2025               ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
    `)
    );
  },

  nextSteps: (projectName, framework, shouldInstall) => {
    console.log(
      chalk.green(`
🎉 Success! Your ${framework} project is ready!

📁 Project created at: ${chalk.cyan(projectName)}

🚀 Next steps:
  ${chalk.cyan(`cd ${projectName}`)}
  ${!shouldInstall ? chalk.cyan(`npm install`) + "\n  " : ""}${chalk.cyan(
        `npm run dev`
      )}

📚 Documentation: ${chalk.blue("https://modus-web-components.trimble.com")}

🔗 Links:
- Modus Icons: ${chalk.blue("https://modus-web-components.trimble.com/icons")}
- Theming: ${chalk.blue("https://modus-web-components.trimble.com/theming")}
- MCP: ${chalk.blue("https://modus-web-components.trimble.com/mcp")}
- Rules: ${chalk.blue("https://modus-web-components.trimble.com/rules")}
    `)
    );
  },
};
