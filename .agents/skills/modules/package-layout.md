---
type: Playbook
title: Package layout
description: TypeScript source, tsup dual build, and package.json exports.
tags: [npm, typescript, tsup]
timestamp: 2026-07-15T00:00:00Z
---

* `src/index.ts` — public API surface
* `tsup` — ESM + CJS to `dist/`
* `package.json` `exports` map for consumers

See [specs/features/03-package-tooling.md](../../specs/features/03-package-tooling.md).
