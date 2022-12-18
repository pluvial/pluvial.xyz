// cached to avoid fetching (even if from cache) on every page navigation
let promise;

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, url }) {
  promise ??= fetch('/pages.json').then(response => response.json());
  const { pages, ids, links, backlinks } = await promise;
  return {
    pages,
    ids,
    links,
    backlinks,
    // route transitions do not work correctly when using only
    // $page.url.pathname in template, use url.pathname in load function instead
    path: url.pathname,
  };
}

export const prerender = true;
