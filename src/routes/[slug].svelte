<script context="module">
  export const prerender = true;

  const prefix = '/content/';
  const suffix = '.md';
  // vite does not support variables in glob imports, but the glob should match
  // const pattern = `${prefix}*${suffix}`
  const importsPosts = import.meta.glob('/content/*.md');
  const importsMeta = import.meta.glob('/metadata/*.json');

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    const { slug } = params;
    // build the filename from the folder prefix and extension suffix
    const file = `${prefix}${slug}${suffix}`;
    if (file in importsPosts) {
      const metadataFile = `/metadata/${slug}.json`;
      const [module, moduleMetadata] = await Promise.all([
        importsPosts[file](),
        importsMeta[metadataFile](),
      ]);
      const { default: component, metadata } = module;
      return { props: { component, metadata: { ...metadata, ...moduleMetadata.default } } };
    }
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
   * @property {{ href: string, content: string }} links
   * @property {{ href: string, content: string }} externalLinks
   * @property {{ href: string, content: string }} backlinks
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
      {#each backlinks as slug (slug)}
        <li>
          <a sveltekit:prefetch href="/{slug}">{slug}</a>
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
