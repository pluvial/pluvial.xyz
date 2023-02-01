<script>
  import { createEventDispatcher, onMount, tick } from 'svelte';

  /** @type {Page[]} */
  export let pages;

  /** @type {HTMLInputElement} */
  let input;
  /** @type {import('flexsearch').Document}*/
  let searchIndex;
  /** @type {string}*/
  let value;
  let selectedResultIndex = 0;

  $: resultIds =
    searchIndex
      ?.search(value, { enrich: true, limit: 10 })
      .flatMap(({ result }) => result.map(({ id }) => id)) ?? [];
  // deduplicate results across different indices
  $: results = [...new Set(resultIds)].map(id => pages[id]);

  function reset() {
    selectedResultIndex = 0;
    value = '';
  }

  const dispatch = createEventDispatcher();

  function selectResult() {
    const selectedResult = results[selectedResultIndex];
    dispatch('select', selectedResult);
    reset();
  }

  /** @param {KeyboardEvent} event */
  function inputKeydown(event) {
    switch (event.key) {
      case 'Escape':
        /** @type {HTMLInputElement} */ (event.target).blur();
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

  /** @param {KeyboardEvent} event */
  function itemKeydown(event) {
    const target = /** @type {HTMLLIElement} */ (event.target);
    switch (event.key) {
      case 'Escape':
        target.blur();
        break;
      case 'Tab':
        // TODO: fix this
        if (!event.shiftKey) selectedResultIndex += 1;
        else selectedResultIndex -= 1;
        break;
    }
  }

  onMount(async () => {
    const { default: Document } = await import('flexsearch/document');
    // options from flexsearch documentation example
    searchIndex = new Document({
      id: 'id',
      index: [
        {
          field: 'title',
          tokenize: 'forward',
          optimize: true,
          resolution: 9,
        },
        {
          field: 'content',
          tokenize: 'strict',
          optimize: true,
          resolution: 5,
          minlength: 3,
          context: {
            depth: 1,
            resolution: 3,
          },
        },
        'slug',
      ],
      store: true,
      cache: true,
    });

    for (const page of pages) {
      searchIndex.add(page);
    }
  });
</script>

<!-- focus the search input when pressing '/' -->
<svelte:window
  on:keydown={event => {
    if (event.key === '/') {
      event.preventDefault();
      input.focus();
      input.select();
    }
  }}
/>

<form on:submit|preventDefault={selectResult}>
  <label
    >Search:
    <input bind:this={input} bind:value type="text" on:keydown={inputKeydown} />
  </label>

  {#if results.length > 0}
    <ul>
      {#each results as { title, description, href }, index (href)}
        <li
          class:selected={selectedResultIndex === index}
          on:click|preventDefault={async () => {
            selectedResultIndex = index;
            await tick();
            selectResult();
          }}
          on:keydown={itemKeydown}
        >
          <a {href}
            >{title}
            <pre>{description}</pre></a
          >
        </li>
      {/each}
    </ul>
  {/if}
</form>

<style>
  form {
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
    /* initially not visible, only when input is focused */
    opacity: 0;
    transition: opacity 200ms;
  }

  form:focus-within ul {
    opacity: 1;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    transition: color 150ms;
  }

  .selected a,
  a:hover {
    color: var(--accent-color);
  }

  pre {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
