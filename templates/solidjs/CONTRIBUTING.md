# Contributing Guide

Thanks for your interest in improving the Modus React App! This document describes how to get started, the standards we follow, and the best ways to collaborate with the maintainers.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating you agree to uphold these expectations.

## Getting Started

1. **Install dependencies:** `npm install`
2. **Run the development server:** `npm run dev`
3. **Run quality checks before pushing:**
   - `npm run lint`
   - `npm run type-check`
   - `npm run lint:colors`

> ℹ️ We use Husky and lint-staged to enforce key checks on commit.

## How to Contribute

### Reporting Issues

- Search existing issues (open and closed) before filing a new one.
- Provide clear reproduction steps, expected vs. actual results, and environment details (OS, browser, Node.js version).
- Use the provided issue templates whenever possible.

### Proposing Enhancements

- Open an issue to discuss the problem you are trying to solve before submitting a pull request.
- Describe the motivation, alternatives considered, and any potential drawbacks.
- Be ready to iterate based on maintainer feedback.

### Submitting Pull Requests

1. Fork the repository and create a branch (`git checkout -b feature/amazing-improvement`).
2. Make your changes with appropriate tests and documentation.
3. Run the full quality suite (`npm run lint`, `npm run type-check`, and the Modus-specific lint commands).
4. Update any relevant docs or examples.
5. Submit a pull request that references related issues and summarizes your changes.
6. Ensure the GitHub Actions CI workflow passes before requesting review.

### Commit Messages

- Use clear, descriptive commit messages (e.g. `feat: add new theme toggle component`).
- Keep commits focused; smaller, cohesive commits are easier to review.

### Style Guidelines

- Follow the TypeScript configuration provided by the project.
- Prefer functional React components and hooks.
- Use the Modus design tokens and lint rules for styling.
- Keep documentation changes in Markdown lint-friendly format (wrap at ~100 characters when practical).

## Communication

- GitHub issues and pull requests are the primary channel for project discussions.
- Security vulnerabilities should be reported privately—see [SECURITY.md](./SECURITY.md).
- For general questions, open a discussion thread if enabled or reach out via issues.

## Release Process

Maintainers cut releases from the `main` branch once all required checks pass. Release notes summarize major changes, deprecations, and any security considerations.

We appreciate every contribution, no matter the size. Thank you for helping us improve the Modus Next.js App!
