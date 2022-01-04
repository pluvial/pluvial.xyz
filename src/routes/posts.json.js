import { posts, postsMap } from '$lib/posts';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  return {
    status: 200,
    body: { list: posts, map: postsMap },
  };
}
