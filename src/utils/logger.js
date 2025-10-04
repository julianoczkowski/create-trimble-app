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
  ${chalk.cyan(`open: '${projectName}' in your code editor`)}
  ${!shouldInstall ? chalk.cyan(`run: npm install`) + "\n  " : ""}${chalk.cyan(
        `run: npm run dev`
      )}

📚 How to use this project: ${createClickableLink(
        "https://youtube.com",
        "Watch Tutorial on YouTube"
      )}

Additional Links:
Modus 2.0 Storybook: ${createClickableLink(
        "https://trimble-oss.github.io/modus-wc-2.0/main/?path=/docs/documentation-getting-started--docs",
        "Modus 2.0 Storybook"
      )}
Modus Icons: ${createClickableLink(
        "https://modus-icons.trimble.com/",
        "Modus Icons"
      )}
Figma Modus MCP: ${createClickableLink(
        "https://trimble-oss.github.io/modus-wc-2.0/main/?path=/docs/documentation-modus-figma-mcp-integration-guide--docs",
        "Figma Modus MCP"
      )}

    `)
    );
  },
};
