# Template Health Report

> Auto-generated on 2026-03-23. Do not edit manually.
> Run `node scripts/generate-template-health.js` to regenerate.

## Overview

| | **React** | **SolidJS** | **Angular** |
|---|---|---|---|
| Framework | ^19.1.1 | ^1.9.11 | ^20.3.0 |
| Bundler | Vite ^7.1.7 | Vite ^7.1.7 | Angular CLI ^20.3.8 |
| Modus WC | ^1.0.6-react19 | ^1.0.7 | ^1.0.6-ng19 |
| Modus Icons | ^1.18.1 | ^1.18.1 | ^1.18.0 |
| Tailwind | ^3.4.18 | ^3.4.18 | ^4.1.16 |
| Components | 47 | 47 | 48 |
| Demos | 46 | 46 | 45 |
| Cursor Rules | 43 | 45 | 50 |
| Lint Scripts | 7 | 7 | 6 |
| Pre-commit Checks | 8 | 8 | 7 |
| run-all-checks.js | Yes | Yes | Yes |
| CLAUDE.md | Yes | Yes | Yes |
| README.md | Yes | Yes | Yes |
| Last Modified | 2026-03-23 | 2026-03-23 | 2026-03-23 |

## Lint Scripts by Template

### React

| Script | Command |
|--------|--------|
| `lint:icons` | `npm run lint:icons` |
| `lint:semantic` | `npm run lint:semantic` |
| `lint:colors` | `npm run lint:colors` |
| `lint:styles` | `npm run lint:styles` |
| `lint:borders` | `npm run lint:borders` |
| `lint:opacity` | `npm run lint:opacity` |
| `lint:icon-names` | `npm run lint:icon-names` |

### SolidJS

| Script | Command |
|--------|--------|
| `lint:icons` | `npm run lint:icons` |
| `lint:semantic` | `npm run lint:semantic` |
| `lint:colors` | `npm run lint:colors` |
| `lint:styles` | `npm run lint:styles` |
| `lint:borders` | `npm run lint:borders` |
| `lint:opacity` | `npm run lint:opacity` |
| `lint:icon-names` | `npm run lint:icon-names` |

### Angular

| Script | Command |
|--------|--------|
| `lint:colors` | `npm run lint:colors` |
| `lint:styles` | `npm run lint:styles` |
| `lint:borders` | `npm run lint:borders` |
| `lint:opacity` | `npm run lint:opacity` |
| `lint:icons` | `npm run lint:icons` |
| `lint:icon-names` | `npm run lint:icon-names` |

## Notes

- **Lint Scripts**: Number of individual `lint:*` scripts (excluding `lint:all`)
- **Pre-commit Checks**: Number of `npm run` commands in `.husky/pre-commit`
- **run-all-checks.js**: Runs all checks and shows summary table (doesn't stop at first failure)
- Angular does not include `lint:semantic` because the template uses standard semantic HTML
- React and SolidJS use the div-only approach with 8 lint checks; Angular uses 7
