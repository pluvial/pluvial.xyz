<script context="module">
  export const prerender = true;

  const prefix = '/content';
  const suffix = 'md';
  // vite does not support variables in glob imports, but the glob should match
  // const pattern = `${prefix}/**/*.${suffix}`
  const posts = import.meta.glob('/content/**/*.md');

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    // build the filename from the folder prefix and extension suffix
    const file = `${prefix}/${params.slug}.${suffix}`;
    if (file in posts) {
      const module = await posts[file]();
      const { default: component, metadata } = module;
      return { props: { component, metadata } };
    }
  }
</script>

<script>
  /** @type {import('svelte').SvelteComponent} */
  export let component;

  /** @type {{ title: string, author: string, description: string }} */
  export let metadata;

  const defaults = { title: 'pluvial.xyz', author: 'pluvial', description: 'pluvial.xyz' };
  const { title, author, description } = { ...defaults, ...metadata };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content={author} />
  <meta name="description" content={description} />
</svelte:head>

<svelte:component this={component} />
