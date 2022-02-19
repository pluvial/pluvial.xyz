import * as fs from 'fs';
import { join } from 'path';

// TODO: imports with type raw does not seem to be working, still imported using mdsvex
// const imports = import.meta.glob('/content/*.md', { assert: { type: 'raw' } });

// workaround that only works in dev:
// const module = await import(`${path}?raw`);

const imports = import.meta.globEager('/content/*.md');

// YAML frontmatter marker
const fmMarker = '---\n';
// Script section marker
const scriptMarker = '</script>';

export const searchDocuments = Object.entries(imports).map(([path, module], index) => {
  const slug = path.slice('/content/'.length, -'.md'.length);
  const href = `/${slug}`;
  const { title } = module.metadata;
  // TODO: find a better way to read raw .md file contents?
  const md = fs.readFileSync(join(process.cwd(), path), 'utf-8');
  const fmEnd = md.lastIndexOf(fmMarker) + fmMarker.length;
  const scriptEnd = md.lastIndexOf(scriptMarker) + scriptMarker.length;
  // TODO: search over html text elements only?
  const content = md.slice(Math.max(fmEnd, scriptEnd)).trim();
  const document = { id: index, title, content, href, slug };
  return document;
});
