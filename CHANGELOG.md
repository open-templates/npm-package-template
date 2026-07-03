# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-07-03

### Changed

- Replaced Rollup with **tsup** for faster ESM + CJS builds and declaration output
- Replaced Jest with **Vitest** for native ESM testing and V8 coverage
- Updated TypeScript target to **ES2022** with strict modern compiler options
- Raised minimum Node.js version to **22** (Maintenance LTS; CI runs on Node 22)
- Migrated ESLint to unified **typescript-eslint** flat config
- Removed PowerShell-only scripts in favor of cross-platform npm scripts
- Modernized `package.json` exports, added `sideEffects: false`, and updated build artifacts
- Fixed Dependabot configuration to allow patch/minor updates while ignoring major bumps

### Removed

- `rollup.config.js`, `jest.config.json`, and PowerShell dev/release scripts

## [1.1.0] - 2025-12-14

### Changed
- **BREAKING**: Migrated to hybrid authentication approach (Trusted Publishing with NPM_TOKEN fallback)
  - Primary: npm Trusted Publishing (OIDC) - no tokens needed, more secure
  - Fallback: NPM_TOKEN secret - automatic fallback if Trusted Publishing fails
  - Updated publish workflow to try Trusted Publishing first, then fall back to NPM_TOKEN
  - Updated `.npmrc` to remove npm token reference (GitHub Packages token remains)
  - Updated all documentation to reflect hybrid authentication approach
  - Updated all dependencies to latest versions
- **BREAKING**: Migrated ESLint configuration to flat config format (ESLint 9)
  - Replaced `.eslintrc.json` with `eslint.config.js`
  - Added `@eslint/js` and `globals` as new dependencies
  - Updated ESLint configuration to use new flat config format

### Security
- Enhanced security by prioritizing Trusted Publishing (OIDC) over access tokens
- Eliminates need for long-lived tokens when Trusted Publishing is configured
- Maintains backward compatibility with NPM_TOKEN for flexibility

### Documentation
- Updated `docs/TEMPLATE_SETUP.md` with Trusted Publishing setup instructions
- Updated `README.md` to highlight Trusted Publishing feature
- Updated `docs/WORKFLOWS.md` to explain Trusted Publishing in publish workflow
- Updated release scripts to remove token references

## [1.0.3] - 2025-08-05

### Added
- Deploy workflow for production environment with URL and README badge
- Updated some dependencies

## [1.0.2] - 2025-07-17

### Added
- Templates folder with blank files to fill with your desired package information
- Minor fixes

## [1.0.1] - 2025-07-16

### Added
- Minor fix (package version bump, merged dependabot dependencies bumps)

## [1.0.0] - 2025-07-16

### Added
- TypeScript setup with strict configuration
- Rollup build system (ESM + CJS)
- Jest testing with coverage
- ESLint for code quality
- Automated CI/CD with GitHub Actions
- Dual registry publishing (NPM & GitHub Packages)
- Smart NPM publishing (scoped fallback)
- PowerShell and Node.js scripts for release/dev
- Security policy and CodeQL analysis
- Dependabot for dependency updates
- Comprehensive documentation and setup guide
- GitHub template support for easy customization

---

**Getting Started:**
- Use this template via GitHub or clone the repository
- Run `npm install` and `npm run setup`
- Customize files and add your code to `src/`
- Run `npm run dev` for development
- Create a GitHub release to publish

**Notes:**
- Update placeholders like `YOUR_USERNAME` and `YOUR_PACKAGE_NAME`
- Customize README and package.json for your project
- Automated publishing supports both scoped and unscoped names