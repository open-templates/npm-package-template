# Initialize from template

After **Use this template**, personalize the repository by **copying** files from `templates/` to the repo root.

## Why two layers?

| Location | Audience | Branding |
|----------|----------|----------|
| **Repo root** (before `init`) | Visitors on GitHub | `@open-templates`, `open-templates/...` |
| **`templates/`** | Init script output | `owner-username`, `repo-name`, … |

Root markdown stays polished for the shared template catalog. `npm run init` overwrites root files with your metadata.

## Run

```bash
npm run init
```

**Step 1 — Author:** detects your Git identity (`git user.name`, `git user.email`, `gh api user`) and shows the values that will go into `package.json` author. Press Enter to accept, or choose manual entry.

**Step 2 — Repository:** owner, repo, package name, and Dependabot bundler (defaults from git remote and lockfiles).

### Options

```bash
npm run init -- --yes
npm run init -- --owner acme --repo my-lib --author-login janedoe --display-name "Jane Doe"
```

## Placeholders (in `templates/` only)

| Token | Example after init |
|-------|-------------------|
| `owner-username` | `acme` (repo org/user) |
| `repo-name` | `my-lib` |
| `package-name` | `my-lib` |
| `owner-display-name` | `Acme` |
| `author-display-name` | `Jane Doe` |
| `author-github-login` | `janedoe` |
| `package-bundler` | `npm` (Dependabot ecosystem) |

## Copied files

See [`templates/ABOUT_TEMPLATES.md`](templates/ABOUT_TEMPLATES.md) for the manifest.

Workflows under `.github/workflows/` are **not** copied — they use `github.repository_owner` at runtime.

After init, one-time scaffolding is removed from `scripts/` (init wizard and `lib/template-init/`). `release.js` and `setup.js` are kept for publishing and the dev checklist.

## Modular init (future)

Init logic lives in `scripts/lib/template-init/` as plain ESM modules. A future centralized `@open-templates/create` CLI can import the same API.

---

[TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) · [DEPENDABOT.md](DEPENDABOT.md)
