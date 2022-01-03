# pluvial.xyz

## Deployments

Main: [pluvial.xyz](https://pluvial.xyz) (Vercel)

Cloudflare Pages: [https://pluvial-xyz.pages.dev](https://pluvial-xyz.pages.dev)

Cloudflare Workers: [https://pluvial-xyz.pluvial.workers.dev](https://pluvial-xyz.pluvial.workers.dev)

Netlify: [https://pluvial-xyz.netlify.app](https://pluvial-xyz.netlify.app)

Vercel: [https://pluvial-xyz.vercel.app](https://pluvial-xyz.vercel.app)

## Developing

Install dependencies with `pnpm install` (or `pnpm i`), and start a development server:

```sh
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of the app, a different [adapter](https://kit.svelte.dev/docs#adapters)
is used for each target environment. To build using the default `adapter-static`, use:

```sh
pnpm build
```

> You can preview the built app with `pnpm preview`. This should _not_ be used to serve the app in production.
