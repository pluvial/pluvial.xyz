import { ids, pages, links, backlinks, getPageBacklinks } from '$lib/pages';

const stuff = { ids, pages, links, backlinks };

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  const slug = params.slug || 'index';
  if (!(slug in ids)) {
    // TODO: render fallback content here, use a placeholder page for known
    // links, and a regular page not found otherwise
    console.warn(`Trying to render missing page: ${slug}`);
    return;
  }
  const page = pages[ids[slug]];
  const metadata = {
    ...page.metadata,
    backlinks: getPageBacklinks(slug),
  };
  return { body: { metadata, stuff } };
}