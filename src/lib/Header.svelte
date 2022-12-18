<script>
  import logo from './svelte-logo.svg';

  /** @type {Page[]} */
  export let pages;
  /** @type {string} */
  export let path;

  // sort links by page slug
  $: linkPages = [...pages].sort((a, b) => (a.slug > b.slug ? 1 : -1));
</script>

<header>
  <div class="corner">
    <a href="https://kit.svelte.dev">
      <img src={logo} alt="SvelteKit" />
    </a>
  </div>

  <nav>
    <ul>
      {#each linkPages as linkPage (linkPage.slug)}
        <li class:active={path === linkPage.href}>
          <a href={linkPage.href}>{linkPage.title}</a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }

  .corner {
    width: 3em;
    height: 3em;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .corner img {
    width: 2em;
    height: 2em;
    object-fit: contain;
  }

  nav {
    width: 100%;
    overflow: scroll;
  }

  ul {
    width: max-content;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    position: relative;
    display: inline-block;
    margin-left: 1em;
  }

  li.active::before {
    --size: 6px;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--accent-color);
  }

  nav a {
    display: flex;
    align-items: center;
    padding: 0 0;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--accent-color);
  }
</style>
