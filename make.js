const fs = require('fs');
const path = require('path');
const cp = require('child_process');

fs.rmdirSync('./build', { recursive: true });
cp.execSync('tsc');

const resources = [
  './Resources.proto',
  './package.json',
  './package-lock.json',
];
resources.forEach((resource) => fs.copyFileSync(resource, path.join('build', resource)));
