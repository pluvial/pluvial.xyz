<script context="module">
  // vite does not support variables in glob imports, but the glob should match
  // const pattern = `${prefix}*${suffix}`
  const imports = import.meta.glob('/content/*.md');
  // resolved imports map indexed by path
  const modules = {};

  /** @type {import('./[...page]').Load} */
  export async function load({ props: page }) {
    if (!page.path) {
      // TODO: render fallback content here, use a placeholder page for known
      // links, and a regular page not found otherwise
      return { error: 'Page not found', status: 404 }
    }
    const { path, title, author, description } = page;
    modules[path] ??= await imports[path]();
    const { default: component } = modules[path];
    return {
      props: { title, author, description, component },
      stuff: { page },
    };
  }
</script>

<script>
  /** @type {import('svelte').SvelteComponent} */
  export let component;

  /** @type {string} */
  export let title;
  /** @type {string} */
  export let author;
  /** @type {string} */
  export let description;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content={author} />
  <meta name="description" content={description} />
</svelte:head>

<svelte:component this={component} />
