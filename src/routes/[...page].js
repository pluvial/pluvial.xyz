import { pages, ids } from '$lib/pages';

/** @type {import('./[...page]').RequestHandler} */
export async function get({ params: { page: slug } }) {
  if (!(slug in ids)) {
    // TODO: render fallback content here, use a placeholder page for known
    // links, and a regular page not found otherwise
    console.warn(`Trying to render missing page: ${slug}`);
    return { redirect: '/', status: 303 };
  }
  const { path, title, author, description, links, externalLinks, backlinks } = pages[ids[slug]];
  return { body: { page: { path, title, author, description, links, externalLinks, backlinks } } };
}
