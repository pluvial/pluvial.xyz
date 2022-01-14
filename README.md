# pluvial.xyz

## Deployments

Deployed automatically when pushing to the `main` branch:

- Main: [pluvial.xyz](https://pluvial.xyz) (Vercel)

- Cloudflare Pages: [https://pluvial-xyz.pages.dev](https://pluvial-xyz.pages.dev)

- Netlify: [https://pluvial-xyz.netlify.app](https://pluvial-xyz.netlify.app)

- Vercel: [https://pluvial-xyz.vercel.app](https://pluvial-xyz.vercel.app)

Deployed automatically when pushing to the `deno` branch:

- Deno Deploy: [https://pluvial-xyz.deno.dev](https://pluvial-xyz.deno.dev)

Deployed manually from dev machine:

- Cloudflare Workers: [https://pluvial-xyz.pluvial.workers.dev](https://pluvial-xyz.pluvial.workers.dev)

```sh
env CF_ACCOUNT_ID='<account-id>' wrangler publish
```

- Deno Deploy: [https://pluvial-xyz.deno.dev](https://pluvial-xyz.deno.dev)

```sh
env DENO_DEPLOY_TOKEN='<token>' deployctl deploy --project=pluvial-xyz --exclude=node_modules build/index.js
```

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

## License

The content of this project itself is licensed under the [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0),
and the underlying source code used to format and display that content is
licensed under the [MIT license](https://github.com/pluvial/pluvial.xyz/blob/main/LICENSE).
