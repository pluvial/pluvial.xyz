import { visit } from 'unist-util-visit';

export default function jsonLinksPlugin() {
  Object.assign(this, {
    Compiler(tree) {
      const result = { links: [], externalLinks: [] };
      visit(tree, 'wikiLink', node => {
        const link = { href: node.data.hProperties.href, content: node.data.hChildren[0].value };
        console.error(link);
        result.links.push(link);
      });
      visit(tree, 'link', node => {
        const link = { href: node.url, content: node.children[0].value };
        console.error(link);
        result.externalLinks.push(link);
      });
      return JSON.stringify(result, null, 2);
    },
  });
}
