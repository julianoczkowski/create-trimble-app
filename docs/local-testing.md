# Local Testing Guide

This guide explains how to test the `create-modus-app` CLI locally during development.

## Prerequisites

```bash
cd /home/julian/Documents/Development/MODUS/create-modus-app
npm install
```

## Testing Methods

### 1. Direct Node Execution (Recommended for Development)

The fastest way to test during development:

```bash
# Show help
node bin/create-modus-app.js --help

# Show version
node bin/create-modus-app.js --version

# Show CLI info
node bin/create-modus-app.js --info

# Dry-run (preview without creating files)
node bin/create-modus-app.js my-app --framework react --dry-run
node bin/create-modus-app.js my-app --framework angular --dry-run

# Create a React project (skip install for faster testing)
node bin/create-modus-app.js /tmp/test-react --framework react --no-install

# Create an Angular project
node bin/create-modus-app.js /tmp/test-angular --framework angular --no-install

# Interactive mode
node bin/create-modus-app.js
```

### 2. Using npm link (Simulates Global Install)

Test as if the CLI was installed globally:

```bash
# Link the package globally
npm link

# Now use it from anywhere
create-modus-app my-app --framework react --dry-run
create-modus-app --help

# When done testing, unlink
npm unlink -g @julianoczkowski/create-modus-app
```

### 3. Using npx with Local Path

Test from any directory:

```bash
# From anywhere on your system
npx /home/julian/Documents/Development/MODUS/create-modus-app my-app --framework react --dry-run

# Or use the npm run dev script
cd /home/julian/Documents/Development/MODUS/create-modus-app
npm run dev
```

### 4. Using npm run dev

The `package.json` includes a dev script:

```bash
npm run dev
```

This runs `node bin/create-modus-app.js` and starts interactive mode.

## Test Scenarios

### Quick Smoke Test

```bash
# Run all basic commands
node bin/create-modus-app.js --help
node bin/create-modus-app.js --version
node bin/create-modus-app.js --info
node bin/create-modus-app.js test-app --framework react --dry-run
node bin/create-modus-app.js test-app --framework angular --dry-run
```

### Full Integration Test

```bash
# Create temp directory
mkdir -p /tmp/cli-test && cd /tmp/cli-test

# Test React template
node /home/julian/Documents/Development/MODUS/create-modus-app/bin/create-modus-app.js test-react --framework react --no-install

# Verify React project structure
ls -la test-react/
ls -la test-react/.cursor/
ls -la test-react/.github/
ls -la test-react/src/

# Test Angular template
node /home/julian/Documents/Development/MODUS/create-modus-app/bin/create-modus-app.js test-angular --framework angular --no-install

# Verify Angular project structure
ls -la test-angular/
ls -la test-angular/src/

# Clean up
cd ~ && rm -rf /tmp/cli-test
```

### Test Current Folder Mode

```bash
# Create and enter a test directory
mkdir -p /tmp/current-folder-test && cd /tmp/current-folder-test

# Install in current folder
node /home/julian/Documents/Development/MODUS/create-modus-app/bin/create-modus-app.js --current-folder --framework react --no-install

# Verify files were created in current directory
ls -la

# Clean up
cd ~ && rm -rf /tmp/current-folder-test
```

### Test Verbose Mode

```bash
node bin/create-modus-app.js /tmp/verbose-test --framework react --verbose --no-install
rm -rf /tmp/verbose-test
```

## Running the Test Suite

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Verifying Bundled Templates

Check that templates are correctly bundled:

```bash
# Check React template exists and has key files
ls -la templates/react/
ls -la templates/react/.cursor/
ls -la templates/react/src/
cat templates/react/package.json

# Check Angular template exists and has key files
ls -la templates/angular/
ls -la templates/angular/src/
cat templates/angular/package.json
```

## One-Liner Test Commands

```bash
# Quick React test (create, verify, cleanup)
node bin/create-modus-app.js /tmp/quick-react --framework react --no-install && ls -la /tmp/quick-react/.cursor && rm -rf /tmp/quick-react

# Quick Angular test
node bin/create-modus-app.js /tmp/quick-angular --framework angular --no-install && ls -la /tmp/quick-angular/src && rm -rf /tmp/quick-angular

# Test all CLI options work
node bin/create-modus-app.js --help && node bin/create-modus-app.js --version && node bin/create-modus-app.js --info && echo "All CLI options work!"
```

## Common Issues

### "Cannot find module" Error

Run `npm install` in the project root:

```bash
cd /home/julian/Documents/Development/MODUS/create-modus-app
npm install
```

### Permission Denied

Make sure you have write permissions to the target directory, or use `/tmp/` for testing.

### Template Not Found

Verify templates exist:

```bash
ls templates/react/package.json
ls templates/angular/package.json
```

## Before Publishing

Run the full test suite and verify everything works:

```bash
# Run tests
npm test

# Test all CLI commands
node bin/create-modus-app.js --help
node bin/create-modus-app.js --info
node bin/create-modus-app.js test --framework react --dry-run
node bin/create-modus-app.js test --framework angular --dry-run

# Full integration test
node bin/create-modus-app.js /tmp/final-test --framework react --no-install
ls -la /tmp/final-test
rm -rf /tmp/final-test

# Check package contents
npm pack --dry-run
```
