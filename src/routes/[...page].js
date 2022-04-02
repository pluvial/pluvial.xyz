import { ids, pages, links, backlinks } from '$lib/pages';

const stuff = { ids, pages, links, backlinks };

/** @type {import('./[...page]').RequestHandler} */
export async function get({ params: { page: slug } }) {
  if (!(slug in ids)) {
    // TODO: render fallback content here, use a placeholder page for known
    // links, and a regular page not found otherwise
    console.warn(`Trying to render missing page: ${slug}`);
    return { redirect: '/', status: 303 };
  }
  return { body: { page: pages[ids[slug]], stuff } };
}