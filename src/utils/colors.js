import pc from "picocolors";

// Check for true color (24-bit) terminal support
const hasTrueColor = () =>
  process.env.COLORTERM === "truecolor" || process.env.COLORTERM === "24bit";

// Trimble Brand Blue: #0063a3 (RGB: 0, 99, 163)
// Fallback: ANSI 256-color code 24 (#005f87)

export const colors = {
  // Primary brand blue
  brand: (text) =>
    hasTrueColor()
      ? `\x1b[38;2;0;99;163m${text}\x1b[0m`
      : `\x1b[38;5;24m${text}\x1b[0m`,

  // Bold brand blue (for commands and emphasis)
  brandBold: (text) =>
    hasTrueColor()
      ? `\x1b[1m\x1b[38;2;0;99;163m${text}\x1b[0m`
      : `\x1b[1m\x1b[38;5;24m${text}\x1b[0m`,

  // Dimmed blue/grey (for version, byline - secondary hierarchy)
  dimBlue: (text) => `\x1b[38;5;60m${text}\x1b[0m`,

  // Standard semantic colors via picocolors
  dim: pc.dim,
  success: pc.green,
  warning: pc.yellow,
  error: pc.red,
  info: pc.blue,
  bold: pc.bold,
  reset: pc.reset,
  cyan: pc.cyan,
  gray: pc.gray,
};

// Unicode box-drawing characters for consistent borders
export const box = {
  // Single-line
  topLeft: "┌",
  topRight: "┐",
  bottomLeft: "└",
  bottomRight: "┘",
  horizontal: "─",
  vertical: "│",

  // Double-line
  dTopLeft: "╔",
  dTopRight: "╗",
  dBottomLeft: "╚",
  dBottomRight: "╝",
  dHorizontal: "═",
  dVertical: "║",
};
