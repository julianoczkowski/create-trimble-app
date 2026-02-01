# Security Policy

## Supported Versions

We actively support the following versions of Create Modus App with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Create Modus App team takes security seriously. We appreciate your efforts to responsibly disclose security vulnerabilities.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

📧 **julian_oczkowski@trimble.com**

### What to Include

Please include the following information in your report:

- **Type of issue** (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths** of source file(s) related to the manifestation of the issue
- **Location** of the affected source code (tag/branch/commit or direct URL)
- **Step-by-step instructions** to reproduce the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact** of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: We will acknowledge receipt of your vulnerability report within **48 hours**.
- **Investigation**: We will investigate and validate the reported vulnerability within **5 business days**.
- **Resolution**: Critical vulnerabilities will be addressed within **7 days**, while lower-severity issues will be resolved within **30 days**.
- **Disclosure**: We will coordinate with you on the disclosure timeline.

### What to Expect

1. **Acknowledgment**: We'll confirm receipt of your report
2. **Investigation**: We'll investigate and reproduce the issue
3. **Resolution**: We'll develop and test a fix
4. **Release**: We'll release a security update
5. **Disclosure**: We'll publicly disclose the vulnerability (with your permission)

## Security Considerations

### CLI Security

The Create Modus App CLI performs the following operations that have security implications:

- **Network requests** to clone template repositories from GitHub
- **File system operations** to create project directories and files
- **Process execution** for dependency installation (npm/yarn/pnpm)
- **User input handling** for project names and configuration

### Template Repository Security

- All template repositories are maintained by trusted sources
- Templates are cloned using HTTPS from verified GitHub repositories
- No executable code is run from templates during scaffolding

### Dependency Security

- We regularly audit and update CLI dependencies
- Template repositories include security-audited dependencies
- Users are encouraged to run `npm audit` on generated projects

### Best Practices for Users

When using Create Modus App:

1. **Verify the source**: Only use the official npm package `@julianoczkowski/create-trimble-app`
2. **Check project names**: Avoid special characters or paths that could cause issues
3. **Review generated code**: Inspect the scaffolded project before running
4. **Update dependencies**: Keep generated project dependencies up to date
5. **Use secure networks**: Avoid using the CLI on untrusted networks

## Vulnerability Disclosure Policy

We follow responsible disclosure practices:

- **Coordination**: We work with security researchers to understand and address issues
- **Attribution**: We provide credit to security researchers (with their permission)
- **Transparency**: We publish security advisories for significant vulnerabilities
- **Timeline**: We aim to resolve critical issues quickly while ensuring thorough testing

## Security Updates

Security updates will be:

- Released as patch versions (e.g., 1.0.1, 1.0.2)
- Announced through GitHub Security Advisories
- Documented in the CHANGELOG
- Tagged with security labels in release notes

## Contact

For security-related questions or concerns:

- **Email**: julian_oczkowski@trimble.com
- **Subject**: [SECURITY] Create Modus App - [Brief Description]

For general questions, please use the normal GitHub issues or discussions.

## Acknowledgments

We thank the security research community for helping keep Create Modus App and our users safe.

---

**Note**: This security policy applies specifically to the Create Modus App CLI. For security issues related to generated projects or template repositories, please refer to the security policies of those respective projects.
