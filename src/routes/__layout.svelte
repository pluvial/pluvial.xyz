<script context="module">
  // cached to avoid fetching (even if from cache) on every page navigation
  let promise;

  /** @type {import('./__layout').Load} */
  export async function load({ fetch, url }) {
    promise ??= fetch('/pages.json').then(response => response.json());
    const { pages, ids, links, backlinks } = await promise;
    // route transitions do not work correctly when using only
    // $page.url.pathname in template, use url.pathname in load function instead
    return {
      props: { pages, path: url.pathname },
      stuff: { pages, ids, links, backlinks },
    };
  }
</script>

<script>
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Footer, Header, Search, Switcher } from '$lib/components';
  import '$lib/prism-themes/prism-xonokai.css';
  import '../app.css';

  /** @type {Page[]} */
  export let pages;

  /** @type {string} */
  export let path;

  // get page data from stuff injected by the [...page].svelte load function
  $: ({ links, externalLinks, backlinks } = $page.stuff.page);

  const duration = 150;
  const delay = duration + 50;

  /** @type {import('svelte/transition').FadeParams} */
  const transitionIn = { duration, delay, easing: cubicOut };
  /** @type {import('svelte/transition').FadeParams} */
  const transitionOut = { duration, easing: cubicIn };
</script>

<Switcher selected="new" hidden={path !== '/dropin-minimal-css'} />

<Header {pages} {path} />

<Search {pages} on:select={e => goto(e.detail.href)} />

<div class="container">
  {#key path}
    <main in:fade={transitionIn} out:fade={transitionOut}>
      <slot />
      <Footer {links} {externalLinks} {backlinks} />
    </main>
  {/key}
  <!-- TODO: this container div won't scale with the content -->
</div>

<style>
  .container {
    flex: 1;
    position: relative;
    width: 100%;
    max-width: 1024px;
    /* TODO: this won't scale with the content, change height with JS at runtime? */
    min-height: 450px;
    margin: 0 auto;
  }

  main {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    padding: 0;
  }
</style>
