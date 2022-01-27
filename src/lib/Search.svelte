<script>
  import { tick } from 'svelte';
  import { goto } from '$app/navigation';

  export let index;
  export let posts;

  let value;
  let selectedResultIndex = 0;
  let selectedHref = '';

  $: results = search(value);
  $: selectedResult = results[selectedResultIndex];

  function reset() {
    selectedResultIndex = 0;
    value = '';
  }

  function search(text) {
    const slugs = index.search(text);
    const results = slugs.map(slug => {
      const post = posts.map[slug];
      return { text: post.metadata.title, href: `/${slug}` };
    });
    return results;
  }

  function selectResult() {
    selectedHref = selectedResult.href;
    goto(selectedHref);
    reset();
  }

  function keydown(event) {
    switch (event.key) {
      case 'Enter':
        selectResult();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (selectedResultIndex === results.length - 1) {
          selectedResultIndex = 0;
        } else {
          selectedResultIndex += 1;
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (selectedResultIndex === 0) {
          selectedResultIndex = results.length - 1;
        } else {
          selectedResultIndex -= 1;
        }
        break;
    }
  }
</script>

<div class="search">
  <input bind:value type="text" on:keydown={keydown} />

  {#if results.length > 0}
    <ul>
      {#each results as result, index}
        <li>
          <a
            href={result.href}
            class:selected={selectedResultIndex === index}
            on:click|preventDefault={async () => {
              selectedResultIndex = index;
              await tick();
              selectResult();
            }}
          >
            {result.text}
            {#if result.description}<span>– {result.description}</span>{/if}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .search {
    position: relative;
  }

  input {
    width: 100%;
  }

  ul {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: #000d;
    padding: 0.8em;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .selected {
    color: var(--accent-color);
  }
</style>
