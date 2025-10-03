# 📋 Modus 2.0 Scaffolding Tool - Implementation Plan (Simplified)

## 🎯 Project Overview

Create an NPM package that provides an interactive CLI to scaffold Modus 2.0 web component applications for React, Vue, Angular, and HTML frameworks. The CLI clones complete, pre-configured template repositories that already contain their own `package.json` files.

---

## 📦 Core Dependencies Required

### Runtime Dependencies

```json
{
  "prompts": "^2.4.2", // Interactive CLI prompts (already in your setup)
  "chalk": "^5.3.0", // Terminal styling
  "ora": "^8.0.1", // Loading spinners
  "degit": "^2.8.4", // Clone git repos without history
  "fs-extra": "^11.2.0", // Enhanced file system operations
  "execa": "^8.0.1" // Better child process execution
}
```

### Dev Dependencies

```json
{
  "@types/prompts": "^2.4.9",
  "@types/fs-extra": "^11.0.4"
}
```

---

## 🏗️ Project Structure

```
@julianoczkowski/create-modus-app/
├── .github/
│   └── workflows/
│       └── publish.yml           # Auto-publish to NPM
├── templates/
│   └── config.json              # Framework configurations (simplified)
├── src/
│   ├── cli.js                   # Main CLI entry point
│   ├── scaffold.js              # Core scaffolding logic
│   ├── frameworks.js            # Framework definitions
│   ├── utils/
│   │   ├── git.js              # Git operations (degit)
│   │   ├── file.js             # File operations (minimal)
│   │   ├── install.js          # Dependency installation
│   │   └── logger.js           # Styled console output
├── bin/
│   └── create-modus-app.js     # Binary executable
├── package.json
├── .npmignore
├── .gitignore
└── README.md
```

---

## 🎨 Framework Configurations

### All Four Template Repositories:

1. **React** - `https://github.com/julianoczkowski/modus-react-app`
2. **Vue** - `https://github.com/julianoczkowski/modus-vue-app`
3. **Angular** - `https://github.com/julianoczkowski/modus-angular-app`
4. **HTML** - `https://github.com/julianoczkowski/modus-html-app`

**Each template repository contains:**

- Complete `package.json` with all dependencies
- Pre-configured build tools (if applicable)
- Example components
- README with setup instructions
- All necessary configuration files

---

## 📝 Simplified Configuration File

### `templates/config.json` (Minimal Approach)

```json
{
  "frameworks": {
    "react": {
      "name": "React",
      "description": "Build with React and Modus components",
      "repository": "julianoczkowski/modus-react-app",
      "supportsTypeScript": true,
      "badge": "⚛️"
    },
    "vue": {
      "name": "Vue",
      "description": "Build with Vue 3 and Modus components",
      "repository": "julianoczkowski/modus-vue-app",
      "supportsTypeScript": true,
      "badge": "💚"
    },
    "angular": {
      "name": "Angular",
      "description": "Build with Angular and Modus components",
      "repository": "julianoczkowski/modus-angular-app",
      "supportsTypeScript": true,
      "badge": "🅰️"
    },
    "html": {
      "name": "HTML",
      "description": "Vanilla JavaScript with Modus components",
      "repository": "julianoczkowski/modus-html-app",
      "supportsTypeScript": false,
      "badge": "🎓",
      "note": "Beginner Friendly - No build tools required"
    }
  }
}
```

### **What Each Field Does:**

- `name` - Display name in the CLI
- `description` - Shown in the framework picker
- `repository` - GitHub repo to clone from (user/repo format)
- `supportsTypeScript` - Whether to show TypeScript option
- `badge` - Emoji for visual appeal
- `note` - Additional context (optional)

**What's NOT needed:**

- ~~`package`~~ - Already in template's package.json
- ~~`packageManager`~~ - Can detect or ask user during install
- ~~`branch`~~ - Defaults to `main`
- ~~`defaultTypeScript`~~ - Not necessary for simple flow

---

## 🔑 Simplified Implementation Approach

### **Core Workflow:**

1. **User runs CLI** → Show framework picker
2. **User selects framework** → Clone the repository
3. **Optionally customize** → Update project name in package.json
4. **Optionally install** → Run `npm install` in the cloned directory
5. **Done!** → Show success message with next steps

### **What the CLI Does:**

- ✅ Clones complete templates using `degit`
- ✅ Optionally renames project in `package.json`
- ✅ Optionally runs `npm install`
- ✅ Shows helpful next steps

### **What the CLI Does NOT Do:**

- ❌ Modify dependencies (already in template)
- ❌ Generate files from scratch (templates are complete)
- ❌ Add/remove build tools (templates come pre-configured)
- ❌ Manage TypeScript setup (templates handle it)

---

## 🎯 CLI User Experience

### Interactive Mode (Default)

```bash
npx @julianoczkowski/create-modus-app
```

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║  ███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗███████╗          ║
║  ████╗ ████║██╔═══██╗██╔══██╗██║   ██║██╔════╝          ║
║  ██╔████╔██║██║   ██║██║  ██║██║   ██║███████╗          ║
║  ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║╚════██║          ║
║  ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝███████║          ║
║  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝          ║
║                                                          ║
║           Create Your Modus 2.0 Application             ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

🎯 Select Your Framework:
==================================================

1. ⚛️  React       - Build with React and Modus components
2. 💚 Vue         - Build with Vue 3 and Modus components
3. 🅰️  Angular     - Build with Angular and Modus components
4. 🎓 HTML        - Vanilla JavaScript with Modus components
                   (Beginner Friendly - No build tools required)

👉 Which framework? (1-4): _
```

### Non-Interactive Mode

```bash
npx @julianoczkowski/create-modus-app my-app --framework react
npx @julianoczkowski/create-modus-app my-app --framework vue --no-install
npx @julianoczkowski/create-modus-app demo --framework html
```

---

## 🔧 Simplified Code Structure

### `src/scaffold.js` (Simplified Core Logic)

```javascript
import prompts from "prompts";
import degit from "degit";
import ora from "ora";
import chalk from "chalk";
import { existsSync } from "fs";
import { join } from "path";
import { loadFrameworks } from "./frameworks.js";
import { updatePackageJson } from "./utils/file.js";
import { installDependencies } from "./utils/install.js";

export async function scaffold(options) {
  console.log(
    chalk.cyan(`
╔══════════════════════════════════════════════════════════╗
║           Create Your Modus 2.0 Application             ║
╚══════════════════════════════════════════════════════════╝
  `)
  );

  const frameworks = loadFrameworks();

  // 1. Framework Selection
  const { framework } = await prompts({
    type: "select",
    name: "framework",
    message: "Select your framework:",
    choices: frameworks.map((f) => ({
      title: `${f.badge} ${f.name}`,
      description: f.description + (f.note ? ` (${f.note})` : ""),
      value: f.id,
    })),
  });

  if (!framework) {
    console.log(chalk.yellow("👋 Cancelled"));
    process.exit(0);
  }

  const config = frameworks.find((f) => f.id === framework);

  // 2. Project Name
  const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: "Project name:",
    initial: "my-modus-app",
    validate: (name) => {
      if (!name) return "Project name is required";
      if (!/^[a-z0-9-_]+$/i.test(name)) {
        return "Project name can only contain letters, numbers, dashes and underscores";
      }
      if (existsSync(name)) {
        return `Directory "${name}" already exists`;
      }
      return true;
    },
  });

  if (!projectName) {
    console.log(chalk.yellow("👋 Cancelled"));
    process.exit(0);
  }

  // 3. Clone Template
  const spinner = ora(`Downloading ${config.name} template...`).start();

  try {
    const emitter = degit(config.repository, {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(projectName);
    spinner.succeed(chalk.green(`✓ Template downloaded successfully!`));
  } catch (error) {
    spinner.fail(chalk.red(`✗ Failed to download template`));
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // 4. Update package.json with project name (optional)
  try {
    await updatePackageJson(projectName, {
      name: projectName,
    });
  } catch (error) {
    console.warn(chalk.yellow("⚠️  Could not update package.json"));
  }

  // 5. Install Dependencies (optional)
  const { install } = await prompts({
    type: "confirm",
    name: "install",
    message: "Install dependencies now?",
    initial: true,
  });

  if (install) {
    const installSpinner = ora("Installing dependencies...").start();
    try {
      await installDependencies(projectName);
      installSpinner.succeed(chalk.green("✓ Dependencies installed"));
    } catch (error) {
      installSpinner.fail(chalk.red("✗ Failed to install dependencies"));
      console.error(chalk.red(error.message));
      console.log(
        chalk.yellow(`\n💡 You can install dependencies manually by running:`)
      );
      console.log(chalk.cyan(`   cd ${projectName} && npm install`));
    }
  }

  // 6. Success Message
  console.log(
    chalk.green(`
🎉 Success! Your ${config.name} project is ready!

📁 Project created at: ${chalk.cyan(projectName)}

🚀 Next steps:
  ${chalk.cyan(`cd ${projectName}`)}
  ${!install ? chalk.cyan(`npm install`) + "\n  " : ""}${chalk.cyan(
      `npm run dev`
    )}

📚 Documentation: ${chalk.blue("https://modus-web-components.trimble.com")}
  `)
  );
}
```

### `src/utils/file.js` (Minimal File Operations)

```javascript
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export async function updatePackageJson(projectPath, updates) {
  const packageJsonPath = join(projectPath, "package.json");

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

    // Update only the name field (or other specified fields)
    Object.assign(packageJson, updates);

    writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n",
      "utf-8"
    );
  } catch (error) {
    throw new Error(`Failed to update package.json: ${error.message}`);
  }
}
```

### `src/utils/install.js` (Dependency Installation)

```javascript
import { execa } from "execa";
import { existsSync } from "fs";
import { join } from "path";

export async function installDependencies(projectPath) {
  const cwd = join(process.cwd(), projectPath);

  // Detect package manager (or default to npm)
  const packageManager = detectPackageManager(cwd);

  try {
    await execa(packageManager, ["install"], {
      cwd,
      stdio: "inherit",
    });
  } catch (error) {
    throw new Error(`Failed to install dependencies: ${error.message}`);
  }
}

function detectPackageManager(projectPath) {
  if (existsSync(join(projectPath, "yarn.lock"))) return "yarn";
  if (existsSync(join(projectPath, "pnpm-lock.yaml"))) return "pnpm";
  return "npm";
}
```

---

## 🚀 Implementation Phases (Simplified)

### **Phase 1: Core CLI Setup** (Days 1-2)

- [ ] Set up project structure
- [ ] Install dependencies
- [ ] Create basic CLI entry point
- [ ] Implement framework selection with prompts
- [ ] Create simplified `templates/config.json`

### **Phase 2: Template Cloning** (Days 3-4)

- [ ] Implement degit integration
- [ ] Add project name validation
- [ ] Test cloning all 4 templates
- [ ] Handle errors gracefully

### **Phase 3: Post-Clone Customization** (Day 5)

- [ ] Update package.json name
- [ ] Optional: Update README
- [ ] Test customization doesn't break templates

### **Phase 4: Dependency Installation** (Day 6)

- [ ] Implement optional npm install
- [ ] Detect package manager (npm/yarn/pnpm)
- [ ] Show progress during installation
- [ ] Handle installation failures gracefully

### **Phase 5: Polish & Publishing** (Days 7-8)

- [ ] Add help/version commands
- [ ] Improve error messages
- [ ] Add loading spinners and colors
- [ ] Test on different platforms
- [ ] Set up GitHub Actions
- [ ] Publish to NPM

---

## 📋 Template Repository Requirements

### **Each Template Must Include:**

```
modus-{framework}-app/
├── .gitignore                    # Standard ignore file
├── package.json                  # Complete with all dependencies
├── README.md                     # Setup and usage instructions
├── [config files]                # vite.config, tsconfig, etc.
└── src/                          # Source code
    └── [framework files]
```

### **package.json in Each Template:**

```json
{
  "name": "modus-react-app",
  "version": "0.1.0",
  "description": "Modus React application",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@trimble-oss/modus-react-components": "^latest",
    "react": "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

**Note:** The CLI will update the `name` field to match the user's project name.

---

## ⚠️ Important Considerations

### 1. **Template Maintenance**

- Templates are the source of truth
- Keep templates updated with latest Modus versions
- Test templates independently before releasing CLI updates
- Version templates alongside CLI releases

### 2. **Error Handling**

```javascript
// Essential error scenarios to handle:
- Network failures during clone
- Invalid project names
- Existing directory conflicts
- Permission issues
- NPM installation failures
- Template repository not found
- Malformed package.json in template
```

### 3. **CLI Should Be Simple**

The CLI's job is:

1. ✅ Ask what framework
2. ✅ Clone the template
3. ✅ Rename the project
4. ✅ Optionally install dependencies
5. ✅ Show next steps

**Don't add complexity** - let the templates handle everything else!

---

## 📊 What Goes Where

### **CLI Package Responsibilities:**

- Framework selection UI
- Template cloning
- Project name validation
- Basic customization (package.json name)
- Dependency installation wrapper

### **Template Repository Responsibilities:**

- All dependencies and versions
- Build tool configuration
- TypeScript setup (if applicable)
- Example components
- Styling setup
- Development scripts
- Documentation

---

## 🎯 Next Steps Checklist

### 1. **Set up CLI package**

```bash
mkdir create-modus-app
cd create-modus-app
npm init -y
npm install prompts chalk ora degit fs-extra execa
```

### 2. **Create templates (Priority Order)**

1. [ ] `julianoczkowski/modus-react-app` (Most popular)
2. [ ] `julianoczkowski/modus-vue-app`
3. [ ] `julianoczkowski/modus-html-app` (Simplest)
4. [ ] `julianoczkowski/modus-angular-app`

### 3. **Implement CLI**

- [ ] Basic framework selection
- [ ] Degit cloning
- [ ] Name customization
- [ ] Installation option

### 4. **Test & Publish**

- [ ] Test all 4 templates
- [ ] Set up GitHub Actions
- [ ] Publish to NPM

---

## 💡 Key Takeaway

**Keep it simple!** The CLI is just a friendly wrapper around:

1. `git clone` (via degit)
2. Rename project
3. `npm install`

All the real configuration, dependencies, and setup live in the **template repositories**, not in the CLI.

This approach makes the CLI:

- ✅ Easier to maintain
- ✅ Less prone to bugs
- ✅ Simpler to understand
- ✅ More flexible (templates can evolve independently)

Would you like me to help you start implementing any specific part?
