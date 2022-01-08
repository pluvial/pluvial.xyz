<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ url }) {
    return { props: { path: url.pathname } };
  }
</script>

<script>
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import Header from '$lib/header/Header.svelte';
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

<Header />

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
    /* TODO: this won't scale with the content, change height with JS at runtime */
    min-height: 450px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    max-width: var(--column-width);
    margin: var(--column-margin-top) auto 0 auto;
    padding: 0;
  }
</style>
