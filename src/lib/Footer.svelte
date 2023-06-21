<script>
  /** @type {Link[]} */
  export let links;
  /** @type {Link[]} */
  // export let externalLinks;
  /** @type {Link[]} */
  export let backlinks;

  /** @param links {Link[]} */
  // function dedupe(links) {
  //   const set = new Set();
  //   return links.filter(({ href }) => (set.has(href) ? false : (set.add(href), true)));
  // }
</script>

<footer>
  {#if links.length}
    <p>Internal Links:</p>
    <ul>
      {#each links as link (link.href)}
        <li>
          <a href={link.href}>{link.content}</a>
        </li>
      {/each}
    </ul>
  {/if}

  <!-- {#if externalLinks.length}
    <p>External Links:</p>
    <ul>
      {#each dedupe(externalLinks) as link (link.href)}
        <li>
          <a href={link.href} rel="external">{link.content}</a>
        </li>
      {/each}
    </ul>
  {/if} -->

  {#if backlinks.length}
    <p>Backlinks:</p>
    <ul>
      {#each backlinks as { href, content } (href)}
        <li>
          <a {href}>{content}</a>
        </li>
      {/each}
    </ul>
  {/if}
</footer>

<style>
  footer {
    margin: var(--column-margin-top) auto;
  }
</style>
