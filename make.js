const fs = require('fs');
const path = require('path');
const cp = require('child_process');

fs.rmSync('./build', { recursive: true, force: true });
cp.execSync('tsc');

const resources = [
  './Resources.proto',
  './package.json',
  './package-lock.json',
  './README.md',
  './LICENCE',
];
resources.forEach((resource) => fs.copyFileSync(resource, path.join('build', resource)));
