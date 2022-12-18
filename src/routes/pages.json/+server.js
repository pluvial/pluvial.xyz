import { json } from '@sveltejs/kit';
import { pages, ids, links, backlinks } from '$lib/pages';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  return json({ pages, ids, links, backlinks });
}
