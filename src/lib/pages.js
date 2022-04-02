export const defaults = {
  title: 'pluvial.xyz',
  author: 'pluvial',
  description: 'pluvial.xyz',
};

const prefix = '/content/';
const suffix = '.md';
// vite does not support variables in glob imports, but the glob should match
// const pattern = `${prefix}*${suffix}`
const imports = import.meta.globEager('/content/*.md');
const importsRaw = import.meta.globEager('/content/*.md', { as: 'raw' });

/** derive the file path from the corresponding slug, and the base folder prefix
 * and extension suffix, redirecting '' -> index
 * @param {string} slug */
export const slugToPath = slug => `${prefix}${slug || 'index'}${suffix}`;

/** derive slug by slicing the prefix and suffix from the path
 * @param {string} path */
export const pathToSlug = path => path.slice(prefix.length, -suffix.length);
// const pathToSlug = (path: string) => path.match(/([\w-]+)\.(md|svx)/i)?.[1] ?? null;

/** normalize slug by converting 'index' to the empty slug
 * @param {string} slug */
export const normalizeSlug = slug => (slug === 'index' ? '' : slug);

/** derive slug removing the leading '/' from href
 * @param {string} href */
export const hrefToSlug = href => href.slice(1);

/** derive href adding the leading '/' to slug
 * @param {string} slug */
export const slugToHref = slug => `/${slug}`;

// YAML frontmatter marker
const fmMarker = '---\n';
// Script section marker
const scriptMarker = '</script>';

// maps of links and backlinks indexed by slug
/** @type {LinkMap} */
export const links = {};
/** @type {LinkMap}} */
export const backlinks = {};

// list of pages in file-alphabetical order
/** @type {Page[]} */
export const pages = Object.entries(imports).map(([path, module], index) => {
  // TODO: review, html and css are not currently being used
  // const { default: component, metadata } = module;
  // const { html, css } = component.render();
  const metadata = { ...defaults, ...module.metadata };
  const slug = metadata.slug ?? normalizeSlug(pathToSlug(path));
  const href = slugToHref(slug);
  // collect link slugs into map
  links[slug] = metadata.links.map(({ href }) => hrefToSlug(href));
  // collect link slugs into other pages' backlinks
  metadata.links.forEach(({ href }) => {
    const linkSlug = hrefToSlug(href);
    backlinks[linkSlug] = backlinks[linkSlug]?.concat(slug) ?? [slug];
  });
  const md = importsRaw[path];
  const fmEnd = md.lastIndexOf(fmMarker) + fmMarker.length;
  const scriptEnd = md.lastIndexOf(scriptMarker) + scriptMarker.length;
  // TODO: index html text elements only?
  const content = md.slice(Math.max(fmEnd, scriptEnd)).trim();
  return {
    id: index,
    content,
    href,
    path,
    slug,
    ...metadata,
    // html,
    // ...(css.code ? { css: css.code } : undefined),
  };
});

// map of page ids indexed by slug
/** @type {IdMap} */
export const ids = Object.fromEntries(pages.map(page => [page.slug, page.id]));

// do a second pass over the pages to populate the backlinks
pages.forEach(page => {
  // get the backlinks for a particular page, deriving the href from the slug,
  // and using the corresponding page title as the backlink content
  page.backlinks =
    backlinks[page.slug]?.map(backlinkSlug => ({
      href: slugToHref(backlinkSlug),
      content: pages[ids[backlinkSlug]].title,
    })) ?? [];
});
