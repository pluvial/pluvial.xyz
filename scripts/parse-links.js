import remarkParse from 'remark-parse';
import wikiLinkPlugin from 'remark-wiki-link';
import { unified } from 'unified';
import { stream } from 'unified-stream';
import jsonLinksPlugin from '../plugins/remark-json-links.js';

const processor = unified()
  .use(remarkParse)
  .use(wikiLinkPlugin, { hrefTemplate: permalink => `/${permalink}` })
  .use(jsonLinksPlugin);

process.stdin.pipe(stream(processor)).pipe(process.stdout);
