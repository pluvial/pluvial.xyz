<script context="module">
  /** @type {import('./__layout').Load} */
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
  import Footer from '$lib/Footer.svelte';
  import Header from '$lib/Header.svelte';
  import Search from '$lib/Search.svelte';
  import Switcher from '$lib/Switcher.svelte';
  import '$lib/prism-themes/prism-xonokai.css';
  import '../app.css';

  /** @type {string} */
  export let path;

  $: ({ pages } = $page.stuff);

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
      <Footer stuff={$page.stuff} />
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
