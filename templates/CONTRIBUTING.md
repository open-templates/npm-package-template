# Contributing to NPM Package Template

First off, thank you for considering contributing to this npm package template! 🎉

This template is designed to help developers quickly bootstrap production-ready npm packages. Your contributions help
make this template even better for the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, please
include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (Node.js version, OS, etc.)
- **Code samples** if applicable

### 🚀 Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear title and description** of the enhancement
- **Use case** explaining why this would be useful
- **Possible implementation** if you have ideas
- **Examples** of how it would work

### 📝 Improving Documentation

Documentation improvements are always welcome:

- Fix typos or grammar issues
- Add missing examples
- Improve setup instructions
- Add troubleshooting guides

### 🔧 Code Contributions

#### Template Features

- Build system improvements
- Testing enhancements
- CI/CD workflow improvements
- Development tooling

#### Example Code

- More usage examples
- Better TypeScript examples
- Edge case handling
- Performance optimizations

## Development Setup

### Prerequisites

- Node.js 22+
- npm 10+
- Git

### Setup Steps

1. **Fork and Clone**

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_PACKAGE_NAME.git
   cd YOUR_PACKAGE_NAME
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Development Tasks**

   ```bash
   # Run all checks
   npm run dev

   # Individual tasks
   npm run build
   npm run test
   npm run lint
   npm run typecheck
   ```

4. **Test the Template**
   ```bash
   # Test package installation
   npm pack
   mkdir test-install
   cd test-install
   npm init -y
   npm install ../YOUR_PACKAGE_NAME-*.tgz
   ```

### Project Structure

```
├── src/                    # Source code
│   ├── __tests__/         # Test files
│   ├── index.ts           # Main entry point
│   ├── types.ts           # Type definitions
│   └── utils.ts           # Utility functions
├── scripts/               # Build and release scripts
├── examples/              # Usage examples
├── .github/               # GitHub workflows and templates
├── .vscode/               # VS Code configuration
└── docs/                  # Documentation
```

### Testing

We use Vitest for testing. Please ensure:

- **All tests pass**: `npm test`
- **Coverage remains high**: `npm run test:coverage`
- **New features have tests**: Add tests for new functionality
- **Tests are descriptive**: Use clear test names and descriptions

### Code Style

We use ESLint and Prettier for code formatting:

- **Linting**: `npm run lint`
- **Auto-fix**: `npm run lint:fix`
- **Prettier**: Runs on save (if configured)

## Pull Request Process

### Before Submitting

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the style guidelines
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**

   ```bash
   npm run dev  # Run all checks
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Format

We follow [Conventional Commits](https://conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Maintenance tasks

**Examples:**

```
feat: add TypeScript configuration template
fix: resolve build issue with Windows paths
docs: update README with new setup instructions
chore: update dependencies to latest versions
```

### Pull Request Guidelines

1. **Fill out the PR template** completely
2. **Link related issues** using "Closes #123"
3. **Update documentation** if needed
4. **Ensure CI passes** (all checks green)
5. **Request review** from maintainers

### Review Process

- **Automated checks** must pass
- **At least one maintainer** must approve
- **No unresolved conversations** should remain
- **Squash and merge** is preferred

## Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Export types and interfaces
- Document public APIs with JSDoc
- Use meaningful variable names

### Code Structure

- Keep functions small and focused
- Use async/await over promises
- Handle errors gracefully
- Write self-documenting code

### Documentation

- Use clear, concise language
- Include code examples
- Update README for new features
- Add inline comments for complex logic

## Community

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Discord/Slack**: If available, for real-time chat

### Recognition

Contributors will be recognized in:

- README.md contributors section
- CHANGELOG.md release notes
- GitHub releases (when applicable)

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for contributing to make this template better for everyone! 🚀

**Happy coding!** 💻✨
