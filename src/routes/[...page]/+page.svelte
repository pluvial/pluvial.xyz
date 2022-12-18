<script>
  /** @type {import('./$types').PageData} */
  export let data;

  $: ({ component, title, author, description } = data);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content={author} />
  <meta name="description" content={description} />
</svelte:head>

<svelte:component this={component} />
