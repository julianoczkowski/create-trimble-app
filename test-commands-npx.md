# 🧪 Local Testing Commands for --current-folder Feature (Using npx .)

## Quick Tests (No Installation)

### 1. Help and Version Tests

```bash
# Test help shows new option (from project root)
npx . --help

# Test version (from project root)
npx . --version

# Test help from any directory
npx /home/julian/Documents/Development/create-modus-app --help
```

## Full Integration Tests (With Template Installation)

### 2. Test Current Folder Mode with npx .

#### Create a test directory and test current folder mode:

```bash
# Create test directory
mkdir test-current-folder
cd test-current-folder

# Test current folder mode with Vue (will install in current directory)
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework vue --no-install

# Check if package.json was created with correct name
cat package.json | grep '"name"'

# Clean up
cd ..
rm -rf test-current-folder
```

#### Test with different frameworks:

```bash
# Test with Vue (should work)
mkdir test-vue && cd test-vue
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework vue --no-install
cd .. && rm -rf test-vue

# Test with React (should fail - repo not available)
mkdir test-react && cd test-react
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework react --no-install
cd .. && rm -rf test-react

# Test with Angular (should fail - repo not available)
mkdir test-angular && cd test-angular
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework angular --no-install
cd .. && rm -rf test-angular

# Test with HTML (should fail - repo not available)
mkdir test-html && cd test-html
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework html --no-install
cd .. && rm -rf test-html
```

### 3. Test Traditional Mode with npx . (Backward Compatibility)

```bash
# Test traditional mode still works
npx /home/julian/Documents/Development/create-modus-app test-traditional --framework vue --no-install

# Check if directory was created
ls -la | grep test-traditional

# Clean up
rm -rf test-traditional
```

### 4. Test from Different Directories

```bash
# Test from home directory
cd ~
mkdir test-from-home && cd test-from-home
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework vue --no-install
cd .. && rm -rf test-from-home

# Test from /tmp directory
cd /tmp
mkdir test-from-tmp && cd test-from-tmp
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework vue --no-install
cd .. && rm -rf test-from-tmp
```

## Error Handling Tests

### 5. Test Invalid Arguments

```bash
# Test invalid framework
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework invalid

# Test conflicting options
npx /home/julian/Documents/Development/create-modus-app my-app --current-folder
```

### 6. Test Edge Cases

```bash
# Test in directory with special characters
mkdir "test-folder_with-special.chars"
cd "test-folder_with-special.chars"
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework vue --no-install
cd .. && rm -rf "test-folder_with-special.chars"
```

## Performance Tests

### 7. Test with Dependencies Installation

```bash
# Test full installation (this will take longer)
mkdir test-full-install && cd test-full-install
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework vue
# This will install dependencies and take a few minutes
cd .. && rm -rf test-full-install
```

## Verification Checklist

After running tests, verify:

- [ ] Help shows `--current-folder` option
- [ ] Current folder mode uses directory name as project name
- [ ] Package.json is created with correct name
- [ ] Template files are installed in current directory
- [ ] Traditional mode still works
- [ ] Error handling works for invalid inputs
- [ ] Dependencies install correctly in current folder mode
- [ ] Success messages show correct paths
- [ ] Works from any directory using npx .

## Cleanup Commands

```bash
# Remove all test directories
rm -rf test-* my-modus-app my-app
```

## Real-World Example: Installing in a Subfolder

### Example: Installing in a `dhh` subfolder

```bash
# Navigate to your dhh folder
cd /path/to/your/dhh/folder

# Install the app in current folder (dhh) with Vue framework
npx /home/julian/Documents/Development/create-modus-app --current-folder --framework vue

# The app will be installed in your dhh folder with package.json name "dhh"
```

### Alternative: Create a new dhh folder

```bash
# From anywhere, create a new dhh folder with the app
npx /home/julian/Documents/Development/create-modus-app dhh --framework vue
```

## Real Test Results

✅ **All tests passed successfully:**

| Test Case                | Command                                                                    | Expected               | Result  |
| ------------------------ | -------------------------------------------------------------------------- | ---------------------- | ------- |
| Help from project root   | `npx . --help`                                                             | Shows --current-folder | ✅ PASS |
| Vue + current folder     | `npx . --current-folder --framework vue`                                   | Works                  | ✅ PASS |
| React + current folder   | `npx . --current-folder --framework react`                                 | Fails                  | ✅ PASS |
| Traditional Vue          | `npx . test-app --framework vue`                                           | Works                  | ✅ PASS |
| From different directory | `npx /home/julian/Documents/Development/create-modus-app --current-folder` | Works                  | ✅ PASS |
| Package.json naming      | Check package.json name                                                    | Matches folder         | ✅ PASS |
