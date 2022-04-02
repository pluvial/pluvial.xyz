<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ url }) {
    // route transitions do not work correctly when using only $page.url.pathname
    return { props: { path: url.pathname } };
  }
</script>

<script>
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Header from '$lib/header/Header.svelte';
  import Search from '$lib/Search.svelte';
  import Switcher from '$lib/Switcher.svelte';
  import '$lib/prism-themes/prism-xonokai.css';
  import '../app.css';

  /** @type {string} */
  export let path;

  const duration = 150;
  const delay = duration + 50;

  /** @type {import('svelte/transition').FadeParams} */
  const transitionIn = { duration, delay, easing: cubicOut };
  /** @type {import('svelte/transition').FadeParams} */
  const transitionOut = { duration, easing: cubicIn };
</script>

<Switcher selected="new" visible={path === '/dropin-minimal-css'} />

<Header />

<Search documents={$page.stuff.pages} on:select={e => goto(e.detail.href)} />

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
