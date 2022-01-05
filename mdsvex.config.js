import wikiLinkPlugin from 'remark-wiki-link';

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [[wikiLinkPlugin, { hrefTemplate: permalink => `${permalink}` }]],
  rehypePlugins: [],
};

export default config;
