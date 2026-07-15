# Agent & developer instructions — npm-package-template

Use this file when turning this template into a **publishable TypeScript npm package**.

## What ships out of the box

| Feature | Description |
|---------|-------------|
| TypeScript + tsup | Dual ESM/CJS `dist/` output |
| Vitest | Unit tests |
| ESLint flat config | Lint in CI |
| GitHub Actions | CI, publish, CodeQL |

Details: [`index.md`](index.md)

---

## First steps

```bash
npm run init    # copy templates/ → root (owner, repo, package name)
npm install
npm test
npm run build
```

See [`docs/INIT_TEMPLATE.md`](docs/INIT_TEMPLATE.md) and [`templates/ABOUT_TEMPLATES.md`](templates/ABOUT_TEMPLATES.md).

---

## Agent workflow

Read in order:

1. **`INSTRUCTIONS.md`** (this file)
2. **`index.md`** — OKF feature index
3. **`.agents/skills/index.md`** — OKF module guides
4. **`.agents/skills/README.md`** — skill catalog

### Adding a public API

1. Implement in `src/`; export from `src/index.ts`
2. Add tests (`*.test.ts`)
3. Document behavior in `specs/features/` and link from `index.md`
4. Add `.agents/skills/modules/<name>.md` for non-obvious build or publish steps
5. Update `CHANGELOG.md` on release

### Rules

- Never commit npm tokens or secrets
- Use conventional commits for changelog batches
- Run `npm run typecheck` and `npm test` before finishing

---

## Repository map

```
src/                  Package source
dist/                 Build output (gitignored)
index.md              OKF bundle root
specs/features/       Numbered feature specs
.agents/skills/       OKF modules + Cursor SKILL.md packs
templates/            Adopter personalization files
```

---

## Repository documents

[README](README.md) | **INSTRUCTIONS** | [CHANGELOG](CHANGELOG.md) | [CONTRIBUTING](CONTRIBUTING.md) | [SECURITY](SECURITY.md) | [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)
