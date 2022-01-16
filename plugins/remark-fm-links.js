import { visit } from 'unist-util-visit';

export default () => (tree, file) => {
  const result = { links: [], externalLinks: [] };
  visit(tree, 'wikiLink', node => {
    const link = { href: node.data.hProperties.href, content: node.data.hChildren[0].value };
    result.links.push(link);
  });
  visit(tree, 'link', node => {
    const link = { href: node.url, content: node.children[0].value };
    result.externalLinks.push(link);
  });
  file.data.fm = { ...file.data.fm, ...result };
};
