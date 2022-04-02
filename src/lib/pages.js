const prefix = '/content/';
const suffix = '.md';
// vite does not support variables in glob imports, but the glob should match
// const pattern = `${prefix}*${suffix}`
const imports = import.meta.globEager('/content/*.md');
const importsRaw = import.meta.globEager('/content/*.md', { as: 'raw' });

/** derive slug by slicing the prefix and suffix from the path
 * @param {string} path */
export const pathToSlug = path => path.slice(prefix.length, -suffix.length);
// const pathToSlug = (path: string) => path.match(/([\w-]+)\.(md|svx)/i)?.[1] ?? null;

/** derive slug removing the leading '/' from href
 * @param {string} href */
export const hrefToSlug = href => href.slice(1);

//
/** derive href adding the leading '/' to slug
 * @param {string} slug */
export const slugToHref = slug => `/${slug}`;

// YAML frontmatter marker
const fmMarker = '---\n';
// Script section marker
const scriptMarker = '</script>';

// maps of links and backlinks indexed by slug
/** @type {{ [key: string]: string[]}} */
export const links = {};
/** @type {{ [key: string]: string[]}} */
export const backlinks = {};

// list of pages in file-alphabetical order
export const pages = Object.entries(imports).map(([path, module], index) => {
  // TODO: review, html and css are not currently being used
  // const { default: component, metadata } = module;
  // const { html, css } = component.render();
  const { metadata } = module;
  const slug = metadata.slug ?? pathToSlug(path);
  const href = slugToHref(slug);
  // collect link slugs into map
  links[slug] = metadata.links.map(({ href }) => hrefToSlug(href));
  // collect link slugs into other pages' backlinks
  metadata.links.forEach(({ href }) => {
    const linkSlug = hrefToSlug(href);
    backlinks[linkSlug] = backlinks[linkSlug]?.concat(slug) ?? [slug];
  });
  const { title } = metadata;
  const md = importsRaw[path];
  const fmEnd = md.lastIndexOf(fmMarker) + fmMarker.length;
  const scriptEnd = md.lastIndexOf(scriptMarker) + scriptMarker.length;
  // TODO: index html text elements only?
  const content = md.slice(Math.max(fmEnd, scriptEnd)).trim();
  return {
    id: index,
    content,
    href,
    metadata,
    slug,
    title,
    // html,
    // ...(css.code ? { css: css.code } : undefined),
  };
});

// map of page ids indexed by slug
export const ids = Object.fromEntries(pages.map(page => [page.slug, page.id]));

// get the backlinks for a particular page, deriving the href from the slug, and
// using the corresponding page title as the backlink content
export const getPageBacklinks = (/** @type {string} */ slug) =>
  backlinks[slug]?.map(backlinkSlug => ({
    href: slugToHref(backlinkSlug),
    content: pages[ids[backlinkSlug]].metadata.title,
  })) ?? [];
