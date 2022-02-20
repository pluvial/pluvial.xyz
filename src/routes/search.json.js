import { searchDocuments } from '$lib/posts';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  return {
    status: 200,
    body: { searchDocuments },
  };
}
