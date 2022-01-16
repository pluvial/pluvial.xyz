const prefix = '/content/';
const suffix = '.md';
// vite does not support variables in glob imports, but the glob should match
// const pattern = `${prefix}*${suffix}`
const imports = import.meta.globEager('/content/*.md');

// derive slug by slicing the prefix and suffix from the path
const pathToSlug = path => path.slice(prefix.length, -suffix.length);
// const pathToSlug = (path: string) => path.match(/([\w-]+)\.(md|svx)/i)?.[1] ?? null;

// derive slug removing the leading '/' from href
const hrefToSlug = href => href.slice(1);

// map of links and backlinks indexed by slug
export const links = {};
export const backlinks = {};

// list of posts in file-alphabetical order
export const posts = Object.entries(imports).map(([path, module]) => {
  // TODO: review, html and css are not currently being used
  // const { default: component, metadata } = module;
  // const { html, css } = component.render();
  const { metadata } = module;
  const slug = metadata.slug ?? pathToSlug(path);
  // collect link slugs into map
  links[slug] = metadata.links.map(({ href }) => hrefToSlug(href));
  // collect link slugs into other pages' backlinks
  metadata.links.forEach(({ href }) => {
    const linkSlug = hrefToSlug(href);
    backlinks[linkSlug] = backlinks[linkSlug]?.concat(slug) ?? [slug];
  });
  return {
    metadata,
    slug,
    // html,
    // ...(css.code ? { css: css.code } : undefined),
  };
});

// map of posts indexed by slug
export const postsMap = Object.fromEntries(posts.map(post => [post.slug, post]));
