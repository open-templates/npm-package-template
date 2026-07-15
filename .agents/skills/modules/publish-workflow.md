---
type: Playbook
title: Publish workflow
description: GitHub Actions trusted publishing and NPM_TOKEN fallback.
tags: [ci, npm]
timestamp: 2026-07-15T00:00:00Z
---

Workflows in `.github/workflows/`:

* `ci.yml` — lint, test, build on PR
* `publish.yml` — version tag → npm publish

See [specs/features/04-publish-ci.md](../../specs/features/04-publish-ci.md).
