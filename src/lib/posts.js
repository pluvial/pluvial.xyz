const prefix = '/content/';
const suffix = '.md';
// vite does not support variables in glob imports, but the glob should match
// const pattern = `${prefix}*${suffix}`
const imports = import.meta.globEager('/content/*.md');
const importsMeta = import.meta.globEager('/metadata/*.json');

// derive slug by slicing the prefix and suffix from the path
const pathToSlug = path => path.slice(prefix.length, -suffix.length);
// const pathToSlug = (path: string) => path.match(/([\w-]+)\.(md|svx)/i)?.[1] ?? null;

// list of posts in file-alphabetical order
export const posts = Object.entries(imports).map(([path, module]) => {
  const { default: component, metadata } = module;
  const { html, css } = component.render();
  const slug = metadata.slug ?? pathToSlug(path);
  const metadataPath = `/metadata/${slug}.json`;
  const importMetadata = importsMeta[metadataPath].default;
  return {
    component,
    html,
    css,
    metadata: { ...metadata, ...importMetadata },
    slug,
  };
});

// map of posts indexed by slug
export const postsMap = Object.fromEntries(posts.map(post => [post.slug, post]));
