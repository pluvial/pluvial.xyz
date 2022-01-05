import wikiLinkPlugin from './plugins/remark-wiki-link.js';

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [[wikiLinkPlugin, { hrefTemplate: permalink => `/${permalink}` }]],
  rehypePlugins: [],
};

export default config;
