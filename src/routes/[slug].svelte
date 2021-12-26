<script context="module">
  export const prerender = true;

  const prefix = '/content';
  const suffix = 'md';
  // vite does not support variables in glob imports, but the glob should match
  // const pattern = `${prefix}/**/*.${suffix}`
  const posts = import.meta.glob('/content/**/*.md');

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page }) {
    const { slug } = page.params;
    // build the filename from the folder prefix and extension suffix
    const file = `${prefix}/${slug}.${suffix}`;
    if (file in posts) {
      const module = await posts[file]();
      return { props: { component: module.default } };
    }
  }
</script>

<script>
  /** @type {import('svelte').SvelteComponent} */
  export let component;
</script>

<svelte:component this={component} />
