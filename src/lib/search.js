// TODO: imports with type raw does not seem to be working, still imported using mdsvex
// const imports = import.meta.glob('/content/*.md', { assert: { type: 'raw' } });

// workaround that only works in dev:
// const module = await import(`${path}?raw`);

const imports = import.meta.globEager('/content/*.md');

export const searchDocuments = Object.entries(imports).map(([path, module], index) => {
  const slug = path.slice('/content/'.length, -'.md'.length);
  const href = `/${slug}`;
  const { title } = module.metadata;
  // TODO: search over html text elements only?
  const content = module.default.render().html;
  const document = { id: index, title, content, href, slug };
  return document;
});
