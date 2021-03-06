/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  interface Locals {
    userid: string;
  }

  // interface Platform {}

  // interface Session {}

  interface Stuff {
    ids: IdMap;
    pages: Page[];
    links: LinkMap;
    backlinks: LinkMap;

    page: Page;
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
