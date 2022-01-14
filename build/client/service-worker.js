const timestamp = 1645292853779;
const build = [
  "/_app/start-5ed70704.js",
  "/_app/pages/__layout.svelte-ef9842c8.js",
  "/_app/assets/pages/__layout.svelte-b6bb72ce.css",
  "/_app/error.svelte-b60f4724.js",
  "/_app/pages/index.svelte-5d41017e.js",
  "/_app/assets/pages/index.svelte-98a4e898.css",
  "/_app/pages/dropin-minimal-css.svelte-824b14b9.js",
  "/_app/pages/_slug_.svelte-eb48bbd9.js",
  "/_app/assets/pages/_slug_.svelte-1fdc913b.css",
  "/_app/chunks/vendor-0683de8a.js",
  "/_app/chunks/singletons-a6a7384f.js",
  "/_app/chunks/preload-helper-ec9aa979.js",
  "/_app/chunks/flexsearch.bundle-19c2f27a.js",
  "/_app/chunks/about-11c73747.js",
  "/_app/chunks/debug-76f33c78.js",
  "/_app/assets/debug-4bd222b0.css",
  "/_app/chunks/readme-5414dcdb.js",
  "/_app/chunks/wasm-b95c7c07.js",
  "/_app/chunks/welcome-5642c752.js",
  "/_app/assets/welcome-9e8b37c6.css",
  "/_app/chunks/main-9576c89d.js"
];
const name = `cache-${timestamp}`;
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(name).then((cache) => cache.addAll(build)));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (!key.includes(String(timestamp)))
        caches.delete(key);
    }
  }));
});
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || request.headers.has("range"))
    return;
  const url = new URL(request.url);
  const cached = caches.match(request);
  if (url.origin === location.origin && build.includes(url.pathname)) {
    event.respondWith(cached);
  } else if (url.protocol === "https:" || location.hostname === "localhost") {
    const promise = fetch(request);
    promise.then((response) => {
      if (response.ok && response.type === "basic") {
        const clone = response.clone();
        caches.open(name).then((cache) => {
          cache.put(request, clone);
        });
      }
    });
    event.respondWith(promise.catch(() => cached || promise));
  }
});
