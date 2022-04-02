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
    ids: { [slug: string]: number };
    pages: Page[];
    links: { [slug: string]: string[] };
    backlinks: { [slug: string]: string[] };
    metadata: PageMetadata;
  }
}

interface Page {
  id: number;
  content: string;
  href: string;
  slug: string;
  metadata: PageMetadata;
}

interface PageMetadata {
  title: string;
  author: string;
  description: string;
  links: Link[];
  externalLinks: Link[];
  backlinks: Link[];
}

interface Link {
  href: string;
  content: string;
}
