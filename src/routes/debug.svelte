<script context="module">
  // import { browser, dev } from '$app/env';
  // export const hydrate = dev;
  // export const router = browser;
  export const prerender = true;
</script>

<script>
  import Layout from '$lib/Layout.svelte';
</script>

<svelte:head>
  <title>Debug</title>
</svelte:head>

<Layout>
  <h1>Color Palette</h1>
  <div class="flex">
    {#each { length: 8 } as _, index}
      <div class="block" style="background-color: var(--g{(2 * index + 1).toString(16)})" />
    {/each}
  </div>

  <div class="flex">
    {#each { length: 8 } as _, index}
      <div class="block" style="background-color: var(--c{(2 * index + 1).toString(16)})" />
    {/each}
  </div>
</Layout>

<style>
  .flex {
    display: flex;
  }

  .block {
    flex: 1;
    height: 8rem;
  }
</style>
