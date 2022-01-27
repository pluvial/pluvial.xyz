// TODO: type raw does not seem to be working
const imports = import.meta.glob('/content/*.md', { assert: { type: 'raw' } });

export const searchIndexPromise = Promise.all(
  Object.entries(imports).map(async ([path, _module]) => {
    const slug = path.slice('/content/'.length, -'.md'.length);
    const module = await import(`${path}?raw`);
    return [slug, module.default];
  }),
);
