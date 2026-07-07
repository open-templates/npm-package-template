#!/usr/bin/env node

import { initFromTemplate } from './lib/template-init/index.js';
import { NPM_PACKAGE_MANIFEST } from './lib/template-init/manifests/npm-package.js';
import { printHelp } from './lib/template-init/parse-args.js';
import { brandHeader, error as printError } from './lib/template-init/terminal.js';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  brandHeader('npm package template');
  printHelp('npm-package-template');
  process.exit(0);
}

initFromTemplate({
  manifest: NPM_PACKAGE_MANIFEST,
  includePackageName: true,
  includeAuthorStep: true,
  includeBundler: true,
  defaultBundler: 'npm',
  templateLabel: 'npm package template',
  scriptsCleanup: 'keep',
  scriptsKeep: ['release.js', 'setup.js'],
  nextSteps: 'review git diff, then npm install && npm run dev',
}).catch((err) => {
  printError(`Init failed: ${err.message}`);
  process.exit(1);
});
