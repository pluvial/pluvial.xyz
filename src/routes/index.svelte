<script context="module">
  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ stuff }) {
    const { posts, links, backlinks } = stuff;
    return { props: { posts: posts.list, links, backlinks } };
  }
</script>

<script>
  /** @type {{ metadata: { title: string, description: string }, slug: string }[]} */
  export let posts;

  /** @type {{ [slug: string]: string[]}} */
  export let links;

  /** @type {{ [slug: string]: string[]}} */
  export let backlinks;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="author" content="pluvial" />
  <meta name="description" content="pluvial.xyz" />
</svelte:head>

<section>
  <h1>pluvial</h1>

  <h2>Source</h2>
  <ul>
    <li>
      <a href="https://github.com/pluvial/pluvial.xyz">pluvial/pluvial.xyz</a>
    </li>
    <li>
      <a href="https://github.com/pluvial">pluvial</a>
    </li>
  </ul>

  <h2>Pages</h2>
  <ul>
    {#each posts as post (post.slug)}
      <li>
        <a sveltekit:prefetch href="/{post.slug}">{post.metadata.title}</a>
      </li>
    {/each}
  </ul>

  <pre><code>{JSON.stringify({ links, backlinks }, null, 2)}</code></pre>
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
