import { sveltekit } from '@sveltejs/kit/vite';
import zig from 'vite-plugin-zig';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), zig()],
  server: {
    fs: {
      allow: ['.'],
    },
  },
};

export default config;
