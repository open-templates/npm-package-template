import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { BUNDLER_OPTIONS } from './bundlers.js';
import { titleCase } from './git-context.js';
import {
  buildDetectedAuthor,
  promptAuthorStep,
  authorFromDetected,
  resolveAuthorFromArgs,
} from './author.js';
import { fetchOwnerId, buildAuthorEmail } from './github.js';

/**
 * @param {import('./types.js').GitContext} git
 * @param {import('./types.js').InitArgs} args
 * @param {{ includePackageName?: boolean, includeAuthorStep?: boolean, includeBundler?: boolean, defaultBundler?: string }} options
 * @returns {Promise<import('./types.js').InitConfig>}
 */
export async function resolveConfigInteractive(git, args, options = {}) {
  const {
    includePackageName = false,
    includeAuthorStep = false,
    includeBundler = false,
    defaultBundler = 'npm',
  } = options;

  if (args.yes) {
    return buildConfigFromDefaults(git, args, {
      includePackageName,
      includeAuthorStep,
      includeBundler,
      defaultBundler,
    });
  }

  const rl = readline.createInterface({ input, output });

  try {
    console.log('\n🔧 Initialize from template\n');

    let author = null;
    if (includeAuthorStep) {
      console.log('── Step 1: package.json author (Git owner) ──\n');
      const detected = buildDetectedAuthor(git);
      author = await promptAuthorStep(rl, detected, args);
      console.log('');
    }

    console.log('── Step 2: repository ──\n');

    if (git.sources.length > 0) {
      console.log('Detected from your environment:');
      if (git.remoteUrl) console.log(`  git remote   ${git.remoteUrl}`);
      if (git.owner && git.repo) {
        console.log(`  repository   ${git.owner}/${git.repo}`);
      }
      console.log(`  via          ${git.sources.join(', ')}\n`);
    }

    const owner = await promptLine(
      rl,
      'GitHub owner (username or org)',
      args.owner ?? git.owner ?? ''
    );
    const repo = await promptLine(
      rl,
      'Repository name',
      args.repo ?? git.repo ?? ''
    );

    let packageName = repo;
    if (includePackageName) {
      packageName = await promptLine(
        rl,
        'npm package name',
        args.packageName ?? repo
      );
    }

    const displayName =
      author?.authorDisplayName ??
      (await promptLine(
        rl,
        'Author / maintainer display name',
        args.displayName ?? git.displayName ?? titleCase(owner)
      ));

    let bundler = defaultBundler;
    if (includeBundler) {
      console.log('');
      bundler = await promptBundler(rl, args.bundler ?? defaultBundler);
    }

    console.log('\n── Summary ──');
    if (author) {
      console.log(`  Author:   ${author.authorDisplayName} <${author.authorEmail}>`);
      console.log(`  GitHub:   https://github.com/${author.authorLogin}`);
    }
    console.log(`  Owner:    ${owner}`);
    console.log(`  Repo:     ${repo}`);
    if (includePackageName) console.log(`  Package:  ${packageName}`);
    if (!author) console.log(`  Name:     ${displayName}`);
    if (includeBundler) {
      const label =
        BUNDLER_OPTIONS.find((b) => b.id === bundler)?.label ?? bundler;
      console.log(`  Bundler:  ${label}`);
    }

    const confirm = await promptLine(rl, '\nProceed? (Y/n)', 'Y');
    if (confirm.toLowerCase() === 'n') {
      console.log('Cancelled.');
      process.exit(0);
    }

    return {
      owner,
      repo,
      packageName,
      displayName,
      bundler,
      ...author,
    };
  } finally {
    rl.close();
  }
}

/**
 * @param {import('./types.js').GitContext} git
 * @param {import('./types.js').InitArgs} args
 */
async function buildConfigFromDefaults(git, args, options) {
  const owner = args.owner ?? git.owner;
  const repo = args.repo ?? git.repo;
  if (!owner || !repo) {
    console.error(
      '❌ Could not detect owner/repo. Set git remote origin or pass --owner and --repo.'
    );
    process.exit(1);
  }

  let author = null;
  if (options.includeAuthorStep) {
    const detected = buildDetectedAuthor(git);
    author = resolveAuthorFromArgs(args, detected);
    if (!author.authorOwnerId && author.authorLogin) {
      author.authorOwnerId = await fetchOwnerId(author.authorLogin);
      author.authorEmail = buildAuthorEmail({
        owner: author.authorLogin,
        ownerId: author.authorOwnerId,
      });
    }
  }

  return {
    owner,
    repo,
    packageName: args.packageName ?? repo,
    displayName:
      author?.authorDisplayName ??
      args.displayName ??
      git.displayName ??
      titleCase(owner),
    bundler: args.bundler ?? options.defaultBundler ?? 'npm',
    ...author,
  };
}

/**
 * @param {import('readline/promises').Interface} rl
 * @param {string} label
 * @param {string} defaultValue
 */
async function promptLine(rl, label, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : '';
  const answer = (await rl.question(`${label}${suffix}: `)).trim();
  const value = answer || defaultValue;
  if (!value) {
    console.error(`❌ ${label} is required.`);
    process.exit(1);
  }
  return value;
}

/**
 * @param {import('readline/promises').Interface} rl
 * @param {string} defaultId
 */
async function promptBundler(rl, defaultId) {
  console.log('Package manager (Dependabot ecosystem):');
  BUNDLER_OPTIONS.forEach((opt, index) => {
    const mark = opt.id === defaultId ? ' (default)' : '';
    console.log(`  ${index + 1}) ${opt.label}${mark}`);
  });

  const answer = (
    await rl.question(`Choice [${defaultIndex(defaultId) + 1}]: `)
  ).trim();

  if (!answer) return defaultId;

  const asNum = Number(answer);
  if (Number.isInteger(asNum) && asNum >= 1 && asNum <= BUNDLER_OPTIONS.length) {
    return BUNDLER_OPTIONS[asNum - 1].id;
  }

  const byId = BUNDLER_OPTIONS.find((b) => b.id === answer);
  return byId?.id ?? defaultId;
}

/** @param {string} defaultId */
function defaultIndex(defaultId) {
  const idx = BUNDLER_OPTIONS.findIndex((b) => b.id === defaultId);
  return idx >= 0 ? idx : 0;
}

export { buildDetectedAuthor };
