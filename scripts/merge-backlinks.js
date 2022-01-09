import * as fs from 'fs/promises';
import * as path from 'path';

const { metadata_json, slug } = process.env;
console.error({ metadata_json, slug, script: path.basename(import.meta.url) });

// read stdin into a string
const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const metadata = JSON.parse(Buffer.concat(chunks).toString('utf8'));

// read metadata json file with backlinks
const metadataJson = metadata_json ?? new URL('../metadata.json', import.meta.url);
const { backlinks } = JSON.parse(await fs.readFile(metadataJson));

// merge back metadata with the backlinks corresponding to this page
const result = { ...metadata, backlinks: backlinks[slug] ?? [] };
console.error(result);
console.log(JSON.stringify(result, null, 2));
