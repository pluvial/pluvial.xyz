import { ids, posts, links, backlinks } from '$lib/posts';

const stuff = { ids, posts, links, backlinks };

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  const slug = params.slug || 'index';
  if (!(slug in ids)) {
    // TODO: render fallback content here, use a placeholder page for known
    // links, and a regular page not found otherwise
    console.warn(`Trying to render missing page: ${slug}`);
    return;
  }
  const post = posts[ids[slug]];
  const metadata = {
    ...post.metadata,
    // get the backlinks for this particular page, deriving the href from the
    // slug, and using the corresponding page title as the backlink content
    backlinks:
      backlinks[slug]?.map(link => ({
        href: `/${link}`,
        content: posts[ids[link]].metadata.title,
      })) ?? [],
  };
  return { body: { metadata, stuff } };
}
