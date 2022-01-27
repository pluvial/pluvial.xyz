<script context="module">
  import FlexSearch from 'flexsearch';

  const index = new FlexSearch.Index({ tokenize: 'forward' });

  // cached posts and backlinks to avoid fetching (even if from cache) on every page navigation
  let posts, links, backlinks;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, url }) {
    if (!posts || !links || !backlinks) {
      const response = await fetch('/posts.json');
      ({ posts, links, backlinks } = await response.json());
    }
    const { searchIndex } = await (await fetch('/search.json')).json();
    for (const [key, value] of searchIndex) {
      index.add(key, value);
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

<Search {index} {posts} />

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
