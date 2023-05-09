import * as fs from 'fs/promises';

/** @type {{ name: string, tabs: { name: string, url: string }[] }[] }} */
const groups = JSON.parse(await fs.readFile('./tabs.json'));

const existing = new Set();

const out = 'content';

try {
  // await fs.mkdir(out, { recursive: true });
  const dir = await fs.opendir(out);
  for await (const dirent of dir) {
    existing.add(dirent.name);
  }
} catch (error) {
  console.error(error);
}

const files = groups.map(({ name, tabs }) => ({
  name:
    name
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '-')
      .replace(/-+/g, '-') + '.md',
  header: `---
title: ${name}
---

# ${name}
`,
  content: `\n${tabs
    .map(({ name, url }) => `[${name.replace(/[<>{}]|&lt;/g, '')}](${url})`)
    .join('\n\n')}\n`,
}));

for (const { name, header, content } of files) {
  const path = `${out}/${name}`;
  const exists = existing.has(name);
  const promise = exists ? fs.appendFile(path, content) : fs.writeFile(path, header + content);
  promise.then(() => console.log((exists ? '++' : '* ') + name)).catch(console.error);
}
