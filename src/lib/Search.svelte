<script>
  import { tick } from 'svelte';
  import { goto } from '$app/navigation';

  export let index;

  let value;
  let selectedResultIndex = 0;
  let selectedHref = '';

  $: results = index
    .search(value, { enrich: true })
    .flatMap(({ result }) => result.map(({ doc }) => doc));
  $: selectedResult = results[selectedResultIndex];

  function reset() {
    selectedResultIndex = 0;
    value = '';
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
      {#each results as { title, content, description, href }, index}
        <li>
          <a
            {href}
            class:selected={selectedResultIndex === index}
            on:click|preventDefault={async () => {
              selectedResultIndex = index;
              await tick();
              selectResult();
            }}
          >
            {title}
            <span>{description ?? content.slice(0, 30)}</span>
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
