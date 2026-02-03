# Local Testing Commands for create-trimble-app

## Platform-Specific Paths

### Linux

```bash
CLI_PATH="/home/julian/Documents/Development/MODUS/create-trimble-app"
```

### macOS

```bash
CLI_PATH="/Users/julianoczkowski/Desktop/Development/create-trimble-app"
```

---

## Quick Tests (No Installation)

### 1. Help and Version Tests

```bash
# From project root directory
npx . --help
npx . --version
npx . --info

# From any directory (Linux)
npx /home/julian/Documents/Development/MODUS/create-trimble-app --help
npx /home/julian/Documents/Development/MODUS/create-trimble-app --version
npx /home/julian/Documents/Development/MODUS/create-trimble-app --info

# From any directory (macOS)
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --help
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --version
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --info

# Alternative: use node directly
node bin/create-trimble-app.js --help
node bin/create-trimble-app.js --version
node bin/create-trimble-app.js --info
```

---

## Full Integration Tests

### 2. Dry Run Tests (Preview without creating files)

```bash
# Linux
npx /home/julian/Documents/Development/MODUS/create-trimble-app my-app --framework react --dry-run
npx /home/julian/Documents/Development/MODUS/create-trimble-app my-app --framework angular --dry-run

# macOS
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app my-app --framework react --dry-run
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app my-app --framework angular --dry-run
```

### 3. Test Current Folder Mode

```bash
# Create test directory and test current folder mode

# Linux
mkdir test-current-folder && cd test-current-folder
npx /home/julian/Documents/Development/MODUS/create-trimble-app --current-folder --framework react --no-install
cat package.json | grep '"name"'
cd .. && rm -rf test-current-folder

# macOS
mkdir test-current-folder && cd test-current-folder
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --current-folder --framework react --no-install
cat package.json | grep '"name"'
cd .. && rm -rf test-current-folder
```

### 4. Test with Different Frameworks

```bash
# Linux - React
mkdir test-react && cd test-react
npx /home/julian/Documents/Development/MODUS/create-trimble-app --current-folder --framework react --no-install
cd .. && rm -rf test-react

# Linux - Angular
mkdir test-angular && cd test-angular
npx /home/julian/Documents/Development/MODUS/create-trimble-app --current-folder --framework angular --no-install
cd .. && rm -rf test-angular

# macOS - React
mkdir test-react && cd test-react
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --current-folder --framework react --no-install
cd .. && rm -rf test-react

# macOS - Angular
mkdir test-angular && cd test-angular
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --current-folder --framework angular --no-install
cd .. && rm -rf test-angular
```

### 5. Test Traditional Mode (Backward Compatibility)

```bash
# Linux
npx /home/julian/Documents/Development/MODUS/create-trimble-app test-traditional --framework react --no-install
ls -la | grep test-traditional
rm -rf test-traditional

# macOS
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app test-traditional --framework react --no-install
ls -la | grep test-traditional
rm -rf test-traditional
```

### 6. Test from Different Directories

```bash
# Linux - from home directory
cd ~
mkdir test-from-home && cd test-from-home
npx /home/julian/Documents/Development/MODUS/create-trimble-app --current-folder --framework react --no-install
cd .. && rm -rf test-from-home

# Linux - from /tmp directory
cd /tmp
mkdir test-from-tmp && cd test-from-tmp
npx /home/julian/Documents/Development/MODUS/create-trimble-app --current-folder --framework angular --no-install
cd .. && rm -rf test-from-tmp

# macOS - from home directory
cd ~
mkdir test-from-home && cd test-from-home
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --current-folder --framework react --no-install
cd .. && rm -rf test-from-home

# macOS - from /tmp directory
cd /tmp
mkdir test-from-tmp && cd test-from-tmp
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --current-folder --framework angular --no-install
cd .. && rm -rf test-from-tmp
```

---

## Error Handling Tests

### 7. Test Invalid Arguments

```bash
# Test invalid framework (should fail with helpful message)
# Linux
npx /home/julian/Documents/Development/MODUS/create-trimble-app --current-folder --framework invalid

# macOS
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --current-folder --framework invalid
```

### 8. Test Edge Cases

```bash
# Test in directory with special characters
# Linux
mkdir "test-folder_with-special.chars"
cd "test-folder_with-special.chars"
npx /home/julian/Documents/Development/MODUS/create-trimble-app --current-folder --framework react --no-install
cd .. && rm -rf "test-folder_with-special.chars"

# macOS
mkdir "test-folder_with-special.chars"
cd "test-folder_with-special.chars"
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --current-folder --framework react --no-install
cd .. && rm -rf "test-folder_with-special.chars"
```

---

## Performance Tests

### 9. Test with Full Dependencies Installation

```bash
# This will install dependencies (takes longer)

# Linux
mkdir test-full-install && cd test-full-install
npx /home/julian/Documents/Development/MODUS/create-trimble-app --current-folder --framework react
cd .. && rm -rf test-full-install

# macOS
mkdir test-full-install && cd test-full-install
npx /Users/julianoczkowski/Desktop/Development/create-trimble-app --current-folder --framework react
cd .. && rm -rf test-full-install
```

---

## Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## Verification Checklist

After running tests, verify:

- [ ] `--help` shows all options including `--current-folder`
- [ ] `--info` shows correct repo URLs (modus-react-app, modus-angular-app)
- [ ] `--version` shows current version
- [ ] Current folder mode uses directory name as project name
- [ ] Package.json is created with correct name
- [ ] Template files are installed correctly
- [ ] Traditional mode (with project name) still works
- [ ] Error handling works for invalid inputs
- [ ] Dependencies install correctly (husky doesn't break)
- [ ] Success messages show correct paths
- [ ] Works from any directory

---

## Cleanup Commands

```bash
# Remove all test directories
rm -rf test-* my-modus-app my-app
```

---

## Available Frameworks

| Framework | Description                         |
| --------- | ----------------------------------- |
| `react`   | React + Vite + Modus 2.0 Components |
| `angular` | Angular + Modus 2.0 Web Components  |

---

## Test Results

| Test Case                   | Expected         | Status |
| --------------------------- | ---------------- | ------ |
| Help shows --current-folder | Shows option     | ✅     |
| Info shows correct URLs     | trimble-app repo | ✅     |
| React + current folder      | Works            | ✅     |
| Angular + current folder    | Works            | ✅     |
| Traditional mode            | Works            | ✅     |
| Package.json naming         | Matches folder   | ✅     |
| Dry-run mode                | Preview only     | ✅     |
| Invalid framework           | Error message    | ✅     |
