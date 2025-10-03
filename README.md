# Create Modus App

Interactive CLI to scaffold Modus 2.0 web component applications for React, Vue, Angular, and HTML frameworks.

## Quick Start

```bash
npx @julianoczkowski/create-modus-app
```

## Usage

### Interactive Mode (Recommended)

```bash
npx @julianoczkowski/create-modus-app
```

This will show you a beautiful welcome screen and guide you through:

1. Framework selection (React, Vue, Angular, or HTML)
2. Project name input
3. Template cloning
4. Optional dependency installation

### Command Line Options

```bash
# Specify project name
npx @julianoczkowski/create-modus-app my-awesome-app

# Specify framework
npx @julianoczkowski/create-modus-app my-app --framework vue

# Skip dependency installation
npx @julianoczkowski/create-modus-app my-app --no-install

# Show help
npx @julianoczkowski/create-modus-app --help

# Show version
npx @julianoczkowski/create-modus-app --version
```

## Supported Frameworks

| Framework      | Description                                                                                  | Template Repository                 |
| -------------- | -------------------------------------------------------------------------------------------- | ----------------------------------- |
| ⚛️ **React**   | Build with React and Modus components                                                        | `julianoczkowski/modus-react-app`   |
| 💚 **Vue**     | Build with Vue 3 and Modus components                                                        | `julianoczkowski/modus-vue-app`     |
| 🅰️ **Angular** | Build with Angular and Modus components                                                      | `julianoczkowski/modus-angular-app` |
| 🎓 **HTML**    | Vanilla JavaScript with Modus components<br/>_(Beginner Friendly - No build tools required)_ | `julianoczkowski/modus-html-app`    |

## What It Does

1. **Clones** complete, pre-configured template repositories
2. **Updates** project name in `package.json`
3. **Optionally installs** dependencies using your preferred package manager (npm/yarn/pnpm)
4. **Shows** helpful next steps

## Template Repositories

Each template repository contains:

- Complete `package.json` with all dependencies
- Pre-configured build tools (if applicable)
- Example Modus components
- README with setup instructions
- All necessary configuration files

## Requirements

- Node.js 18 or higher
- Git (for cloning templates)

## Development

```bash
# Clone this repository
git clone https://github.com/julianoczkowski/create-modus-app.git
cd create-modus-app

# Install dependencies
npm install

# Test locally
npm run dev

# Test help command
node bin/create-modus-app.js --help
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Julian Oczkowski

## Related

- [Modus Web Components Documentation](https://modus-web-components.trimble.com)
- [Trimble Modus Design System](https://modus.trimble.com)

---

**Made with ❤️ for the Modus community**
