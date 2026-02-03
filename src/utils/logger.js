import boxen from "boxen";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { colors } from "./colors.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get version from package.json
function getVersion() {
  try {
    const pkgPath = join(__dirname, "..", "..", "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    return pkg.version;
  } catch {
    return "0.0.0";
  }
}

// OSC 8 hyperlink for clickable terminal links
function createClickableLink(url, text) {
  return `\u001b]8;;${url}\u0007${colors.brandBold(text)}\u001b]8;;\u0007`;
}

export const logger = {
  // Basic log methods
  info: (message) => console.log(colors.info("i"), message),
  success: (message) => console.log(colors.success("\u2713"), message),
  warning: (message) => console.log(colors.warning("!"), message),
  error: (message) => console.log(colors.error("\u2717"), message),

  // Styled messages
  title: (message) => console.log(colors.brandBold(message)),
  subtitle: (message) => console.log(colors.gray(message)),
  highlight: (message) => console.log(colors.brand(message)),

  // Security notice with boxen
  securityNotice: () => {
    const content = [
      colors.brandBold("CREATE TRIMBLE APP - INFORMATION"),
      "",
      "Templates are bundled directly in this npm package.",
      "No external downloads required - works fully offline.",
      "",
      colors.dim("Available Templates:"),
      `  ${colors.brand("\u25cf")} React - React + Vite + Modus 2.0 Components`,
      `  ${colors.brand("\u25a0")} Angular - Angular + Modus 2.0 Web Components`,
      "",
      colors.dim("Security:"),
      "  \u2022 No runtime network dependencies",
      "  \u2022 Templates verified at publish time",
      "  \u2022 Published with npm provenance",
      "",
      colors.dim("Source repositories (private):"),
      "  \u2022 github.com/julianoczkowski/modus-react-app",
      "  \u2022 github.com/julianoczkowski/modus-angular-app",
      "",
      colors.dim("Report issues & discuss:"),
      "  https://github.com/julianoczkowski/trimble-app",
    ].join("\n");

    console.log(
      boxen(content, {
        padding: 1,
        borderColor: "blue",
        borderStyle: "round",
      }),
    );
  },

  // Brand header with TRIMBLE ASCII art
  welcome: () => {
    const version = getVersion();

    // ASCII art TRIMBLE logo - 55 characters wide
    const logoWidth = 55;
    const logoLines = [
      "████████╗██████╗ ██╗███╗   ███╗██████╗ ██╗     ███████╗",
      "╚══██╔══╝██╔══██╗██║████╗ ████║██╔══██╗██║     ██╔════╝",
      "   ██║   ██████╔╝██║██╔████╔██║██████╔╝██║     █████╗  ",
      "   ██║   ██╔══██╗██║██║╚██╔╝██║██╔══██╗██║     ██╔══╝  ",
      "   ██║   ██║  ██║██║██║ ╚═╝ ██║██████╔╝███████╗███████╗",
      "   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝",
    ];

    const tagline = "Create Your Trimble Application";
    const subtitle = "Modus 2.0 Web Components";
    const features = "Icons + Theming + MCP + Rules + Skills";
    const byline = `v${version} by Julian Oczkowski`;

    // Helper to center text within logo width
    const center = (text, width) => {
      const padding = Math.max(0, Math.floor((width - text.length) / 2));
      return " ".repeat(padding) + text;
    };

    // Color each logo line individually
    const coloredLogo = logoLines.map((line) => colors.brand(line)).join("\n");

    // Build content with manually centered text
    const content = [
      "",
      coloredLogo,
      "",
      colors.brandBold(center(tagline, logoWidth)),
      colors.dim(center(subtitle, logoWidth)),
      colors.dim(center(features, logoWidth)),
      "",
      colors.dimBlue(center(byline, logoWidth)),
      "",
    ].join("\n");

    // Use boxen with no text alignment (ANSI codes break centering)
    console.log(
      boxen(content, {
        padding: { top: 0, bottom: 0, left: 2, right: 2 },
        borderColor: "blue",
        borderStyle: "double",
      }),
    );
  },

  // Success block with numbered next steps
  nextSteps: (
    projectName,
    framework,
    shouldInstall,
    isCurrentFolder = false,
  ) => {
    // Match the width of the header box (logo width = 55)
    const boxWidth = 55;

    // Always show the actual folder name, with "./" prefix if current directory
    const projectPath = isCurrentFolder ? `./${projectName}` : projectName;
    const runCommand = framework.toLowerCase().includes("angular")
      ? "npm run start"
      : "npm run dev";

    // Build numbered steps with beginner-friendly descriptions
    const steps = [];
    let stepNum = 1;

    // Step: Open in IDE
    const folderToOpen = isCurrentFolder ? "this folder" : projectName;
    steps.push(
      `${colors.dim(`${stepNum}.`)} Open ${colors.brandBold(folderToOpen)} in your editor`,
    );
    steps.push(
      colors.dim("   (VS Code, Cursor, WebStorm, etc.)"),
    );
    stepNum++;

    // Step: Install dependencies (if skipped)
    if (!shouldInstall) {
      steps.push(
        `${colors.dim(`${stepNum}.`)} ${colors.brandBold("npm install")}`,
      );
      steps.push(
        colors.dim("   Run in terminal to install dependencies"),
      );
      stepNum++;
    }

    // Step: Run dev server
    steps.push(
      `${colors.dim(`${stepNum}.`)} ${colors.brandBold(runCommand)}`,
    );
    steps.push(
      colors.dim("   Run in terminal to start the dev server"),
    );

    const content = [
      colors.success("\u2713") + " " + colors.bold("Success!") + " Your app is ready.",
      "",
      colors.dim("Location: ") + colors.brand(projectPath),
      "",
      colors.dim("Next steps:"),
      ...steps.map((s) => "  " + s),
      "",
      colors.dim("\u2500".repeat(boxWidth - 4)),
      createClickableLink(
        "https://github.com/julianoczkowski/trimble-app",
        "Documentation, issues, and discussions",
      ),
    ].join("\n");

    console.log(
      "\n" +
        boxen(content, {
          padding: { top: 1, bottom: 1, left: 2, right: 2 },
          borderColor: "green",
          borderStyle: "round",
          width: boxWidth + 6, // Account for boxen padding and borders
        }) +
        "\n",
    );
  },
};
