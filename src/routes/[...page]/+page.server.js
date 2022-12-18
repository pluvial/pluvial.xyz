import { redirect } from '@sveltejs/kit';
import { pages, ids } from '$lib/pages';

/** @type {import('./$types').PageServerLoad} */
export function load({ params: { page: slug } }) {
  if (!(slug in ids)) {
    // TODO: render fallback content here, use a placeholder page for known
    // links, and a regular page not found otherwise
    console.warn(`Trying to render missing page: ${slug}`);
    throw redirect(303, '/');
  }
  const { path, title, author, description, links, externalLinks, backlinks } = pages[ids[slug]];
  return { path, title, author, description, links, externalLinks, backlinks };
}
