<script>
  export let title = 'pluvial.xyz';
  export let author = 'pluvial';
  export let description = 'pluvial.xyz';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content={author} />
  <meta name="description" content={description} />
</svelte:head>

<div class="content">
  <slot />
</div>

<style>
  .content {
    width: 100%;
    max-width: var(--column-width);
    margin: var(--column-margin-top) auto 0 auto;
  }
</style>
