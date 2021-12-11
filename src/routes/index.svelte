<script context="module">
  // import { browser, dev } from '$app/env';
  // export const hydrate = dev;
  // export const router = browser;
  export const prerender = true;
</script>

<script>
  import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="author" content="pluvial" />
  <meta name="description" content="pluvial.xyz" />
</svelte:head>

<section>
  <h1>Welcome to your new SvelteKit app</h1>

  <h2>
    try editing <strong>src/routes/index.svelte</strong>
  </h2>

  <Counter />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }
</style>
