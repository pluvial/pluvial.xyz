import cloudflare from '@sveltejs/adapter-cloudflare';
import cloudflareWorkers from '@sveltejs/adapter-cloudflare-workers';
import netlify from '@sveltejs/adapter-netlify';
import adapter from '@sveltejs/adapter-static';
import vercel from '@sveltejs/adapter-vercel';
import deno from 'svelte-adapter-deno';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig)],
  kit: {
    adapter: process.env.CF_PAGES
      ? cloudflare()
      : process.env.CF_ACCOUNT_ID
      ? cloudflareWorkers()
      : process.env.NETLIFY
      ? netlify()
      : process.env.VERCEL
      ? vercel()
      : process.env.DENO
      ? deno()
      : // otherwise use the static adapter
        adapter(),
    prerender: {
      entries: ['/'],
      handleMissingId: 'warn',
    },
  },
};

export default config;
