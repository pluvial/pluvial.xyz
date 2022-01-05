<script context="module">
  // import { browser, dev } from '$app/env';
  // export const hydrate = dev;
  // export const router = browser;
  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch }) {
    const response = await fetch('/posts.json');
    const posts = await response.json();
    return { props: { posts: posts.list } };
  }
</script>

<script>
  /**
   * @type {{ metadata: { title: string, description: string }, slug: string }[]}
   */
  export let posts;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="author" content="pluvial" />
  <meta name="description" content="pluvial.xyz" />
</svelte:head>

<section>
  <h1>pluvial</h1>

  <ul>
    {#each posts as post (post.slug)}
      <li>
        <a sveltekit:prefetch href="/{post.slug}">{post.metadata.title}</a>
      </li>
    {/each}
  </ul>

  <h2>
    <a href="https://github.com/pluvial">GitHub</a>
  </h2>
  <h2>
    <a href="https://github.com/pluvial/pluvial.xyz">Source</a>
  </h2>
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

  h1 {
    width: 100%;
  }

  ul {
    list-style: none;
    display: flex;
    min-width: 20em;
  }

  li {
    flex: auto;
  }
</style>
