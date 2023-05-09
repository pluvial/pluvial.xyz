import * as fs from 'fs/promises';

const filter = process.env.FILTER?.toLowerCase() ?? process.env.USER;

/** @type {{ groups: { title: string, tabs: { title: string, url: string }[] }[] }} */
const raw = JSON.parse(await fs.readFile('./raw.json'));

const groups = raw.groups.map(({ title, tabs }) => ({
  name: title,
  tabs: tabs
    .filter(({ title, url }) => {
      const { host, protocol } = new URL(url);
      const remove =
        title.includes(filter) ||
        url.includes(filter) ||
        host === '0.0.0.0' ||
        host === '127.0.0.1' ||
        host === 'localhost' ||
        !(protocol === 'http:' || protocol === 'https:');
      if (remove) console.log(`filter ${url}`);
      return !remove;
    })
    .map(({ title, url }) => ({ name: title, url })),
}));

const file = 'tabs.json';
await fs.writeFile(file, JSON.stringify(groups));
console.log(file);
