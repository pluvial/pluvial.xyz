import fs from 'node:fs/promises';

const path = './node_modules/flexsearch/package.json';

const file = await fs.readFile(path, 'utf-8');
const pkg = JSON.parse(file);

// alternatives using experimental JSON module imports:
// const pkg = await import(path, { assert: { type: 'json' } });
// import pkg from './node_modules/flexsearch/package.json' assert { type: 'json' };

const patched = {
  ...pkg,
  exports: {
    '.': {
      types: './index.d.ts',
      import: './dist/module/index.js',
    },
    './document': {
      import: './dist/module/document.js',
    },
  },
};

const out = JSON.stringify(patched, null, 2);
await fs.writeFile(path, out);
