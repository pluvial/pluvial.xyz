import { error } from '@sveltejs/kit';

/** @typedef { { default: import('svelte').SvelteComponent} } ContentModule */

// vite does not support variables in glob imports, but the glob should match
// const pattern = `${prefix}*${suffix}`
/** @type {Record<string, () => Promise<ContentModule>>} */
const imports = import.meta.glob('/content/*.md');
// resolved imports map indexed by path
/** @type {Record<string, ContentModule} */
const modules = {};

/** @type {import('./$types').PageLoad} */
export async function load({ data: page }) {
  if (!page.path) {
    // TODO: render fallback content here, use a placeholder page for known
    // links, and a regular page not found otherwise
    throw error(404, 'Not found');
  }
  const { path, title, author, description } = page;
  modules[path] ??= await imports[path]();
  const { default: component } = modules[path];
  return {
    title,
    author,
    description,
    component,
    page,
  };
}
