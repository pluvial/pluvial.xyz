<script context="module">
  // cached to avoid fetching (even if from cache) on every page navigation
  let promise;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, url }) {
    promise ??= Promise.all([
      fetch('/posts.json').then(response => response.json()),
      fetch('/search.json').then(response => response.json()),
    ]);
    const [{ posts, links, backlinks }, { searchDocuments }] = await promise;
    return { props: { path: url.pathname, searchDocuments }, stuff: { posts, links, backlinks } };
  }
</script>

<script>
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import Header from '$lib/header/Header.svelte';
  import Search from '$lib/Search.svelte';
  import Switcher from '$lib/Switcher.svelte';
  import '$lib/prism-themes/prism-xonokai.css';
  import '../app.css';

  /** @type {string} */
  export let path;

  export let searchDocuments;

  const duration = 200;
  const delay = duration + 50;
  /** @type {import('svelte/transition').FadeParams} */
  const transitionIn = { duration, delay, easing: cubicOut };
  /** @type {import('svelte/transition').FadeParams} */
  const transitionOut = { duration, easing: cubicIn };
</script>

<Switcher selected="new" visible={path === '/dropin-minimal-css'} />

<Header />

<Search documents={searchDocuments} on:select={e => goto(e.detail.href)} />

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
