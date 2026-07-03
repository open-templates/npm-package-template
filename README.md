# NPM Package Template

[![npm version](https://badge.fury.io/js/@open-templates%2Fnpm-package-template.svg)](https://badge.fury.io/js/@open-templates%2Fnpm-package-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![CI/CD](https://github.com/open-templates/npm-package-template/actions/workflows/publish.yml/badge.svg)](https://github.com/open-templates/npm-package-template/actions/workflows/publish.yml)
[![Production Deployment](https://github.com/open-templates/npm-package-template/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/open-templates/npm-package-template/actions/workflows/deploy.yml)
[![Coverage](https://codecov.io/gh/open-templates/npm-package-template/branch/main/graph/badge.svg)](https://codecov.io/gh/open-templates/npm-package-template)

A modern, production-ready TypeScript npm package template with automated publishing, testing, and tooling.

> **Quick Start**: Click **Use this template** on GitHub to create your own npm package in seconds.

---

## Features

- **TypeScript (ES2022)**: Strict typing with declaration maps
- **Dual-format builds**: ESM + CommonJS via [tsup](https://tsup.egoist.dev/)
- **Vitest**: Fast native ESM tests with V8 coverage
- **ESLint flat config**: Unified `typescript-eslint` setup
- **Automated publishing**: GitHub Actions for npm and GitHub Packages (Trusted Publishing + token fallback)
- **Security**: CodeQL, dependency review, and npm audit workflows
- **Cross-platform scripts**: Node.js only — no PowerShell required
- **Documentation**: Setup guide, examples, and reusable templates folder

---

## Using This Template

### Method 1: GitHub Template (recommended)

1. Click **Use this template** on GitHub
2. Create your new repository
3. Clone and customize

### Method 2: Clone and customize

```bash
git clone https://github.com/open-templates/npm-package-template.git my-package
cd my-package
npm install
```

### Method 3: Install as reference

```bash
npm install @open-templates/npm-package-template --save-dev
```

> Installing from npm does not include all repository files (workflows, templates, docs). Use the GitHub repository for the full template.

---

## Repository layout

```
├── .github/workflows/     # GitHub Actions (CI, publish, security)
├── dist/                  # Built output (generated)
├── docs/                  # Extended documentation
├── examples/              # Usage examples
├── scripts/               # Setup and release helpers
├── src/                   # Source code and tests
├── templates/             # Blank starter files for new packages
├── eslint.config.js       # ESLint flat config
├── tsup.config.ts         # Build configuration
├── vitest.config.ts       # Test configuration
├── tsconfig.json          # TypeScript configuration
├── .node-version          # Recommended Node.js version (22)
└── package.json
```

See [`docs/TEMPLATE_SETUP.md`](docs/TEMPLATE_SETUP.md) for customization steps.

---

## Quick start

```bash
npm install
npm run dev          # lint + typecheck + test + build
npm run test:watch   # watch mode
npm run release      # bump patch version after checks pass
```

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Build ESM, CJS, and type declarations |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint source files |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format files with Prettier |
| `npm run format:check` | Check formatting |
| `npm run typecheck` | Type-check without emitting |
| `npm run check` | Run lint, typecheck, test, and build |
| `npm run dev` | Alias for `check` |
| `npm run release` | Release patch version |
| `npm run release:minor` | Release minor version |
| `npm run release:major` | Release major version |

---

## Publishing

### Automated (recommended)

Authentication uses a hybrid approach:

1. **Primary**: npm Trusted Publishing (OIDC) — no token required
2. **Fallback**: `NPM_TOKEN` secret if Trusted Publishing is unavailable

Create a GitHub release and the workflow will test, build, and publish to npm and GitHub Packages.

See [`docs/TEMPLATE_SETUP.md`](docs/TEMPLATE_SETUP.md) for setup details.

### Manual

```bash
npm login
npm publish
```

---

## Requirements

- **Node.js** >= 20 (`.node-version` recommends 22)
- **npm** >= 10

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## License

MIT — see [`LICENSE`](LICENSE).

Made with care by [Xarlizard](https://github.com/xarlizard).
