# NPM Package Template

[![npm version](https://badge.fury.io/js/@open-templates%2Fnpm-package-template.svg)](https://badge.fury.io/js/@open-templates%2Fnpm-package-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![CI/CD](https://github.com/open-templates/npm-package-template/actions/workflows/publish.yml/badge.svg)](https://github.com/open-templates/npm-package-template/actions/workflows/publish.yml)

A modern, production-ready **TypeScript npm package template** from [@open-templates](https://github.com/open-templates).

> **Quick Start**: Click **Use this template**, then run `npm run init` to copy personalized files from [`templates/`](templates/) into the repo root.

---

## Using this template

1. **Use this template** on GitHub to create your repository.
2. Clone and initialize:

```bash
git clone https://github.com/open-templates/npm-package-template.git my-package
cd my-package
npm run init
```

`npm run init` copies from `templates/` (README, `package.json`, LICENSE, `.github/CODEOWNERS`, etc.) with your owner, repo, and package name. The hosted template keeps **@open-templates** branding until you run init.

See [`docs/INIT_TEMPLATE.md`](docs/INIT_TEMPLATE.md).

---

## Features

- TypeScript, tsup (ESM + CJS), Vitest, ESLint flat config
- GitHub Actions: CI, publish (Trusted Publishing + `NPM_TOKEN` fallback), CodeQL
- `templates/` — adopter files; see [`templates/ABOUT_TEMPLATES.md`](templates/ABOUT_TEMPLATES.md)

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run init` | Copy `templates/` → root with your GitHub/npm metadata |
| `npm run dev` | lint + typecheck + test + build |

Full list: [`docs/TEMPLATE_SETUP.md`](docs/TEMPLATE_SETUP.md).

---

## License

MIT — see [`LICENSE`](LICENSE).

Maintained by [@open-templates](https://github.com/open-templates).
