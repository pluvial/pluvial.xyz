import cloudflare from '@sveltejs/adapter-cloudflare-workers';
import netlify from '@sveltejs/adapter-netlify';
import adapter from '@sveltejs/adapter-static';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    // in a production build, use the adapter implied by the platform's environment variables
    adapter: process.env.CF_ACCOUNT_ID
      ? cloudflare()
      : process.env.VERCEL
      ? vercel()
      : process.env.NETLIFY
      ? netlify()
      : // otherwise use the static adapter
        adapter(),
  },
};

export default config;
