# Security Policy

We take the security of the Modus Next.js App seriously and appreciate the community's help in keeping it safe for everyone.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | ✅ Full support    |
| < 1.0   | ❌ Not supported   |

Security fixes are released as patch versions on the latest minor release line.

## Reporting a Vulnerability

If you believe you have found a security vulnerability, please report it responsibly:

1. **Email:** [julian_oczkowski@trimble.com](mailto:julian_oczkowski@trimble.com)
2. **Subject line:** `SECURITY: <short summary>`
3. **Include:**
   - Steps to reproduce the issue
   - The potential impact and severity
   - Any suggested remediation guidance
   - Your preferred contact information for follow-up

Please **do not** disclose the issue publicly until it has been addressed. We aim to acknowledge new reports within two business days and to provide regular status updates until resolution.

## Preferred Languages

Security reports can be written in English or Polish. We will do our best to work with researchers in their preferred language.

## Coordinated Disclosure

We follow coordinated disclosure best practices. If a fix requires a coordinated release, we will work with the reporter on an appropriate disclosure timeline and credit any researcher who follows this process (with their permission).

## Security Best Practices for Contributors

- Keep dependencies up to date and run `npm audit` before submitting pull requests.
- Never commit secrets or credentials. Use environment variables for local testing.
- Validate and sanitize any user-provided input in new examples or demos.
- Prefer secure defaults (HTTPS URLs, strict security headers, etc.) in documentation and configuration changes.

## Security Best Practices for Maintainers

- Review dependency alerts in GitHub's security tab promptly.
- Run the CI pipeline (including security audit) before cutting releases.
- Rotate credentials for automation or deployment infrastructure on a regular cadence.
- Document any security-impacting changes in the release notes.

Thank you for helping us keep the Modus Next.js App secure!
