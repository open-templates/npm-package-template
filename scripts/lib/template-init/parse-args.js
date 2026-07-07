/**
 * @param {string[]} argv
 * @returns {import('./types.js').InitArgs}
 */
export function parseArgs(argv) {
  const args = {
    owner: null,
    repo: null,
    packageName: null,
    displayName: null,
    ownerId: null,
    bundler: null,
    yes: false,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--yes' || arg === '-y') args.yes = true;
    else if (arg === '--owner') args.owner = argv[++i];
    else if (arg === '--repo') args.repo = argv[++i];
    else if (arg === '--package-name') args.packageName = argv[++i];
    else if (arg === '--display-name') args.displayName = argv[++i];
    else if (arg === '--owner-id') args.ownerId = String(argv[++i]);
    else if (arg === '--bundler') args.bundler = argv[++i];
    else if (arg === '--help' || arg === '-h') return { ...args, help: true };
  }

  return args;
}

/**
 * @param {string} templateName
 */
export function printHelp(templateName) {
  console.log(`Usage: init ${templateName} [options]

Defaults are read from git remote, git config, and GitHub CLI (gh) when available.
Press Enter to accept bracketed values.

Options:
  --owner <login>         GitHub username or org
  --repo <name>           Repository name
  --package-name <name>   npm package name (npm template)
  --display-name <name>   Author display name
  --bundler <id>          npm | pnpm | yarn | bun | none
  --owner-id <id>         GitHub numeric user id (auto-fetched if omitted)
  --yes, -y               Non-interactive; use detected values only
  --help, -h              Show help
`);
}
