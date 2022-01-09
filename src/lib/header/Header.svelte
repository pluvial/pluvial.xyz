<script>
  import { page } from '$app/stores';
  import logo from './svelte-logo.svg';
</script>

<header>
  <div class="corner">
    <a href="https://kit.svelte.dev">
      <img src={logo} alt="SvelteKit" />
    </a>
  </div>

  <nav>
    <div class="nav-corner left" />
    <ul>
      <li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
      <li class:active={$page.url.pathname === '/readme'}>
        <a sveltekit:prefetch href="/readme">Readme</a>
      </li>
      <li class:active={$page.url.pathname === '/welcome'}>
        <a sveltekit:prefetch href="/welcome">Welcome</a>
      </li>
      <li class:active={$page.url.pathname === '/about'}>
        <a sveltekit:prefetch href="/about">About</a>
      </li>
      <li class:active={$page.url.pathname === '/debug'}>
        <a sveltekit:prefetch href="/debug">Debug</a>
      </li>
    </ul>
    <div class="nav-corner right" />
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
    display: flex;
    justify-content: center;
    --background: var(--background-without-opacity);
  }

  .nav-corner {
    width: 0;
    margin: 0;
    border-top: 2em solid transparent;
    border-bottom: 2em solid transparent;
  }

  .nav-corner.left {
    border-right: 0.5em solid var(--background);
  }

  .nav-corner.right {
    border-left: 0.5em solid var(--background);
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    /* height: 3em; */
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background);
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
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
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: var(--heading-color);
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
