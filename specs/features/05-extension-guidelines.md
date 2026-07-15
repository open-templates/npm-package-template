---
type: Playbook
title: Extension guidelines
description: Ship API changes with tests, version bumps, and OKF docs.
tags: [extension, npm]
timestamp: 2026-07-15T00:00:00Z
---

1. Export new symbols from `src/index.ts`.
2. Add tests and update `CHANGELOG.md`.
3. Document public API behavior in `specs/features/`.
4. Add `.agents/skills/modules/` guides for non-obvious build or publish steps.
