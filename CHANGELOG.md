# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-28

### Added

- **Bundled Templates** - Templates now included directly in npm package
  - No external network dependencies at runtime
  - Works completely offline
  - Faster project creation (local file copy)
  - More secure - no supply chain risks from external repos

- **Developer Experience**
  - Commander.js for robust CLI argument parsing
  - `--dry-run` mode to preview changes without executing
  - `--verbose` flag for debugging output
  - `--info` flag to show CLI information
  - Update notifier for new CLI versions

- **Testing**
  - Comprehensive test suite with Vitest
  - Unit tests for utilities
  - Integration tests for templates

- **CI/CD**
  - GitHub Actions workflow for PR testing
  - Security audit in CI pipeline
  - Automated npm publishing with provenance

### Changed

- Templates are now bundled instead of downloaded from GitHub
- Simplified framework options to React and Angular only
- Removed `degit` dependency (no longer needed)
- Version bumped to 2.0.0 for architecture change

### Removed

- `--offline` flag (offline is now the default and only mode)
- External template downloads via degit
- SHA256 checksum verification (not needed with bundled templates)

## [1.0.0] - Previous Release

### Added

- Initial release
- Interactive CLI with framework selection
- Support for React, Vue, Angular, and HTML templates
- Template cloning via degit
- Automatic dependency installation
- Package manager detection (npm, yarn, pnpm)

---

For more information, see the [GitHub releases](https://github.com/julianoczkowski/create-modus-app/releases).
