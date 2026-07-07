import { fetchOwnerId, buildAuthorEmail } from './github.js';

const AUTHOR_EMAIL_PLACEHOLDER =
  'author-id+author-github-login@users.noreply.github.com';

/**
 * Build author profile from git config and GitHub CLI (personal identity).
 * @param {import('./types.js').GitContext} git
 * @returns {import('./types.js').DetectedAuthor}
 */
export function buildDetectedAuthor(git) {
  const sources = [];
  let login = null;
  let displayName = null;
  let ownerId = null;
  let email = null;

  if (git.userName) {
    displayName = git.userName;
    sources.push('git user.name');
  }

  if (git.userEmail) {
    sources.push('git user.email');
    const noreply = parseNoreplyEmail(git.userEmail);
    if (noreply) {
      login = noreply.owner;
      ownerId = noreply.ownerId;
      email = git.userEmail;
    }
  }

  if (git.ghLogin) {
    sources.push('GitHub CLI (gh)');
    login = login ?? git.ghLogin;
    ownerId = ownerId ?? git.ghId;
    displayName = displayName ?? git.ghName ?? git.ghLogin;
  }

  if (!email && login) {
    email = buildAuthorEmail({ owner: login, ownerId });
  }

  return {
    login,
    displayName,
    ownerId,
    email,
    profileUrl: login ? `https://github.com/${login}` : null,
    sources: [...new Set(sources)],
    detected: Boolean(login && displayName && email),
  };
}

/**
 * @param {string | null} email
 */
function parseNoreplyEmail(email) {
  if (!email) return null;
  const match = email.match(/^(\d+)\+([^@]+)@users\.noreply\.github\.com$/);
  if (!match) return null;
  return { ownerId: match[1], owner: match[2] };
}

/**
 * @param {import('readline/promises').Interface} rl
 * @param {import('./types.js').DetectedAuthor} detected
 * @param {import('./types.js').InitArgs} args
 * @returns {Promise<import('./types.js').AuthorConfig>}
 */
export async function promptAuthorStep(rl, detected, args) {
  if (args.displayName || args.ownerId) {
    return resolveAuthorFromArgs(args, detected);
  }

  if (detected.detected) {
    console.log('Automatically detected Git owner:');
    console.log(`  Name:    ${detected.displayName}`);
    console.log(`  Email:   ${detected.email}`);
    console.log(`  GitHub:  ${detected.profileUrl}`);
    console.log(`  via     ${detected.sources.join(', ')}\n`);
    console.log('  1) Accept detected author (default)');
    console.log('  2) Enter manually\n');

    const choice = (
      await rl.question('Choice [1]: ')
    ).trim().toLowerCase();

    if (choice === '2' || choice === 'manual' || choice === 'm') {
      return promptManualAuthor(rl, detected);
    }

    return authorFromDetected(detected);
  }

  console.log('Could not detect Git owner from git config or GitHub CLI.\n');
  return promptManualAuthor(rl, detected);
}

/**
 * @param {import('./types.js').DetectedAuthor} detected
 */
export function authorFromDetected(detected) {
  return {
    authorLogin: detected.login,
    authorDisplayName: detected.displayName,
    authorOwnerId: detected.ownerId,
    authorEmail: detected.email,
  };
}

/**
 * @param {import('./types.js').InitArgs} args
 * @param {import('./types.js').DetectedAuthor} detected
 */
export function resolveAuthorFromArgs(args, detected) {
  const login = args.authorLogin ?? detected.login ?? '';
  const displayName =
    args.displayName ?? detected.displayName ?? login;
  const ownerId = args.ownerId ?? detected.ownerId ?? null;
  const email =
    args.authorEmail ??
    detected.email ??
    buildAuthorEmail({ owner: login, ownerId });

  return {
    authorLogin: login,
    authorDisplayName: displayName,
    authorOwnerId: ownerId,
    authorEmail: email,
  };
}

/**
 * @param {import('readline/promises').Interface} rl
 * @param {import('./types.js').DetectedAuthor} [fallback]
 */
async function promptManualAuthor(rl, fallback = {}) {
  const login = await promptRequired(
    rl,
    'GitHub username (author)',
    fallback.login ?? ''
  );
  const displayName = await promptRequired(
    rl,
    'Author display name',
    fallback.displayName ?? login
  );
  let ownerId = fallback.ownerId ?? '';
  const idAnswer = (
    await rl.question(
      `GitHub numeric user id (optional)${ownerId ? ` [${ownerId}]` : ''}: `
    )
  ).trim();
  ownerId = idAnswer || ownerId || null;

  if (!ownerId) {
    ownerId = await fetchOwnerId(login);
  }

  const email = buildAuthorEmail({ owner: login, ownerId });

  return {
    authorLogin: login,
    authorDisplayName: displayName,
    authorOwnerId: ownerId,
    authorEmail: email,
  };
}

/**
 * @param {import('readline/promises').Interface} rl
 * @param {string} label
 * @param {string} defaultValue
 */
async function promptRequired(rl, label, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : '';
  const answer = (await rl.question(`${label}${suffix}: `)).trim();
  const value = answer || defaultValue;
  if (!value) {
    console.error(`❌ ${label} is required.`);
    process.exit(1);
  }
  return value;
}

export { AUTHOR_EMAIL_PLACEHOLDER };
