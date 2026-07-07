#!/usr/bin/env node

import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔧 Running template initialization...\n');

const init = spawnSync('node', [path.join(__dirname, 'init-from-template.js'), ...process.argv.slice(2)], {
  stdio: 'inherit',
});

if (init.status !== 0) {
  process.exit(init.status ?? 1);
}

console.log('\n📋 Post-init checklist: npm install → npm run dev');
