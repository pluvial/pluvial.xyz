<script context="module">
  const prefix = '/content/';
  const suffix = '.md';
  // vite does not support variables in glob imports, but the glob should match
  // const pattern = `${prefix}*${suffix}`
  const importsPosts = import.meta.glob('/content/*.md');
  // resolved imports map indexed by slug
  const resolvedPosts = {};

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params, stuff, url }) {
    const { ids, posts, backlinks } = stuff;
    const slug = params.slug || 'index';
    // build the filename from the folder prefix and extension suffix
    const file = `${prefix}${slug}${suffix}`;
    if (file in importsPosts) {
      resolvedPosts[slug] ??= await importsPosts[file]();
      const module = resolvedPosts[slug];
      // merge metadata from .md module (frontmatter), and derived metadata calculated
      // in $lib/posts.js, exposed via the posts.json endpoint
      const metadata = {
        ...module.metadata,
        ...posts[ids[slug]].metadata,
        // get the backlinks for this particular page, deriving the href from the slug,
        // and using the corresponding page title as the backlink content
        backlinks:
          backlinks[slug]?.map(link => ({
            href: `/${link}`,
            content: posts[ids[link]].metadata.title,
          })) ?? [],
      };
      return { props: { component: module.default, metadata, path: url.pathname, stuff } };
    }
    // TODO: render fallback content here, use a placeholder page for known links,
    // and a regular page not found otherwise
    console.warn(`Trying to render missing page: ${slug}, did not find ${file}`);
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

  /** @type {string} */
  export let path;

  /**
   * @typedef Stuff
   * @property {{ metadata: { title: string, description: string }, slug: string }[]} posts
   * @property {{ [slug: string]: string[] }} links
   * @property {{ [slug: string]: string[] }} backlinks
   * 

  /** @type {Stuff} */
  export let stuff;

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

{#if path === '/'}
  <section>
    <svelte:component this={component} />

    <!-- render page index -->
    <h2>Pages</h2>
    <ul>
      {#each stuff.posts as post (post.slug)}
        <li>
          <a sveltekit:prefetch href="/{post.slug}">{post.metadata.title}</a>
        </li>
      {/each}
    </ul>

    <pre><code>{JSON.stringify(stuff, null, 2)}</code></pre>
  </section>

  <style>
    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      margin: var(--column-margin-top) auto 0 auto;
    }

    h1,
    pre {
      width: 100%;
    }
  </style>
{:else}
  <svelte:component this={component} />
{/if}

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
