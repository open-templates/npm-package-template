#!/usr/bin/env node

import { initFromTemplate } from './lib/template-init/index.js';
import { NPM_PACKAGE_MANIFEST } from './lib/template-init/manifests/npm-package.js';
import { printHelp } from './lib/template-init/parse-args.js';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  printHelp('npm-package-template');
  process.exit(0);
}

initFromTemplate({
  manifest: NPM_PACKAGE_MANIFEST,
  includePackageName: true,
  includeAuthorStep: true,
  includeBundler: true,
  defaultBundler: 'npm',
  nextSteps: 'review git diff, then npm install && npm run dev',
}).catch((error) => {
  console.error('❌ Init failed:', error.message);
  process.exit(1);
});
