import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],

  layout: join(__dirname, './src/lib/Layout.svelte'),

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [],
  rehypePlugins: [],
};

export default config;
