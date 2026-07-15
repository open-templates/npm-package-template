# npm-package-template — Agent Skills Index

OKF module guides for the TypeScript npm package starter.

## OKF layers

| Layer | Path |
|-------|------|
| Feature contracts | [`index.md`](../../index.md) (repo root) |
| OKF skills index | [`index.md`](index.md) |
| Shared concepts | [`shared/`](shared/) |
| Local modules | [`modules/`](modules/) |

## Local modules (OKF)

| Module | Use when |
|--------|----------|
| [package-layout](modules/package-layout.md) | `src/`, `dist/`, `package.json` exports |
| [publish-workflow](modules/publish-workflow.md) | CI publish to npm, Trusted Publishing |

## Shared concepts (synced)

* [auth/shared/](shared/auth/) — if the package adds auth-related APIs
* [supabase/shared/](shared/supabase/) — if the package integrates Supabase

## Cursor SKILL.md packs

None shipped by default. Add packs under `.agents/skills/<name>/SKILL.md` when needed.

## Extension order

1. **`INSTRUCTIONS.md`** → **`index.md`** → this file
2. `npm run init` to personalize from `templates/`
3. Export API from `src/index.ts`; add tests
4. Document in `specs/features/`; add `modules/` for build/publish patterns
