---
title: Zig WebAssembly
---

<script>
  import { onMount } from 'svelte';

  const a = 2;
  const b = 3;

  let result;

  onMount(async () => {
    const wasm = await import('$lib/main.zig?instantiate');
    await wasm.instantiated;
    result = wasm.exports.add(a, b);
  });
</script>

# WebAssembly Example

<p>
  {#if result}
    {a} + {b} = {result}
  {/if}
</p>
