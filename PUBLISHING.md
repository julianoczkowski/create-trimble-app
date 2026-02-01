# Publishing Checklist

## Before Publishing

- [x] Project runs successfully (`npm run dev`)
- [x] Tests pass (`npm test`)
- [x] Documentation is complete (README.md)
- [x] Package.json is configured correctly
- [x] .npmignore excludes development files
- [x] Templates are bundled (templates/react, templates/angular)

## Automated Publishing (Recommended)

This project uses **Trusted Publishers (OIDC)** for secure, automated publishing via GitHub Actions. This eliminates the need for long-lived npm tokens and provides automatic provenance attestation.

### How It Works

1. **GitHub Actions Workflow**: The `.github/workflows/publish.yml` workflow automatically publishes when:
   - A version tag is pushed (e.g., `v2.0.1`)
   - Manual workflow dispatch is triggered

2. **Trusted Publisher Setup**: The workflow uses OIDC (OpenID Connect) authentication, which:
   - Uses temporary, job-specific credentials (no tokens to manage)
   - Provides automatic provenance attestation on npm
   - Eliminates token rotation requirements
   - Enhances security by removing long-lived credentials

### Initial Setup (One-Time)

**Configure Trusted Publisher in npm Portal:**

1. Navigate to package settings: https://www.npmjs.com/package/@julianoczkowski/create-trimble-app/access
2. Scroll to "Trusted Publishers" section
3. Click "Configure Trusted Publisher"
4. Configure:
   - **Publisher:** GitHub Actions
   - **Organization or user:** `julianoczkowski`
   - **Repository:** `create-trimble-app`
   - **Workflow filename:** `publish.yml`
   - **Environment name:** (leave empty)
5. Click "Set up connection" to establish trust

### Publishing a New Version

1. Update version in `package.json`:
   ```bash
   npm version patch  # or minor, or major
   ```

2. Push the version tag:
   ```bash
   git push origin main --follow-tags
   ```

3. The GitHub Actions workflow will automatically:
   - Run tests across Node.js 18, 20, 22
   - Verify bundled templates exist
   - Test CLI functionality
   - Publish to npm with provenance
   - Create a GitHub release

**Note:** The workflow uses OIDC authentication - no npm tokens are required!

## Manual Publishing Steps

For manual publishing (not recommended for CI/CD):

### 1. Verify Package Contents

```bash
npm pack --dry-run
```

This shows what files will be included in the package.

### 2. Login to NPM

**Interactive Login Only**
```bash
npm login
```

**Note:** Token-based authentication is deprecated. Use `npm login` for manual publishing, or set up Trusted Publishers for automated publishing (recommended).

### 3. Publish

```bash
npm publish --access public
```

**Note**: The `--access public` flag is required for scoped packages (@julianoczkowski/create-trimble-app).

### 4. Verify Publication

Check that the package is available:
```bash
npm view @julianoczkowski/create-trimble-app
```

Or visit: https://www.npmjs.com/package/@julianoczkowski/create-trimble-app

### 5. Test Installation

In a different directory:
```bash
npx @julianoczkowski/create-trimble-app --help
npx @julianoczkowski/create-trimble-app my-test-app --framework react --dry-run
```

## Updating the Package

1. Update the version in `package.json`:
   - Patch release (bug fixes): `2.0.0` → `2.0.1`
   - Minor release (new features): `2.0.0` → `2.1.0`
   - Major release (breaking changes): `2.0.0` → `3.0.0`

2. Test locally:
```bash
npm test
node bin/create-trimble-app.js --help
```

3. Publish the update:
```bash
npm version patch  # creates git tag
git push origin main --follow-tags  # triggers workflow
```

## Useful Commands

```bash
# Check current version
npm version

# Bump patch version
npm version patch

# Bump minor version
npm version minor

# Bump major version
npm version major

# Unpublish a version (within 72 hours)
npm unpublish @julianoczkowski/create-trimble-app@2.0.0

# View package info
npm view @julianoczkowski/create-trimble-app

# View all versions
npm view @julianoczkowski/create-trimble-app versions
```

## Post-Publishing

After publishing, users can scaffold new projects:

### Using npx (Recommended)

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
npm install -g @julianoczkowski/create-trimble-app
create-trimble-app my-app --framework react
```

## Troubleshooting

### Authentication Errors

**For Manual Publishing:**
1. Run `npm logout`
2. Run `npm login` again
3. Ensure you have publish access to the package

**For Automated Publishing (GitHub Actions):**
1. Verify Trusted Publisher is configured in npm portal
2. Check that the workflow has `id-token: write` permission (already configured)
3. Ensure the workflow filename matches: `publish.yml` (exact match, case-sensitive)
4. Verify the repository name matches: `create-trimble-app` (exact match, case-sensitive)
5. Ensure Node.js 20+ is used (required for npm 11.5.1+ which supports OIDC)
6. Check GitHub Actions logs for specific error messages

**OIDC Authentication:**
- The workflow uses Trusted Publishers (OIDC) - no npm tokens needed
- Requires Node.js 20+ and npm 11.5.1+ for OIDC support
- If publishing fails, verify Trusted Publisher configuration in npm portal
- Ensure the GitHub Actions workflow has the correct permissions
- The workflow automatically updates npm to the latest version

### Version Already Exists

NPM doesn't allow republishing the same version. Increment the version number:
```bash
npm version patch
git push origin main --follow-tags
```

### Package Size Warning

If the package is too large:
1. Check `.npmignore` to ensure dev files are excluded
2. Run `npm pack --dry-run` to see what's included
3. Remove unnecessary files from the `files` array in package.json

## Security & Compliance

### npm Security Changes (2025)

This project complies with npm's security requirements by using **Trusted Publishers (OIDC)**:

- **No Classic Tokens**: Classic npm tokens were permanently revoked December 9, 2025
- **No Token Rotation**: OIDC uses temporary, job-specific credentials
- **Automatic Provenance**: Each published package includes provenance attestation
- **Enhanced Security**: No long-lived credentials to manage or leak

### Requirements

- **Node.js 20+**: Required for npm 11.5.1+ which supports OIDC trusted publishing
- **npm 11.5.1+**: Required for OIDC authentication (automatically updated in workflow)
- **GitHub Actions**: Must use GitHub-hosted runners (self-hosted runners not supported)

### Benefits of Trusted Publishers

- **No token management**: Eliminates the need to rotate tokens
- **Automatic provenance**: npm automatically verifies package origin
- **Better security**: Temporary credentials reduce attack surface
- **Simplified workflows**: No secrets to configure or manage
- **Compliance**: Meets npm's security requirements for 2025 and beyond

## References

- [npm Trusted Publishers](https://docs.npmjs.com/trusted-publishers/)
- [npm OIDC Announcement](https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/)
- [npm Classic Tokens Revoked](https://github.blog/changelog/2025-12-09-npm-classic-tokens-revoked-session-based-auth-and-cli-token-management-now-available/)
