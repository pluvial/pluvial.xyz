---
title: JavaScript Tooling
---

# JavaScript Tooling

## Near-production

- `now dev`
- `netlify dev -d public`

## Live reload

- `parcel public/index.html`
- `zero public`
- `eleventy --passthroughall --input=public --serve`

## Hot module reloading

- For parcel and zero, enable HMR using `module.hot && module.hot.accept();`

## Documentation

- [parcel](https://parceljs.org/)
- [zero](https://zeroserver.io/)
- [netlify dev](https://github.com/netlify/cli/blob/master/docs/netlify-dev.md)
- [now dev](https://zeit.co/docs/now-cli#commands/dev)
- [browser-sync](https://github.com/Browsersync/browser-sync)

## CDNs

[UNPKG](https://unpkg.com/)

[cdnjs - The #1 free and open source CDN built to make life easier for developers](https://cdnjs.com/)

[jsDelivr - A free, fast, and reliable CDN for Open Source](https://www.jsdelivr.com/)

[jspm.org - jspm.dev Documentation](https://jspm.io/)

[Skypack](https://www.skypack.dev/)

## ES Modules

[Snowpack](https://www.snowpack.dev/)

[GitHub - snowpackjs/esm-hmr: a Hot Module Replacement (HMR) API for your ESM-based dev server.](https://github.com/snowpackjs/esm-hmr)

[GitHub - natemoo-re/microsite: Do more with less JavaScript. Microsite is a smarter, performance-obsessed static site generator powered by Preact and Snowpack.](https://github.com/natemoo-re/microsite)

[jspm.org - jspm.dev Documentation](https://jspm.org/)

### Vite

[Vite](https://vitejs.dev/)

[vitejs/vite](https://github.com/vitejs/vite)

[intrnl/vite-plugin-svelte](https://github.com/intrnl/vite-plugin-svelte)

[dominikg/svite](https://github.com/dominikg/svite)

## Production bundles

[Rollup](https://rollupjs.org/guide/en/)

[GitHub - rollup/rollup: Next-generation ES module bundler](https://github.com/rollup/rollup)

[esbuild - An extremely fast JavaScript bundler](https://esbuild.github.io/)

[evanw/esbuild](https://github.com/evanw/esbuild)

[GitHub - developit/microbundle: 📦 Zero-configuration bundler for tiny modules.](https://github.com/developit/microbundle)

[GitHub - formium/tsdx: Zero-config CLI for TypeScript package development](https://github.com/jaredpalmer/tsdx)

[Rome Toolchain](https://romejs.dev/)

[GitHub - rome/tools: The Rome Toolchain. A linter, compiler, bundler, and more for JavaScript, TypeScript, HTML, Markdown, and CSS.](https://github.com/romejs/rome)

[Bili](https://bili.egoist.sh/#/)

[GitHub - egoist/bili: Bili makes it easier to bundle JavaScript libraries.](https://github.com/egoist/bili)

[GitHub - snowpackjs/pack: 📦⚡️ Build your npm package using composable plugins. https://www.pika.dev/blog/introducing-pika-pack/](https://github.com/snowpackjs/pack)

[FuseBox · A bundler that does it right](https://fuse-box.org/)

[StealJS](https://stealjs.com/)

[Fastpack · Pack JavaScript fast & easy](https://fastpack.sh/)

[GitHub - fastpack/fastpack: Pack JS code fast & easy](https://github.com/fastpack/fastpack)

## Transpilers

[Babel · The compiler for next generation JavaScript](https://babeljs.io/)

[Sucrase](https://sucrase.io/)

[swc · Super fast javascript / typescript compiler](https://swc.rs/)

## Linters

[ESLint - Pluggable JavaScript linter](https://eslint.org/)

[RDambrosio016/RSLint](https://github.com/RDambrosio016/RSLint)

## Executable packaging

[GitHub - vercel/ncc: Compile a Node.js project into a single file. Supports TypeScript, binary addons, dynamic requires.](https://github.com/vercel/ncc)

[GitHub - vercel/pkg: Package your Node.js project into an executable](https://github.com/zeit/pkg)

[GitHub - nexe/nexe: 🎉 create a single executable out of your node.js apps](https://github.com/nexe/nexe)

[Modern Web](https://modern-web.dev/)

[Web Dev Server: Modern Web](https://modern-web.dev/docs/dev-server/overview/)
