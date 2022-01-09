import * as fs from 'fs/promises';
import * as path from 'path';

const metadataDir = path.join(process.cwd(), './metadata');

const links = {};
const backlinks = {};

// derive slug removing the leading '/' from href
const hrefToSlug = href => href.slice(1);

for (const filename of await fs.readdir(metadataDir)) {
  const slug = filename.slice(0, -'.json'.length);
  const filepath = path.join(metadataDir, filename);

  const metadata = JSON.parse(await fs.readFile(filepath, 'utf-8'));
  links[slug] = metadata.links.map(({ href }) => hrefToSlug(href));
  metadata.links.forEach(({ href }) => {
    const linkSlug = hrefToSlug(href);
    backlinks[linkSlug] = backlinks[linkSlug]?.concat(slug) ?? [slug];
  });
}

const result = { links, backlinks };
console.error(result);
console.log(JSON.stringify(result, null, 2));
