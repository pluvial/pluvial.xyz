import { posts, postsMap, links, backlinks } from '$lib/posts';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  return {
    status: 200,
    body: { posts: { list: posts, map: postsMap }, links, backlinks },
  };
}
