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

### Options

```bash
npm run init -- --yes
npm run init -- --owner acme --repo my-lib --package-name @acme/my-lib
```

## Placeholders (in `templates/` only)

| Token | Example after init |
|-------|-------------------|
| `owner-username` | `acme` |
| `repo-name` | `my-lib` |
| `package-name` | `my-lib` |
| `owner-display-name` | `Acme` |

## Copied files

See [`templates/ABOUT_TEMPLATES.md`](templates/ABOUT_TEMPLATES.md) for the manifest.

Workflows under `.github/workflows/` are **not** copied — they use `github.repository_owner` at runtime.

---

[TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) · [DEPENDABOT.md](DEPENDABOT.md)
