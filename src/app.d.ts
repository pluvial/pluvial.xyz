// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}

  // interface Stuff {
  interface PageData {
    ids: IdMap;
    pages: Page[];
    links: LinkMap;
    backlinks: LinkMap;

    page?: Page;

    path: string;
  }
}

interface Page {
  id: number;
  href: string;
  path: string;
  slug: string;

  content: string;
  title: string;
  author: string;
  description: string;

  links: Link[];
  externalLinks: Link[];
  backlinks: Link[];
}

interface IdMap {
  [slug: string]: number;
}

interface Link {
  href: string;
  content: string;
}

interface LinkMap {
  [slug: string]: string[];
}
