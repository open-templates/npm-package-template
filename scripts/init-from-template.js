#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const TEMPLATES_DIR = 'templates';

/** Source under templates/ → destination at repo root */
const COPY_MANIFEST = [
  ['package.json', 'package.json'],
  ['README.md', 'README.md'],
  ['LICENSE', 'LICENSE'],
  ['CHANGELOG.md', 'CHANGELOG.md'],
  ['CONTRIBUTING.md', 'CONTRIBUTING.md'],
  ['SECURITY.md', 'SECURITY.md'],
  ['CODE_OF_CONDUCT.md', 'CODE_OF_CONDUCT.md'],
  ['dependabot.yml', '.github/dependabot.yml'],
  ['CODEOWNERS', '.github/CODEOWNERS'],
];

const PLACEHOLDER_EMAIL = 'owner-id+owner-username@users.noreply.github.com';

function parseGitRemote() {
  try {
    const url = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = url.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
    }
  } catch {
    // no git remote
  }
  return null;
}

function parseArgs(argv) {
  const args = {
    owner: null,
    repo: null,
    packageName: null,
    displayName: null,
    ownerId: null,
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
    else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: npm run init [-- options]

Copies personalized files from ${TEMPLATES_DIR}/ to the repo root (with placeholder substitution).

Options:
  --owner <login>         GitHub username or org (default: git remote)
  --repo <name>           Repository name (default: git remote)
  --package-name <name>   npm package name (default: repo name)
  --display-name <name>   Author display name (default: title-cased owner)
  --owner-id <id>         GitHub numeric id for noreply email (fetched if omitted)
  --yes, -y               Non-interactive defaults
`);
}

async function prompt(question, defaultValue) {
  const rl = readline.createInterface({ input, output });
  const suffix = defaultValue ? ` [${defaultValue}]` : '';
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  rl.close();
  return answer || defaultValue || '';
}

async function fetchOwnerId(owner) {
  try {
    const response = await fetch(`https://api.github.com/users/${owner}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.id ? String(data.id) : null;
  } catch {
    return null;
  }
}

function titleCase(value) {
  return value
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function resolveConfig(args) {
  const remote = parseGitRemote();
  let owner = args.owner || remote?.owner || '';
  let repo = args.repo || remote?.repo || '';
  let packageName = args.packageName || repo;
  let displayName = args.displayName || '';
  let ownerId = args.ownerId;

  if (!args.yes) {
    owner = await prompt('GitHub owner (username or org)', owner);
    repo = await prompt('Repository name', repo);
    packageName = await prompt('npm package name', packageName || repo);
    displayName = await prompt(
      'Author display name',
      displayName || titleCase(owner)
    );
  } else {
    packageName = packageName || repo;
    displayName = displayName || titleCase(owner);
  }

  if (!owner || !repo) {
    console.error('❌ owner and repo are required.');
    process.exit(1);
  }

  if (!ownerId) {
    ownerId = await fetchOwnerId(owner);
    if (!ownerId && !args.yes) {
      ownerId = await prompt('GitHub numeric user id (optional)', '');
    }
  }

  const email = ownerId
    ? `${ownerId}+${owner}@users.noreply.github.com`
    : `${owner}@users.noreply.github.com`;

  return { owner, repo, packageName, displayName, email };
}

function buildReplacements(config) {
  const { owner, repo, packageName, displayName, email } = config;
  const slug = `${owner}/${repo}`;
  const repoUrl = `https://github.com/${slug}`;

  return [
    ['https://github.com/owner-username/repo-name', repoUrl],
    ['owner-username/repo-name', slug],
    [PLACEHOLDER_EMAIL, email],
    ['@owner-username', `@${owner}`],
    [`@owner-username%2Fpackage-name`, `@${owner}%2F${packageName}`],
    [`%40owner-username%2Fpackage-name`, `%40${owner}%2F${packageName}`],
    ['owner-display-name', displayName],
    ['package-name', packageName],
    ['repo-name', repo],
    ['owner-username', owner],
  ];
}

function applyReplacements(content, replacements) {
  let next = content;
  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  return next;
}

function copyFromTemplate(root, fromRel, toRel, replacements) {
  const src = path.join(root, TEMPLATES_DIR, fromRel);
  const dest = path.join(root, toRel);

  if (!fs.existsSync(src)) {
    console.warn(`⚠ Skipped missing template: ${TEMPLATES_DIR}/${fromRel}`);
    return false;
  }

  const content = applyReplacements(
    fs.readFileSync(src, 'utf8'),
    replacements
  );
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`✓ ${toRel} ← ${TEMPLATES_DIR}/${fromRel}`);
  return true;
}

async function main() {
  const args = parseArgs(process.argv);
  const config = await resolveConfig(args);
  const replacements = buildReplacements(config);
  const root = process.cwd();

  console.log('\n🔧 Initializing from template...');
  console.log(`   Owner:   ${config.owner}`);
  console.log(`   Repo:    ${config.repo}`);
  console.log(`   Package: ${config.packageName}`);
  console.log(`   Author:  ${config.displayName} <${config.email}>\n`);

  let copied = 0;
  for (const [from, to] of COPY_MANIFEST) {
    if (copyFromTemplate(root, from, to, replacements)) copied += 1;
  }

  console.log(`\n✅ Copied ${copied} file(s) from ${TEMPLATES_DIR}/.`);
  console.log('Next: review git diff, then npm install && npm run dev');
}

main().catch((error) => {
  console.error('❌ Init failed:', error.message);
  process.exit(1);
});
