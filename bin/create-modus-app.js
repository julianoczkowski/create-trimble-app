#!/usr/bin/env node

import { cli } from "../src/cli.js";

// Run the CLI
cli().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
