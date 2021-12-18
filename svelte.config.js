import cloudflare from '@sveltejs/adapter-cloudflare';
import cloudflareWorkers from '@sveltejs/adapter-cloudflare-workers';
import netlify from '@sveltejs/adapter-netlify';
import adapter from '@sveltejs/adapter-static';
import vercel from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig)],
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    // in a production build, use the adapter implied by the platform's environment variables
    // TODO: evaluate migration to @sveltejs/adapter-auto if extra features justify
    adapter: process.env.CF_PAGES
      ? cloudflare()
      : process.env.CF_ACCOUNT_ID
      ? cloudflareWorkers()
      : process.env.NETLIFY
      ? netlify()
      : process.env.VERCEL
      ? vercel()
      : // otherwise use the static adapter
        adapter(),
  },
};

export default config;
