---
title: Debug
---

<script>
  import { page } from '$app/stores'
</script>

# Links

Wiki link: [[about]]

Wiki link alias: [[readme|README.md]]

External link: [Repo](https://github.com/pluvial/pluvial.xyz)

# Code block

```svelte
<script>
  import Example from '$lib/Example.svelte';
</script>

<h1>Hello Prism</h1>

<Example />

<style>
  h1 {
    color: #0dd;
  }
</style>
```

# Color Palette

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

# Stuff

<pre><code>{JSON.stringify($page.stuff, null, 2)}</code></pre>

<style>
  .flex {
    display: flex;
  }

.block {
flex: 1;
height: 8rem;
}
</style>
