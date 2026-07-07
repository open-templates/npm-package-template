/**
 * @typedef {object} GitContext
 * @property {string | null} owner
 * @property {string | null} repo
 * @property {string | null} ownerId
 * @property {string | null} displayName
 * @property {string | null} remoteUrl
 * @property {string | null} userEmail
 * @property {string[]} sources
 */

/**
 * @typedef {object} InitArgs
 * @property {string | null} [owner]
 * @property {string | null} [repo]
 * @property {string | null} [packageName]
 * @property {string | null} [displayName]
 * @property {string | null} [ownerId]
 * @property {string | null} [bundler]
 * @property {boolean} [yes]
 */

/**
 * @typedef {object} InitConfig
 * @property {string} owner
 * @property {string} repo
 * @property {string} [packageName]
 * @property {string} displayName
 * @property {string} [bundler]
 * @property {string} [email]
 * @property {string} [ownerId]
 */

/**
 * @typedef {object} TemplateInitOptions
 * @property {string} root
 * @property {string} [templatesDir]
 * @property {[string, string][]} manifest
 * @property {InitArgs} args
 * @property {boolean} [includePackageName]
 * @property {boolean} [includeBundler]
 * @property {string} [defaultBundler]
 * @property {string} [nextSteps]
 */

export {};
