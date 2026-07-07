# Template Setup Guide

Follow these steps to customize this template for your package.

## 0. Initialize (first step)

```bash
npm run init
```

Copies personalized files from `templates/` to the repo root. The hosted template keeps **@open-templates** in root docs until you run this. See [`docs/INIT_TEMPLATE.md`](INIT_TEMPLATE.md).

## 1. Templates Folder

The `templates/` folder contains blank starter files for your new package. Start by copying these files into your project root and filling them out with your own information:

- `README.md`: Your package's main documentation. Update with your package name, usage, and details.
- `CHANGELOG.md`: Track changes and releases for your package. Follow semantic versioning and keep a changelog format.
- `CONTRIBUTING.md`: Guidelines for contributing to your package. Add your contribution rules and process.
- `LICENSE`: Your package's license (default is MIT). Update with your name and year if needed.
- `package.json`: Example configuration to start from. Replace all placeholders (`YOUR_USERNAME`, `YOUR_PACKAGE_NAME`, etc.) with your actual info.
- `dependabot.yml`: Example Dependabot configuration for automated dependency updates. Update reviewers/assignees as needed.

Copy and edit these files as needed to match your package's requirements. Do not edit the template's own files—always start from the ones in `templates/`.

## 2. Package Information

Update the copied `package.json` from `templates/` with your actual information:

- `YOUR_USERNAME` → Your GitHub username
- `YOUR_PACKAGE_NAME` → Your package name
- `YOUR_NAME` → Your name
- `your.email@example.com` → Your email

### Key fields to update:

```json
{
  "name": "your-package-name",
  "description": "Your package description",
  "repository": {
    "url": "git+https://github.com/YOUR_USERNAME/YOUR_PACKAGE_NAME.git"
  },
  "homepage": "https://github.com/YOUR_USERNAME/YOUR_PACKAGE_NAME#readme",
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/YOUR_PACKAGE_NAME/issues"
  },
  "author": {
    "name": "YOUR_NAME",
    "email": "your.email@example.com",
    "url": "https://github.com/YOUR_USERNAME"
  },
  "keywords": ["add", "relevant", "keywords"]
}
```

## 3. GitHub Repository Setup

### NPM Authentication (Hybrid Approach)

This template uses a **hybrid authentication approach** that prioritizes security while maintaining flexibility:

1. **Primary: Trusted Publishing (OIDC)** - Recommended, no tokens needed
2. **Fallback: NPM_TOKEN** - Automatic fallback if Trusted Publishing fails

#### Option 1: Trusted Publishing (Recommended)

**Benefits:**
- ✅ No access tokens needed
- ✅ No 90-day expiration
- ✅ More secure (OIDC-based)
- ✅ No secrets to manage

**Setup Steps:**

1. **Enable Trusted Publishing in your npm account:**
   - Go to [npmjs.com](https://www.npmjs.com) → Account Settings → Access Tokens
   - Navigate to "Trusted Publishing" section
   - Click "Add Trusted Publisher"
   - Select "GitHub Actions" as the publisher
   - Enter your GitHub organization/username and repository name
   - Select the workflow file path: `.github/workflows/publish.yml`
   - Click "Add"

2. **That's it!** The workflow will automatically use Trusted Publishing.

#### Option 2: NPM_TOKEN (Fallback)

If Trusted Publishing is not set up or fails, the workflow will automatically fall back to using an `NPM_TOKEN` secret.

**Setup Steps:**

1. **Generate an npm access token:**
   - Go to [npmjs.com](https://www.npmjs.com) → Account Settings → Access Tokens
   - Click "Generate New Token"
   - Select "Automation" type
   - Copy the token

2. **Add to GitHub Secrets:**
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

> **Note:** The workflow will try Trusted Publishing first, and only use `NPM_TOKEN` if Trusted Publishing fails. This gives you the best of both worlds: security by default, with a fallback option.

### Repository Settings

- Enable GitHub Packages in repository settings
- Set up branch protection rules for main branch
- Configure issue templates (optional)

## 4. Code Structure

### Main Entry Point

Update `src/index.ts` with your actual exports:

```typescript
// Replace example functions with your actual code
export { yourMainFunction } from './your-module';
export * from './types';
```

### Types

Update `src/types.ts` with your actual type definitions.

### Tests

Update tests in `src/__tests__/` to match your actual functions.

## 5. Documentation

### README.md (from `templates/README.md`)
- Update title and description
- Replace feature list with your actual features
- Update installation instructions
- Add your API documentation
- Update examples

### CHANGELOG.md (from `templates/CHANGELOG.md`)
- Keep the format but update with your actual changes
- Follow semantic versioning

### CONTRIBUTING.md (from `templates/CONTRIBUTING.md`)
- Add your contribution guidelines and process

### LICENSE (from `templates/LICENSE`)
- Update with your name and year if needed

### dependabot.yml (from `templates/dependabot.yml`)
- Update reviewers and assignees to your GitHub username or team

### Examples

- Replace `examples/README.md` with actual usage examples
- Add code samples for common use cases

## 6. Configuration

### Dependencies

Remove or add dependencies based on your needs:

```bash
# Remove unused dependencies
npm uninstall package-name

# Add new dependencies
npm install package-name
npm install --save-dev dev-package-name
```

### Build Configuration

Update `tsup.config.ts` if you need different build settings:

- External dependencies (`external` option)
- Additional entry points
- Different output formats

### Testing

Update `vitest.config.ts` if you need different test settings:

- Test patterns
- Coverage settings
- Test environment

## 7. Publishing

### First Release

1. Update version in package.json to 1.0.0
2. Update CHANGELOG.md with initial release notes
3. Create a git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release from the tag

### Automated Publishing

The workflow will automatically:

- Run tests and build
- Publish to NPM registry
- Publish to GitHub Packages with `@YOUR_USERNAME/YOUR_PACKAGE_NAME` scope

## 8. Cleanup

After customization:

1. Delete this file (`TEMPLATE_SETUP.md`)
2. Remove example code from `src/index.ts`
3. Update or remove example tests
4. Remove placeholder content from README.md

## 9. Optional Enhancements

### Add More Tools

- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Commitizen**: Conventional commits
- **Semantic Release**: Automated versioning

### Add More Workflows

- **CodeQL**: Security scanning
- **Dependabot**: Dependency updates
- **Stale**: Close stale issues

### Documentation

- **API documentation**: TSDoc + documentation generator
- **GitHub Wiki**: Extended documentation
- **GitHub Pages**: Package website

## 10. Protect Main Branch

To ensure repository safety and code quality, add the ruleset from `templates/Protect main.json` to your repository settings. This will:
- Protect the `main` branch from direct commits and force pushes
- Require all changes to go through pull requests
- Enforce best practices for collaboration and code review

Follow GitHub's documentation to import the ruleset and apply it to your repository.

## Need Help?

If you encounter issues:

1. Check the GitHub Actions logs - they will show which authentication method was used
2. **For Trusted Publishing:**
   - Verify Trusted Publishing is configured correctly in your npm account
   - Ensure the workflow path matches in npm settings: `.github/workflows/publish.yml`
   - Check that repository permissions are correct (workflow needs `id-token: write` permission)
3. **For NPM_TOKEN fallback:**
   - Verify `NPM_TOKEN` secret is set in repository settings
   - Ensure the token has "Automation" type and publish permissions
   - Check token hasn't expired (tokens expire after 90 days)
4. Check package.json configuration and package name availability

Happy packaging! 🚀
