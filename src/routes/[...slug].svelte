<script context="module">
  const prefix = '/content/';
  const suffix = '.md';
  // vite does not support variables in glob imports, but the glob should match
  // const pattern = `${prefix}*${suffix}`
  const imports = import.meta.glob('/content/*.md');
  // resolved imports map indexed by slug
  const modules = {};

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params, props }) {
    const slug = params.slug || 'index';
    // build the filename from the folder prefix and extension suffix
    const path = `${prefix}${slug}${suffix}`;
    if (!(path in imports)) {
      // TODO: render fallback content here, use a placeholder page for known
      // links, and a regular page not found otherwise
      console.warn(`Trying to render missing page: ${slug}, did not find ${path}`);
      return;
    }
    modules[slug] ??= await imports[path]();
    const module = modules[slug];
    return { props: { component: module.default, metadata: props.metadata }, stuff: props.stuff };
  }
</script>

<script>
  /** @type {import('svelte').SvelteComponent} */
  export let component;

  /**
   * @typedef Metadata
   * @property {string} title
   * @property {string} author
   * @property {string} description
   * @property {{ href: string, content: string }[]} links
   * @property {{ href: string, content: string }[]} externalLinks
   * @property {{ href: string, content: string }[]} backlinks
   */

  /** @type {Metadata} */
  export let metadata;

  const defaults = { title: 'pluvial.xyz', author: 'pluvial', description: 'pluvial.xyz' };
  const { title, author, description, links, externalLinks, backlinks } = {
    ...defaults,
    ...metadata,
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content={author} />
  <meta name="description" content={description} />
</svelte:head>

<svelte:component this={component} />

<footer>
  {#if links.length}
    <p>Internal Links:</p>
    <ul>
      {#each links as link (link.href)}
        <li>
          <a sveltekit:prefetch href={link.href}>{link.content}</a>
        </li>
      {/each}
    </ul>
  {/if}

  {#if externalLinks.length}
    <p>External Links:</p>
    <ul>
      {#each externalLinks as link (link.href)}
        <li>
          <a href={link.href} rel="external">{link.content}</a>
        </li>
      {/each}
    </ul>
  {/if}

  {#if backlinks.length}
    <p>Backlinks:</p>
    <ul>
      {#each backlinks as { href, content } (href)}
        <li>
          <a sveltekit:prefetch {href}>{content}</a>
        </li>
      {/each}
    </ul>
  {/if}
</footer>

<style>
  footer {
    margin: var(--column-margin-top) auto;
  }
</style>
