const PLACEHOLDER_EMAIL = 'owner-id+owner-username@users.noreply.github.com';

/**
 * @param {import('./types.js').InitConfig} config
 * @returns {[string, string][]}
 */
export function buildReplacements(config) {
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
    ['package-name', packageName ?? repo],
    ['repo-name', repo],
    ['owner-username', owner],
  ];
}

/**
 * @param {string} content
 * @param {[string, string][]} replacements
 */
export function applyReplacements(content, replacements) {
  let next = content;
  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  return next;
}
