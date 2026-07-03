#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';

const versionType = process.argv[2] ?? 'patch';

if (!['patch', 'minor', 'major'].includes(versionType)) {
  console.error('Invalid version type. Use: patch, minor, or major');
  process.exit(1);
}

console.log(`Starting ${versionType} release...`);

try {
  console.log('Running pre-publish checks...');
  execSync('npm run check', { stdio: 'inherit' });

  console.log(`Bumping ${versionType} version...`);
  execSync(`npm version ${versionType}`, { stdio: 'inherit' });

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const newVersion = packageJson.version;

  console.log(`Release ${newVersion} is ready.`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Push the changes: git push && git push --tags');
  console.log('2. Create a GitHub release to trigger automated publishing');
  console.log('3. Or publish manually: npm publish');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Release failed:', message);
  process.exit(1);
}
