# NPM Deployment Guide

This document describes the npm deployment setup for `@julianoczkowski/create-trimble-app` using GitHub Actions with OIDC Trusted Publishers.

## Overview

The package is deployed to npm using **Trusted Publishers (OIDC)** - a secure, token-free authentication method that eliminates the need for long-lived npm tokens.

| Item | Value |
|------|-------|
| Package name | `@julianoczkowski/create-trimble-app` |
| npm URL | https://www.npmjs.com/package/@julianoczkowski/create-trimble-app |
| GitHub repo | https://github.com/julianoczkowski/create-trimble-app |
| Workflow file | `.github/workflows/publish.yml` |
| Authentication | OIDC Trusted Publishers (no tokens) |

---

## How It Works

### OIDC Trusted Publishers

Instead of storing npm tokens as GitHub secrets, we use OpenID Connect (OIDC) authentication:

1. When the GitHub Actions workflow runs, GitHub generates a temporary OIDC token
2. The workflow exchanges this token with npm for temporary publish credentials
3. Credentials are job-specific and expire immediately after use
4. No static tokens are ever stored or rotated

### Workflow Triggers

The publish workflow (`.github/workflows/publish.yml`) triggers on:
- **Git tags** matching `v*` (e.g., `v2.0.1`, `v2.1.0`)
- **Manual dispatch** via GitHub Actions UI

---

## Publishing a New Version

### Automated Publishing (Recommended)

```bash
# 1. Bump version (creates git commit and tag)
npm version patch   # For bug fixes (2.0.0 -> 2.0.1)
npm version minor   # For new features (2.0.0 -> 2.1.0)
npm version major   # For breaking changes (2.0.0 -> 3.0.0)

# 2. Push with tags (triggers GitHub Actions)
git push origin main --follow-tags
```

The workflow will automatically:
1. Run tests on Node.js 18, 20, 22
2. Run security audit
3. Verify CLI functionality
4. Verify bundled templates exist
5. Publish to npm with provenance attestation
6. Create a GitHub release

### Manual Publishing (Not Recommended)

If you need to publish manually:

```bash
npm login
npm publish --access public
```

Note: Manual publishing requires 2FA or a granular access token with "bypass 2FA" enabled.

---

## User Installation Commands

### Using npx (Recommended for most users)

```bash
# Interactive mode
npx @julianoczkowski/create-trimble-app

# With project name and framework
npx @julianoczkowski/create-trimble-app my-app --framework react

# Preview without creating files
npx @julianoczkowski/create-trimble-app my-app --dry-run
```

### Global Installation

```bash
# Install globally
npm install -g @julianoczkowski/create-trimble-app

# Then use directly
create-trimble-app my-app --framework react
```

### CLI Options

| Option | Description |
|--------|-------------|
| `--framework <name>` | Specify framework (react, angular) |
| `--current-folder` | Install in current directory |
| `--dry-run` | Preview without making changes |
| `--verbose` | Enable verbose output |
| `--info` | Show CLI information |
| `--no-install` | Skip dependency installation |
| `-v, --version` | Display version number |
| `-h, --help` | Display help |

---

## Known Issues

### Trimble Artifactory Configuration Conflicts

If you have Trimble artifactory configured in your npm settings, you may see warnings like:

```
npm warn Unknown user config "always-auth" (//artifactory.trimble.tools/...)
```

**Impact:**
- `npx` commands may fail with `command not found`
- Global install (`npm install -g`) works correctly

**Workaround:**
Use global installation instead of npx:
```bash
npm install -g @julianoczkowski/create-trimble-app
create-trimble-app --help
```

**Root cause:**
The Trimble artifactory configuration in `~/.npmrc` includes `always-auth` settings that newer npm versions don't recognize, causing npx to behave unexpectedly.

**Permanent fix (if desired):**
Remove or update the deprecated `always-auth` entries in your `~/.npmrc` file.

### npx Cache Issues

If npx returns stale results:

```bash
# Clear npx cache
rm -rf ~/.npm/_npx

# Retry with explicit version
npx -y @julianoczkowski/create-trimble-app@latest --help
```

---

## Trusted Publisher Setup (One-Time)

This was already configured, but for reference:

### npm Portal Configuration

1. Navigate to: https://www.npmjs.com/package/@julianoczkowski/create-trimble-app/access
2. Scroll to "Trusted Publishers" section
3. Configure:
   - **Publisher:** GitHub Actions
   - **Organization or user:** `julianoczkowski`
   - **Repository:** `create-trimble-app`
   - **Workflow filename:** `publish.yml` (exact match, case-sensitive)
   - **Environment name:** (leave empty)

### GitHub Workflow Requirements

The workflow must have:
```yaml
permissions:
  contents: write
  id-token: write  # Required for OIDC
```

And use Node.js 20+ with npm updated:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "20"
    registry-url: "https://registry.npmjs.org"
    scope: "@julianoczkowski"

- name: Update npm to latest (required for OIDC)
  run: npm install -g npm@latest
```

---

## Troubleshooting

### Publishing Fails with 404

**Cause:** npm couldn't match your workflow to the Trusted Publisher configuration.

**Fix:** Verify in npm portal that:
- Organization/user matches exactly: `julianoczkowski`
- Repository matches exactly: `create-trimble-app`
- Workflow filename matches exactly: `publish.yml`

### Publishing Fails with 403

**Cause:** Authentication issue or 2FA required.

**Fix for automated publishing:** Ensure Trusted Publisher is configured and workflow has `id-token: write` permission.

**Fix for manual publishing:** Use `npm login` and provide 2FA code, or create a granular token with "bypass 2FA" enabled.

### Tests Fail in CI

Check the GitHub Actions logs for specific errors. Common issues:
- Missing template files
- Node.js version incompatibility
- npm audit finding high-severity vulnerabilities

---

## Security Notes

### Why OIDC Trusted Publishers?

| Aspect | Old (Token-based) | New (OIDC) |
|--------|-------------------|------------|
| Authentication | Long-lived NPM_TOKEN secret | Temporary OIDC credentials |
| Token management | Manual rotation every 90 days max | None required |
| Provenance | Must add `--provenance` flag | Automatic |
| Security | Token could be leaked | No token to leak |
| npm compliance | Classic tokens revoked Dec 2025 | Fully compliant |

### npm Security Timeline (2025)

- **September 2025:** npm announced security changes
- **November 2025:** Classic token creation disabled
- **December 9, 2025:** All classic tokens permanently revoked
- **Going forward:** Only granular tokens (90 day max) or OIDC allowed

---

## Files Reference

| File | Purpose |
|------|---------|
| `.github/workflows/publish.yml` | Automated publish workflow |
| `.github/workflows/ci.yml` | CI testing workflow |
| `package.json` | Package configuration with `publishConfig` |
| `PUBLISHING.md` | Publishing checklist and instructions |
| `.npmignore` | Files excluded from npm package |

---

## Useful Commands

```bash
# Check current version
npm version

# View published package info
npm view @julianoczkowski/create-trimble-app

# View all published versions
npm view @julianoczkowski/create-trimble-app versions

# Preview what would be published
npm pack --dry-run

# Test CLI locally
node bin/create-trimble-app.js --help

# Run tests
npm test

# Run security audit
npm audit
```

---

## References

- [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers/)
- [npm OIDC Announcement](https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/)
- [npm Classic Tokens Revoked](https://github.blog/changelog/2025-12-09-npm-classic-tokens-revoked-session-based-auth-and-cli-token-management-now-available/)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
