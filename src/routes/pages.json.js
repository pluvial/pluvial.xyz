import { pages, ids, links, backlinks } from '$lib/pages';

/** @type {import('./pages.json').RequestHandler} */
export async function get() {
  return { body: { pages, ids, links, backlinks } };
}
