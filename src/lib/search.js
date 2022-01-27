// TODO: imports with type raw does not seem to be working, still imported using mdsvex
// const imports = import.meta.glob('/content/*.md', { assert: { type: 'raw' } });

// workaround that only works in dev:
// const module = await import(`${path}?raw`);

const imports = import.meta.globEager('/content/*.md');

export const searchIndex = Object.entries(imports).map(([path, module]) => {
  const slug = path.slice('/content/'.length, -'.md'.length);
  // TODO: search over html text elements only?
  const text = module.default.render().html;
  return [slug, text];
});
