---
title: Welcome
---

<script>
  import Counter from '$lib/Counter.svelte';
</script>

<section>

# Welcome to your new SvelteKit app

## try editing **src/routes/index.svelte**

  <Counter />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    margin: var(--column-margin-top) auto 0 auto;
  }

  h1 {
    width: 100%;
  }
</style>
