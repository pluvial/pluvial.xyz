<script context="module">
  // cached to avoid fetching (even if from cache) on every page navigation
  let posts, links, backlinks, searchDocuments;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, url }) {
    if (!posts || !links || !backlinks) {
      const response = await fetch('/posts.json');
      ({ posts, links, backlinks } = await response.json());
    }
    if (!searchDocuments) {
      const response = await fetch('/search.json');
      ({ searchDocuments } = await response.json());
    }
    return { props: { path: url.pathname } };
  }
</script>

<script>
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import Header from '$lib/header/Header.svelte';
  import Search from '$lib/Search.svelte';
  import Switcher from '$lib/Switcher.svelte';
  import '$lib/prism-themes/prism-xonokai.css';
  import '../app.css';

  /** @type {string} */
  export let path;

  const duration = 200;
  const delay = duration + 50;
  /** @type {import('svelte/transition').FadeParams} */
  const transitionIn = { duration, delay, easing: cubicOut };
  /** @type {import('svelte/transition').FadeParams} */
  const transitionOut = { duration, easing: cubicIn };
</script>

<Switcher selected="new" visible={path === '/dropin-minimal-css'} />

<Header />

<Search documents={searchDocuments} />

<main>
  {#key path}
    <div class="container" in:fade={transitionIn} out:fade={transitionOut}>
      <slot />
    </div>
  {/key}
</main>

<style>
  main {
    flex: 1;
    position: relative;
    width: 100%;
    max-width: 1024px;
    /* TODO: this won't scale with the content, change height with JS at runtime? */
    min-height: 450px;
    margin: 0 auto;
  }

  .container {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    padding: 0;
  }
</style>
