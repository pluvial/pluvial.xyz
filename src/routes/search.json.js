import { searchIndexPromise } from '$lib/search';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  const searchIndex = await searchIndexPromise;
  return {
    status: 200,
    body: { searchIndex },
  };
}
