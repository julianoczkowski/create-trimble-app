# Contributing to Create Modus App

Thank you for your interest in contributing to Create Modus App! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `npm install`
4. **Test** the CLI: `npm run dev`
5. **Make** your changes
6. **Test** thoroughly
7. **Submit** a pull request

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Template Repository Guidelines](#template-repository-guidelines)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful, inclusive, and constructive in all interactions.

### Our Standards

- **Be respectful** and inclusive
- **Be constructive** in feedback and discussions
- **Focus on what's best** for the community
- **Show empathy** towards other community members

## 🤝 How to Contribute

### Types of Contributions

We welcome several types of contributions:

- 🐛 **Bug reports** and fixes
- ✨ **Feature requests** and implementations
- 📚 **Documentation** improvements
- 🧪 **Testing** and quality assurance
- 🎨 **UI/UX** improvements for CLI interface
- 🔧 **Template** improvements and maintenance

### Before You Start

1. **Check existing issues** to avoid duplicates
2. **Discuss major changes** in an issue first
3. **Review the roadmap** to align with project goals
4. **Consider the scope** - keep changes focused

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **Git** for version control

### Local Development

```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/create-trimble-app.git
cd create-trimble-app

# Install dependencies
npm install

# Test the CLI locally
npm run dev

# Test with specific arguments
node bin/create-trimble-app.js --help
node bin/create-trimble-app.js test-app --framework vue
```

### Testing Your Changes

```bash
# Test interactive mode
npm run dev

# Test all frameworks
node bin/create-trimble-app.js test-react --framework react
node bin/create-trimble-app.js test-vue --framework vue
node bin/create-trimble-app.js test-angular --framework angular
node bin/create-trimble-app.js test-html --framework html

# Test command line options
node bin/create-trimble-app.js test-app --no-install
node bin/create-trimble-app.js --version
node bin/create-trimble-app.js --help
```

## 📁 Project Structure

```
create-trimble-app/
├── bin/
│   └── create-trimble-app.js      # CLI entry point
├── src/
│   ├── cli.js                   # Main CLI logic
│   ├── frameworks.js            # Framework configurations
│   ├── scaffold.js              # Project scaffolding logic
│   └── utils/
│       ├── file.js              # File operations
│       ├── git.js               # Git operations
│       ├── install.js           # Dependency installation
│       └── logger.js            # Logging utilities
├── templates/
│   └── config.json              # Template configurations
├── .github/                     # GitHub templates and workflows
├── package.json                 # Package configuration
└── README.md                    # Project documentation
```

### Key Components

- **`src/cli.js`**: Main CLI interface and argument parsing
- **`src/frameworks.js`**: Framework definitions and configurations
- **`src/scaffold.js`**: Core scaffolding logic for creating projects
- **`src/utils/`**: Utility functions for file operations, logging, etc.
- **`templates/config.json`**: Configuration for template repositories

## 📝 Coding Standards

### JavaScript Style

- Use **ES6+ features** where appropriate
- Follow **consistent naming** conventions
- Use **async/await** for asynchronous operations
- Include **JSDoc comments** for functions
- Handle **errors gracefully** with meaningful messages

### Code Examples

```javascript
/**
 * Scaffolds a new project from a template
 * @param {string} projectName - Name of the project
 * @param {string} framework - Target framework
 * @param {Object} options - Additional options
 * @returns {Promise<boolean>} Success status
 */
async function scaffoldProject(projectName, framework, options = {}) {
  try {
    // Implementation here
    return true;
  } catch (error) {
    logger.error(`Failed to scaffold project: ${error.message}`);
    return false;
  }
}
```

### Error Handling

- Use **descriptive error messages**
- Provide **actionable suggestions** when possible
- Log errors appropriately using the logger utility
- Handle network failures gracefully

### User Experience

- Keep **prompts clear** and concise
- Provide **helpful feedback** during long operations
- Use **consistent terminology** throughout
- Include **progress indicators** for time-consuming tasks

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test the following scenarios:

#### Basic Functionality

- [ ] CLI starts without errors
- [ ] Interactive mode displays all prompts correctly
- [ ] All command line arguments work as expected
- [ ] Help and version commands display correct information

#### Framework Testing

- [ ] React template scaffolds successfully
- [ ] Vue template scaffolds successfully
- [ ] Angular template scaffolds successfully
- [ ] HTML template scaffolds successfully

#### Edge Cases

- [ ] Invalid project names are handled gracefully
- [ ] Network failures are handled appropriately
- [ ] Cancelled operations clean up properly
- [ ] Existing directories are handled correctly

#### Cross-Platform Testing

- [ ] Works on Windows
- [ ] Works on macOS
- [ ] Works on Linux

### Testing Different Scenarios

```bash
# Test normal flow
node bin/create-trimble-app.js my-test-app --framework vue

# Test with no installation
node bin/create-trimble-app.js my-test-app --framework react --no-install

# Test invalid inputs
node bin/create-trimble-app.js "invalid/name" --framework vue
node bin/create-trimble-app.js my-app --framework invalid

# Test existing directory
mkdir existing-dir
node bin/create-trimble-app.js existing-dir --framework vue
```

## 🔄 Pull Request Process

### Before Submitting

1. **Create a feature branch** from `main`
2. **Make your changes** following coding standards
3. **Test thoroughly** using the testing guidelines
4. **Update documentation** if needed
5. **Write a clear commit message**

### PR Requirements

- **Fill out the PR template** completely
- **Include tests** or testing evidence
- **Update documentation** if applicable
- **Keep changes focused** on a single concern
- **Ensure CI passes** (when implemented)

### PR Review Process

1. **Automated checks** run (linting, basic tests)
2. **Maintainer review** for code quality and design
3. **Testing verification** by maintainers
4. **Feedback incorporation** if changes are requested
5. **Merge** when approved

## 🐛 Issue Guidelines

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (OS, Node.js version, etc.)
- **CLI output** including error messages
- **Framework** you were trying to use

### Feature Requests

For feature requests, please provide:

- **Problem statement** - what need does this address?
- **Proposed solution** - how should it work?
- **Use cases** - when would this be useful?
- **Implementation ideas** - any technical thoughts?

### Questions

Before asking questions:

1. **Check the README** and documentation
2. **Search existing issues** and discussions
3. **Try the help command** (`--help`)

## 🎯 Template Repository Guidelines

### Creating New Templates

If you want to contribute a new framework template:

1. **Create the template repository** following naming convention: `modus-{framework}-app`
2. **Include all necessary files** for a complete project
3. **Follow Modus design system** guidelines
4. **Add comprehensive README** with setup instructions
5. **Test the template** thoroughly
6. **Submit an issue** to discuss adding it to the CLI

### Template Requirements

- **Complete project setup** (package.json, build tools, etc.)
- **Modus web components** integration examples
- **Clear documentation** and setup instructions
- **Modern tooling** and best practices
- **Responsive design** examples
- **Accessibility** considerations

### Template Maintenance

- **Keep dependencies updated** regularly
- **Fix reported issues** promptly
- **Maintain compatibility** with latest Modus components
- **Update documentation** as needed

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Test all functionality
- [ ] Create GitHub release
- [ ] Publish to npm

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community discussions
- **Email**: julian_oczkowski@trimble.com for sensitive issues

### Response Times

- **Bug reports**: Within 2-3 business days
- **Feature requests**: Within 1 week
- **Pull requests**: Within 1 week
- **Security issues**: Within 48 hours

## 🙏 Recognition

Contributors are recognized in several ways:

- **GitHub contributors** section
- **Release notes** acknowledgments
- **Special thanks** in major releases

## 📚 Additional Resources

- [Modus Web Components Documentation](https://trimble-oss.github.io/modus-wc-2.0/main/)
- [Modus Design System](https://modus.trimble.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Semantic Versioning](https://semver.org/)

---

**Thank you for contributing to Create Modus App! Your efforts help make Modus development more accessible to everyone.** 🎉
