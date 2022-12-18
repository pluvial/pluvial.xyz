<script>
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Footer, Header, Search, Switcher } from '$lib/components';
  import '$lib/prism-themes/prism-xonokai.css';
  import './styles.css';

  /** @type {import('./$types').LayoutData} */
  export let data;

  $: ({ pages, path } = data);

  // get page data injected by the [...page].svelte load function
  $: ({ links, externalLinks, backlinks } = $page.data.page ?? pages[0]);

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
