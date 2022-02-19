import { searchDocuments } from '$lib/search';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  return {
    status: 200,
    body: { searchDocuments },
  };
}
