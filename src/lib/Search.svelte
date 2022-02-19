<script>
  import { onMount, tick } from 'svelte';
  import { goto } from '$app/navigation';

  export let documents;

  let searchIndex;
  let value;
  let selectedResultIndex = 0;
  let selectedHref = '';

  $: resultIds =
    searchIndex
      ?.search(value, { enrich: true, limit: 10 })
      .flatMap(({ result }) => result.map(({ id }) => id)) ?? [];
  // deduplicate results across different indices
  $: results = [...new Set(resultIds)].map(id => documents[id]);
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

  onMount(async () => {
    const { default: FlexSearch } = await import('flexsearch');
    // options from flexsearch documentation example
    searchIndex = new FlexSearch.Document({
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

    for (const document of documents) {
      searchIndex.add(document);
    }
  });
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
            <pre>{description ?? content.split('\n').slice(0, 3).join('\n')}</pre>
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

  pre {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
