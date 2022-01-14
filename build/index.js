var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// .svelte-kit/deno/server/chunks/index-3a994b0d.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css9) => css9.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true && boolean_attributes.has(name) ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var is_client, now, raf, tasks, current_component, boolean_attributes, escaped, missing_component, on_destroy;
var init_index_3a994b0d = __esm({
  ".svelte-kit/deno/server/chunks/index-3a994b0d.js"() {
    is_client = typeof window !== "undefined";
    now = is_client ? () => window.performance.now() : () => Date.now();
    raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
    tasks = /* @__PURE__ */ new Set();
    Promise.resolve();
    boolean_attributes = /* @__PURE__ */ new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/deno/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout,
  load: () => load
});
async function load({ fetch: fetch2, url }) {
  if (!posts || !links || !backlinks) {
    const response = await fetch2("/posts.json");
    ({ posts, links, backlinks } = await response.json());
  }
  if (!searchDocuments) {
    const response = await fetch2("/search.json");
    ({ searchDocuments } = await response.json());
  }
  return { props: { path: url.pathname } };
}
var getStores, page, logo, css$2, Header, css$1, Search, frameworksStr, Switcher, css, posts, links, backlinks, searchDocuments, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/deno/server/entries/pages/__layout.svelte.js"() {
    init_index_3a994b0d();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        get preloading() {
          console.error("stores.preloading is deprecated; use stores.navigating instead");
          return {
            subscribe: stores.navigating.subscribe
          };
        },
        session: stores.session,
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    logo = "/_app/assets/svelte-logo-87df40b8.svg";
    css$2 = {
      code: "header.svelte-1uctjs4.svelte-1uctjs4{display:flex;justify-content:space-between}.corner.svelte-1uctjs4.svelte-1uctjs4{width:3em;height:3em}.corner.svelte-1uctjs4 a.svelte-1uctjs4{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.corner.svelte-1uctjs4 img.svelte-1uctjs4{width:2em;height:2em;object-fit:contain}nav.svelte-1uctjs4.svelte-1uctjs4{display:flex;justify-content:center}ul.svelte-1uctjs4.svelte-1uctjs4{position:relative;padding:0;margin:0;display:flex;justify-content:center;align-items:center;list-style:none}li.svelte-1uctjs4.svelte-1uctjs4{position:relative;height:100%}li.active.svelte-1uctjs4.svelte-1uctjs4::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}nav.svelte-1uctjs4 a.svelte-1uctjs4{display:flex;height:100%;align-items:center;padding:0 1em;font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;transition:color 0.2s linear}a.svelte-1uctjs4.svelte-1uctjs4:hover{color:var(--accent-color)}",
      map: null
    };
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      const navLinks = [
        ["", "Home"],
        ["readme", "Readme"],
        ["welcome", "Welcome"],
        ["about", "About"],
        ["dropin-minimal-css", "CSS Switcher"],
        ["wasm", "Wasm"],
        ["debug", "Debug"]
      ];
      $$result.css.add(css$2);
      $$unsubscribe_page();
      return `<header class="${"svelte-1uctjs4"}"><div class="${"corner svelte-1uctjs4"}"><a href="${"https://kit.svelte.dev"}" class="${"svelte-1uctjs4"}"><img${add_attribute("src", logo, 0)} alt="${"SvelteKit"}" class="${"svelte-1uctjs4"}"></a></div>

  <nav class="${"svelte-1uctjs4"}"><ul class="${"svelte-1uctjs4"}">${each(navLinks, ([slug, content]) => {
        return `<li class="${["svelte-1uctjs4", $page.url.pathname === `/${slug}` ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/" + escape(slug)}" class="${"svelte-1uctjs4"}">${escape(content)}</a>
        </li>`;
      })}</ul></nav>
</header>`;
    });
    css$1 = {
      code: ".search.svelte-jwc7cj{position:relative}input.svelte-jwc7cj{width:100%}ul.svelte-jwc7cj{position:absolute;left:0;right:0;z-index:1;background-color:#000d;padding:0.8em}li.svelte-jwc7cj{list-style:none}a.svelte-jwc7cj{text-decoration:none}.selected.svelte-jwc7cj{color:var(--accent-color)}",
      map: null
    };
    Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let results;
      let { documents } = $$props;
      let index;
      let value;
      let selectedResultIndex = 0;
      if ($$props.documents === void 0 && $$bindings.documents && documents !== void 0)
        $$bindings.documents(documents);
      $$result.css.add(css$1);
      results = index?.search(value, { enrich: true }).flatMap(({ result }) => result.map(({ doc }) => doc)) ?? [];
      return `<div class="${"search svelte-jwc7cj"}"><input type="${"text"}" class="${"svelte-jwc7cj"}"${add_attribute("value", value, 0)}>

  ${results.length > 0 ? `<ul class="${"svelte-jwc7cj"}">${each(results, ({ title, content, description, href }, index2) => {
        return `<li class="${"svelte-jwc7cj"}"><a${add_attribute("href", href, 0)} class="${["svelte-jwc7cj", selectedResultIndex === index2 ? "selected" : ""].join(" ").trim()}">${escape(title)}
            <span>${escape(description ?? content.slice(0, 30))}</span></a>
        </li>`;
      })}</ul>` : ``}
</div>`;
    });
    frameworksStr = "bahunya,bamboo,basic,concrete,holiday,mvp,neat,new,ok,pico,simple,spcss,vanilla,yamb,attri-midnight-green,attri-dark-forest-green,awsm-black,awsm-bigstone,awsm-gondola,boot-cyborg,boot-darkly,boot-slate,boot-superhero,md-retro,w3c-chocolate,w3c-midnight,w3c-ultramarine";
    Switcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const baseUrl = `/css/min`;
      const frameworks = frameworksStr.split(",");
      let { selected = frameworks[0] } = $$props;
      let { visible = false } = $$props;
      if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
        $$bindings.selected(selected);
      if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
        $$bindings.visible(visible);
      return `


${$$result.head += `${``}<link rel="${"stylesheet"}" type="${"text/css"}" href="${escape(baseUrl) + "/" + escape(selected) + ".min.css"}" data-svelte="svelte-1wvniz8">`, ""}

${visible ? `<select${add_attribute("value", selected, 0)}>${each(frameworks, (framework) => {
        return `<option${add_attribute("value", framework, 0)}>${escape(framework)}</option>`;
      })}</select>` : ``}`;
    });
    css = {
      code: "main.svelte-11ej000{flex:1;position:relative;width:100%;max-width:1024px;min-height:450px;margin:0 auto}.container.svelte-11ej000{position:absolute;box-sizing:border-box;width:100%;padding:0}",
      map: null
    };
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { path: path2 } = $$props;
      if ($$props.path === void 0 && $$bindings.path && path2 !== void 0)
        $$bindings.path(path2);
      $$result.css.add(css);
      return `${validate_component(Switcher, "Switcher").$$render($$result, {
        selected: "new",
        visible: path2 === "/dropin-minimal-css"
      }, {}, {})}

${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

${validate_component(Search, "Search").$$render($$result, { documents: searchDocuments }, {}, {})}

<main class="${"svelte-11ej000"}"><div class="${"container svelte-11ej000"}">${slots.default ? slots.default({}) : ``}</div>
</main>`;
    });
  }
});

// .svelte-kit/deno/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css2,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css2;
var init__ = __esm({
  ".svelte-kit/deno/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-ef9842c8.js";
    js = ["pages/__layout.svelte-ef9842c8.js", "chunks/vendor-0683de8a.js", "chunks/preload-helper-ec9aa979.js", "chunks/singletons-a6a7384f.js"];
    css2 = ["assets/pages/__layout.svelte-b6bb72ce.css"];
  }
});

// .svelte-kit/deno/server/entries/pages/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load2
});
function load2({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/deno/server/entries/pages/error.svelte.js"() {
    init_index_3a994b0d();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/deno/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css3,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css3;
var init__2 = __esm({
  ".svelte-kit/deno/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-b60f4724.js";
    js2 = ["error.svelte-b60f4724.js", "chunks/vendor-0683de8a.js"];
    css3 = [];
  }
});

// .svelte-kit/deno/server/entries/pages/dropin-minimal-css.svelte.js
var dropin_minimal_css_svelte_exports = {};
__export(dropin_minimal_css_svelte_exports, {
  default: () => Dropin_minimal_css
});
var Dropin_minimal_css;
var init_dropin_minimal_css_svelte = __esm({
  ".svelte-kit/deno/server/entries/pages/dropin-minimal-css.svelte.js"() {
    init_index_3a994b0d();
    Dropin_minimal_css = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `
<div id="${"top"}" class="${"page"}" role="${"document"}"><header><h1>Drop-in Minimal CSS</h1>
    <p>This page provides an overview of barebones drop-in minimal CSS boilerplate frameworks. To
      switch to a different stylesheet, select one of the frameworks from the dropdown menu below.
      For more information, and links to all the frameworks seen here, visit the project page on
      <a href="${"https://github.com/dohliam/dropin-minimal-css"}">GitHub</a>.
    </p></header>
  <nav><ul><li><a href="${"#text"}">Text</a>: <a href="${"#text__headings"}">Headings</a> \xB7
        <a href="${"#text__paragraphs"}">Paragraphs</a> \xB7 <a href="${"#text__blockquotes"}">Blockquotes</a> \xB7
        <a href="${"#text__lists"}">Lists</a> \xB7 <a href="${"#text__hr"}">Horizontal rules</a> \xB7
        <a href="${"#text__tables"}">Tabular data</a> \xB7 <a href="${"#text__code"}">Code</a> \xB7
        <a href="${"#text__inline"}">Inline elements</a></li>
      <li><a href="${"#embedded"}">Embedded content</a>: <a href="${"#embedded__images"}">Images</a> \xB7
        <a href="${"#embedded__audio"}">Audio</a> \xB7 <a href="${"#embedded__video"}">Video</a> \xB7
        <a href="${"#embedded__canvas"}">Canvas</a> \xB7 <a href="${"#embedded__meter"}">Meter</a> \xB7
        <a href="${"#embedded__progress"}">Progress</a> \xB7 <a href="${"#embedded__svg"}">Inline SVG</a> \xB7
        <a href="${"#embedded__iframe"}">IFrames</a></li>
      <li><a href="${"#forms"}">Form elements</a>: <a href="${"#forms__input"}">Input fields</a> \xB7
        <a href="${"#forms__select"}">Select menus</a> \xB7 <a href="${"#forms__checkbox"}">Checkboxes</a> \xB7
        <a href="${"#forms__radio"}">Radio buttons</a> \xB7 <a href="${"#forms__textareas"}">Textareas</a> \xB7
        <a href="${"#forms__html5"}">HTML5 inputs</a> \xB7 <a href="${"#forms__action"}">Action buttons</a></li></ul></nav>
  <main><section id="${"text"}"><h1>Text</h1>
      <article id="${"text__headings"}"><h1>Headings</h1>
        <div><h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"text__paragraphs"}"><h1>Paragraphs</h1>
        <div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc viverra viverra nisl, vel
            maximus turpis ornare a. Ut scelerisque lectus sed odio dictum scelerisque vitae quis
            nisi. Nulla facilisi. Phasellus vehicula convallis nisl, id suscipit dui semper at. In
            eu iaculis lorem. In vehicula sed mauris et suscipit. Vivamus pellentesque non massa sit
            amet ornare. Integer placerat est vitae nisl molestie, eget rhoncus erat vulputate.
            Proin ornare massa eget bibendum faucibus.
          </p></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"text__blockquotes"}"><h1>Blockquotes</h1>
        <div><blockquote><p>Etiam porttitor egestas elit, at venenatis neque accumsan eu. Nulla viverra odio nisi,
              quis commodo tellus tristique non. Proin ac ante at orci euismod eleifend. Quisque
              nisi sapien, dapibus in venenatis sit amet, posuere non purus. In sit amet metus erat.
              Pellentesque nec neque eleifend, luctus ipsum at, ullamcorper nunc. Pellentesque
              sagittis, dolor eu bibendum lacinia, orci ex bibendum risus, at tincidunt augue lacus
              eleifend diam. Nulla facilisis velit ut est auctor sollicitudin. Morbi eget lectus a
              lacus maximus molestie in ut lorem.
            </p>
            <p>Vestibulum ut erat sapien. Duis eros est, tempus a rutrum eu, rhoncus at ante.
              Vestibulum congue vel nunc et dapibus. Ut tristique facilisis orci ac pretium. Nunc et
              sodales turpis. Nulla pretium augue vitae faucibus tempor. Aliquam convallis mollis
              feugiat. Ut non pellentesque sem. Suspendisse interdum, neque at hendrerit varius,
              enim neque imperdiet enim, pellentesque efficitur leo orci non erat.
            </p>
            <cite>Said no one, ever.</cite></blockquote></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"text__lists"}"><h1>Lists</h1>
        <div><h3>Definition list</h3>
          <dl><dt>Definition List Title</dt><dd>This is a definition list division.</dd></dl>
          <h3>Ordered List</h3>
          <ol><li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3
              <ol><li>Nested Ordered List Item 3.1</li>
                <li>Nested Ordered List Item 3.2</li>
                <li>Nested Ordered List Item 3.3</li></ol></li>
            <li>List Item 4
              <ul><li>Nested Unordered List Item 4.1</li>
                <li>Nested Unordered List Item 4.2</li>
                <li>Nested Unordered List Item 4.3</li></ul></li></ol>
          <h3>Unordered List</h3>
          <ul><li>List Item 1</li>
            <li>List Item 2</li>
            <li>List Item 3
              <ol><li>Nested Ordered List Item 3.1</li>
                <li>Nested Ordered List Item 3.2</li>
                <li>Nested Ordered List Item 3.3</li></ol></li>
            <li>List Item 4
              <ul><li>Nested Unordered List Item 4.1</li>
                <li>Nested Unordered List Item 4.2</li>
                <li>Nested Unordered List Item 4.3</li></ul></li></ul></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"text__hr"}"><h1>Horizontal rules</h1>
        <div><hr></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"text__tables"}"><h1>Tabular data</h1>
        <table><caption>Table Caption </caption>
          <thead><tr><th>Table Heading 1</th>
              <th>Table Heading 2</th>
              <th>Table Heading 3</th>
              <th>Table Heading 4</th>
              <th>Table Heading 5</th></tr></thead>
          <tfoot><tr><th>Table Footer 1</th>
              <th>Table Footer 2</th>
              <th>Table Footer 3</th>
              <th>Table Footer 4</th>
              <th>Table Footer 5</th></tr></tfoot>
          <tbody><tr><td>Table Cell 1</td>
              <td>Table Cell 2</td>
              <td>Table Cell 3</td>
              <td>Table Cell 4</td>
              <td>Table Cell 5</td></tr>
            <tr><td>Table Cell 1</td>
              <td>Table Cell 2</td>
              <td>Table Cell 3</td>
              <td>Table Cell 4</td>
              <td>Table Cell 5</td></tr>
            <tr><td>Table Cell 1</td>
              <td>Table Cell 2</td>
              <td>Table Cell 3</td>
              <td>Table Cell 4</td>
              <td>Table Cell 5</td></tr>
            <tr><td>Table Cell 1</td>
              <td>Table Cell 2</td>
              <td>Table Cell 3</td>
              <td>Table Cell 4</td>
              <td>Table Cell 5</td></tr></tbody></table>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"text__code"}"><h1>Code</h1>
        <div><p><strong>Keyboard input:</strong> <kbd>Cmd</kbd></p>
          <p><strong>Inline code:</strong> <code>&lt;div&gt;code&lt;/div&gt;</code></p>
          <p><strong>Sample output:</strong>
            <samp>This is sample output from a computer program.</samp></p>
          <h2>Pre-formatted text</h2>
          <pre>
  P R E F O R M A T T E D T E X T
&quot; # $ % &amp; &#39; ( ) * + , - . /
1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
A B C D E F G H I J K L M N O
Q R S T U V W X Y Z [ \\ ] ^ _
a b c d e f g h i j k l m n o
q r s t u v w x y z ${escape("{")} | } ~ </pre></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"text__inline"}"><h1>Inline elements</h1>
        <div><a href="${"#!"}">This is a text link</a>.<br>
          <strong>Strong is used to indicate strong importance.</strong><br>
          <em>This text has added emphasis.</em><br>
          The <b>b element</b> is stylistically different text from normal text, without any special
          importance.<br>
          The <i>i element</i> is text that is offset from the normal text.<br>
          The <u>u element</u> is text with an unarticulated, though explicitly rendered,
          non-textual annotation.<br>
          <del>This text is deleted</del> and <ins>This text is inserted</ins>.<br>
          <s>This text has a strikethrough</s>.<br>
          Superscript<sup>\xAE</sup>.<br>
          Subscript for things like H<sub>2</sub>O.<br>
          <small>This small text is small for for fine print, etc.</small><br>
          Abbreviation: <abbr title="${"HyperText Markup Language"}">HTML</abbr><br>
          <q cite="${"https://developer.mozilla.org/en-US/docs/HTML/Element/q"}">This text is a short inline quotation.</q><br>
          <cite>This is a citation.</cite><br>
          The <dfn>dfn element</dfn> indicates a definition.<br>
          The <mark>mark element</mark> indicates a highlight.<br>
          The <var>variable element</var>, such as <var>x</var> = <var>y</var>.<br>
          The time element: <time datetime="${"2013-04-06T12:32+00:00"}">2 weeks ago</time><br></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article></section>

    <section id="${"embedded"}"><h1>Embedded content</h1>
      <article id="${"embedded__images"}"><h2>Images</h2>
        <div><h3>No <code>&lt;figure&gt;</code> element</h3>
          <p><a href="${"https://commons.wikimedia.org/wiki/File:Colouring_pencils.jpg"}"><img src="${"https://raw.githubusercontent.com/dohliam/html5-sample-media/master/Colouring_pencils.jpg"}" alt="${"Colouring pencils by MichaelMaggs"}"></a></p>
          <h3>Wrapped in a <code>&lt;figure&gt;</code> element, no <code>&lt;figcaption&gt;</code></h3>
          <figure><a href="${"https://commons.wikimedia.org/wiki/File:Coloured,_textured_craft_card_edit.jpg"}"><img src="${"https://raw.githubusercontent.com/dohliam/html5-sample-media/master/Coloured%2C_textured_craft_card_edit.jpg"}" alt="${"Coloured, textured craft card by MichaelMaggs"}"></a></figure>
          <h3>Wrapped in a <code>&lt;figure&gt;</code> element, with a <code>&lt;figcaption&gt;</code></h3>
          <figure><a href="${"https://commons.wikimedia.org/wiki/File:Opening_chess_position_from_black_side.jpg"}"><img src="${"https://raw.githubusercontent.com/dohliam/html5-sample-media/master/Opening_chess_position_from_black_side.jpg"}" alt="${"Opening chess position from black side by MichaelMaggs"}"></a>
            <figcaption>Here is a caption for this image.</figcaption></figure></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"embedded__audio"}"><h2>Audio</h2>
        <div><audio controls><source src="${"https://raw.githubusercontent.com/dohliam/html5-sample-media/master/Broke For Free - Night Owl.mp3"}"></audio></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"embedded__video"}"><h2>Video</h2>
        <div><video controls><source src="${"https://github.com/benhosmer/HTML5-Test-Videos/blob/master/big_buck_bunny.mp4?raw=true"}" type="${"video/mp4"}"><source src="${"https://github.com/benhosmer/HTML5-Test-Videos/blob/master/big_buck_bunny.ogv?raw=true"}" type="${"video/ogg"}"><track kind="${"captions"}"></video></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"embedded__canvas"}"><h2>Canvas</h2>
        <div><canvas>canvas</canvas></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"embedded__meter"}"><h2>Meter</h2>
        <div><meter value="${"2"}" min="${"0"}" max="${"10"}">2 out of 10</meter></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"embedded__progress"}"><h2>Progress</h2>
        <div><progress>progress</progress></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"embedded__svg"}"><h2>Inline SVG</h2>
        <div><svg width="${"100px"}" height="${"100px"}"><circle cx="${"100"}" cy="${"100"}" r="${"100"}" fill="${"#1fa3ec"}"></circle></svg></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article>
      <article id="${"embedded__iframe"}"><h2>IFrame</h2>
        <div><iframe src="${"/"}" height="${"300"}" title="${"embedded iframe"}"></iframe></div>
        <footer><p><a href="${"#top"}">[Top]</a></p></footer></article></section>
    <section id="${"forms"}"><h1>Form elements</h1>
      <form><fieldset id="${"forms__input"}"><legend>Input fields</legend>
          <p><label for="${"input__text"}">Text Input</label>
            <input id="${"input__text"}" type="${"text"}" placeholder="${"Text Input"}"></p>
          <p><label for="${"input__password"}">Password</label>
            <input id="${"input__password"}" type="${"password"}" placeholder="${"Type your Password"}"></p>
          <p><label for="${"input__webaddress"}">Web Address</label>
            <input id="${"input__webaddress"}" type="${"url"}" placeholder="${"http://yoursite.com"}"></p>
          <p><label for="${"input__emailaddress"}">Email Address</label>
            <input id="${"input__emailaddress"}" type="${"email"}" placeholder="${"name@email.com"}"></p>
          <p><label for="${"input__phone"}">Phone Number</label>
            <input id="${"input__phone"}" type="${"tel"}" placeholder="${"(999) 999-9999"}"></p>
          <p><label for="${"input__search"}">Search</label>
            <input id="${"input__search"}" type="${"search"}" placeholder="${"Enter Search Term"}"></p>
          <p><label for="${"input__text2"}">Number Input</label>
            <input id="${"input__text2"}" type="${"number"}" placeholder="${"Enter a Number"}"></p>
          <p><label for="${"input__text3"}" class="${"error"}">Error</label>
            <input id="${"input__text3"}" class="${"is-error"}" type="${"text"}" placeholder="${"Text Input"}"></p>
          <p><label for="${"input__text4"}" class="${"valid"}">Valid</label>
            <input id="${"input__text4"}" class="${"is-valid"}" type="${"text"}" placeholder="${"Text Input"}"></p></fieldset>
        <p><a href="${"#top"}">[Top]</a></p>
        <fieldset id="${"forms__select"}"><legend>Select menus</legend>
          <p><label for="${"select"}">Select</label>
            <select id="${"select"}"><optgroup label="${"Option Group"}"><option value="${"Option One"}">Option One</option><option value="${"Option Two"}">Option Two</option><option value="${"Option Three"}">Option Three</option></optgroup></select></p></fieldset>
        <p><a href="${"#top"}">[Top]</a></p>
        <fieldset id="${"forms__checkbox"}"><legend>Checkboxes</legend>
          <ul class="${"list list--bare"}"><li><label for="${"checkbox1"}"><input id="${"checkbox1"}" name="${"checkbox"}" type="${"checkbox"}" checked="${"checked"}"> Choice A</label></li>
            <li><label for="${"checkbox2"}"><input id="${"checkbox2"}" name="${"checkbox"}" type="${"checkbox"}"> Choice B</label></li>
            <li><label for="${"checkbox3"}"><input id="${"checkbox3"}" name="${"checkbox"}" type="${"checkbox"}"> Choice C</label></li></ul></fieldset>
        <p><a href="${"#top"}">[Top]</a></p>
        <fieldset id="${"forms__radio"}"><legend>Radio buttons</legend>
          <ul class="${"list list--bare"}"><li><label for="${"radio1"}"><input id="${"radio1"}" name="${"radio"}" type="${"radio"}" class="${"radio"}" checked="${"checked"}">
                Option 1</label></li>
            <li><label for="${"radio2"}"><input id="${"radio2"}" name="${"radio"}" type="${"radio"}" class="${"radio"}"> Option 2</label></li>
            <li><label for="${"radio3"}"><input id="${"radio3"}" name="${"radio"}" type="${"radio"}" class="${"radio"}"> Option 3</label></li></ul></fieldset>
        <p><a href="${"#top"}">[Top]</a></p>
        <fieldset id="${"forms__textareas"}"><legend>Textareas</legend>
          <p><label for="${"textarea"}">Textarea</label>
            <textarea id="${"textarea"}" rows="${"8"}" cols="${"48"}" placeholder="${"Enter your message here"}"></textarea></p></fieldset>
        <p><a href="${"#top"}">[Top]</a></p>
        <fieldset id="${"forms__html5"}"><legend>HTML5 inputs</legend>
          <p><label for="${"ic"}">Color input</label>
            <input type="${"color"}" id="${"ic"}" value="${"#000000"}"></p>
          <p><label for="${"in"}">Number input</label>
            <input type="${"number"}" id="${"in"}" min="${"0"}" max="${"10"}" value="${"5"}"></p>
          <p><label for="${"ir"}">Range input</label>
            <input type="${"range"}" id="${"ir"}" value="${"10"}"></p>
          <p><label for="${"idd"}">Date input</label>
            <input type="${"date"}" id="${"idd"}" value="${"1970-01-01"}"></p>
          <p><label for="${"idm"}">Month input</label>
            <input type="${"month"}" id="${"idm"}" value="${"1970-01"}"></p>
          <p><label for="${"idw"}">Week input</label>
            <input type="${"week"}" id="${"idw"}" value="${"1970-W01"}"></p>
          <p><label for="${"idt"}">Datetime input</label>
            <input type="${"datetime"}" id="${"idt"}" value="${"1970-01-01T00:00:00Z"}"></p>
          <p><label for="${"idtl"}">Datetime-local input</label>
            <input type="${"datetime-local"}" id="${"idtl"}" value="${"1970-01-01T00:00"}"></p></fieldset>
        <p><a href="${"#top"}">[Top]</a></p>
        <fieldset id="${"forms__action"}"><legend>Action buttons</legend>
          <p><input type="${"submit"}" value="${"<input type=submit>"}">
            <input type="${"button"}" value="${"<input type=button>"}">
            <input type="${"reset"}" value="${"<input type=reset>"}">
            <input type="${"submit"}" value="${"<input disabled>"}" disabled></p>
          <p><button type="${"submit"}">&lt;button type=submit&gt;</button>
            <button type="${"button"}">&lt;button type=button&gt;</button>
            <button type="${"reset"}">&lt;button type=reset&gt;</button>
            <button type="${"button"}" disabled>&lt;button disabled&gt;</button></p></fieldset>
        <p><a href="${"#top"}">[Top]</a></p></form></section></main>
  <footer><p>View this project on <a href="${"https://github.com/pluvial/pluvial.xyz"}">GitHub</a>.</p>
    <p>View the parent project on <a href="${"https://github.com/dohliam/dropin-minimal-css"}">GitHub</a>.
    </p></footer></div>`;
    });
  }
});

// .svelte-kit/deno/server/nodes/3.js
var __exports3 = {};
__export(__exports3, {
  css: () => css4,
  entry: () => entry3,
  js: () => js3,
  module: () => dropin_minimal_css_svelte_exports
});
var entry3, js3, css4;
var init__3 = __esm({
  ".svelte-kit/deno/server/nodes/3.js"() {
    init_dropin_minimal_css_svelte();
    entry3 = "pages/dropin-minimal-css.svelte-824b14b9.js";
    js3 = ["pages/dropin-minimal-css.svelte-824b14b9.js", "chunks/vendor-0683de8a.js"];
    css4 = [];
  }
});

// .svelte-kit/deno/server/chunks/about-8829b8bc.js
var about_8829b8bc_exports = {};
__export(about_8829b8bc_exports, {
  _: () => __glob_0_0
});
var metadata, About, __glob_0_0;
var init_about_8829b8bc = __esm({
  ".svelte-kit/deno/server/chunks/about-8829b8bc.js"() {
    init_index_3a994b0d();
    metadata = {
      "title": "About",
      "links": [],
      "externalLinks": [
        {
          "href": "https://kit.svelte.dev",
          "content": "SvelteKit"
        }
      ]
    };
    About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1>About this app</h1>
<p>This is a <a href="${"https://kit.svelte.dev"}" rel="${"nofollow"}">SvelteKit</a> app. You can make your own by typing the following into your command line and following the prompts:</p>
<pre class="${"language-undefined"}"><!-- HTML_TAG_START -->${`<code class="language-undefined">npm init svelte@next</code>`}<!-- HTML_TAG_END --></pre>
<p>The page you\u2019re looking at is purely static HTML, with no client-side interactivity needed.
Because of that, we don\u2019t need to load any JavaScript. Try viewing the page\u2019s source, or opening the devtools network panel and reloading.</p>`;
    });
    __glob_0_0 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      "default": About,
      metadata
    });
  }
});

// .svelte-kit/deno/server/chunks/debug-b9aa0e48.js
var debug_b9aa0e48_exports = {};
__export(debug_b9aa0e48_exports, {
  _: () => __glob_0_1
});
var css5, metadata2, Debug, __glob_0_1;
var init_debug_b9aa0e48 = __esm({
  ".svelte-kit/deno/server/chunks/debug-b9aa0e48.js"() {
    init_index_3a994b0d();
    css5 = {
      code: ".flex.svelte-kffqiy{display:flex}.block.svelte-kffqiy{flex:1;height:8rem}",
      map: null
    };
    metadata2 = {
      "title": "Debug",
      "links": [
        { "href": "/about", "content": "about" },
        {
          "href": "/readme",
          "content": "README.md"
        }
      ],
      "externalLinks": [
        {
          "href": "https://github.com/pluvial/pluvial.xyz",
          "content": "Repo"
        }
      ]
    };
    Debug = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css5);
      return `<h1>Links</h1>
<p>Wiki link: <a class="${"internal new"}" href="${"/about"}">about</a></p>
<p>Wiki link alias: <a class="${"internal new"}" href="${"/readme"}">README.md</a></p>
<p>External link: <a href="${"https://github.com/pluvial/pluvial.xyz"}" rel="${"nofollow"}">Repo</a></p>
<h1>Code block</h1>
<pre class="${"language-svelte"}"><!-- HTML_TAG_START -->${`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> Example <span class="token keyword">from</span> <span class="token string">'$lib/Example.svelte'</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello Prism<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Example</span> <span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">h1</span> <span class="token punctuation">&#123;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #0DD<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`}<!-- HTML_TAG_END --></pre>
<h1>Color Palette</h1>
<div class="${"flex svelte-kffqiy"}">${each({ length: 8 }, (_, index) => {
        return `<div class="${"block svelte-kffqiy"}" style="${"background-color: var(--g" + escape((2 * index + 1).toString(16)) + ")"}"></div>`;
      })}</div>
<div class="${"flex svelte-kffqiy"}">${each({ length: 8 }, (_, index) => {
        return `<div class="${"block svelte-kffqiy"}" style="${"background-color: var(--c" + escape((2 * index + 1).toString(16)) + ")"}"></div>`;
      })}</div>`;
    });
    __glob_0_1 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      "default": Debug,
      metadata: metadata2
    });
  }
});

// .svelte-kit/deno/server/chunks/readme-53778a7a.js
var readme_53778a7a_exports = {};
__export(readme_53778a7a_exports, {
  _: () => __glob_0_2
});
var README, metadata3, Readme_1, __glob_0_2;
var init_readme_53778a7a = __esm({
  ".svelte-kit/deno/server/chunks/readme-53778a7a.js"() {
    init_index_3a994b0d();
    README = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1>pluvial.xyz</h1>
<h2>Deployments</h2>
<p>Deployed automatically when pushing to the <code>main</code> branch:</p>
<ul><li><p>Main: <a href="${"https://pluvial.xyz"}" rel="${"nofollow"}">pluvial.xyz</a> (Vercel)</p></li>
<li><p>Cloudflare Pages: <a href="${"https://pluvial-xyz.pages.dev"}" rel="${"nofollow"}">https://pluvial-xyz.pages.dev</a></p></li>
<li><p>Netlify: <a href="${"https://pluvial-xyz.netlify.app"}" rel="${"nofollow"}">https://pluvial-xyz.netlify.app</a></p></li>
<li><p>Vercel: <a href="${"https://pluvial-xyz.vercel.app"}" rel="${"nofollow"}">https://pluvial-xyz.vercel.app</a></p></li></ul>
<p>Deployed automatically when pushing to the <code>deno</code> branch:</p>
<ul><li>Deno Deploy: <a href="${"https://pluvial-xyz.deno.dev"}" rel="${"nofollow"}">https://pluvial-xyz.deno.dev</a></li></ul>
<p>Deployed manually from dev machine:</p>
<ul><li>Cloudflare Workers: <a href="${"https://pluvial-xyz.pluvial.workers.dev"}" rel="${"nofollow"}">https://pluvial-xyz.pluvial.workers.dev</a></li></ul>
<pre class="${"language-sh"}"><!-- HTML_TAG_START -->${`<code class="language-sh">env CF_ACCOUNT_ID=&#39;&lt;account-id&gt;&#39; wrangler publish</code>`}<!-- HTML_TAG_END --></pre>
<ul><li>Deno Deploy: <a href="${"https://pluvial-xyz.deno.dev"}" rel="${"nofollow"}">https://pluvial-xyz.deno.dev</a></li></ul>
<pre class="${"language-sh"}"><!-- HTML_TAG_START -->${`<code class="language-sh">env DENO_DEPLOY_TOKEN=&#39;&lt;token&gt;&#39; deployctl deploy --project=pluvial-xyz --exclude=node_modules build/index.js</code>`}<!-- HTML_TAG_END --></pre>
<h2>Developing</h2>
<p>Install dependencies with <code>pnpm install</code> (or <code>pnpm i</code>), and start a development server:</p>
<pre class="${"language-sh"}"><!-- HTML_TAG_START -->${`<code class="language-sh">pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open</code>`}<!-- HTML_TAG_END --></pre>
<h2>Building</h2>
<p>To create a production version of the app, a different <a href="${"https://kit.svelte.dev/docs#adapters"}" rel="${"nofollow"}">adapter</a>
is used for each target environment. To build using the default <code>adapter-static</code>, use:</p>
<pre class="${"language-sh"}"><!-- HTML_TAG_START -->${`<code class="language-sh">pnpm build</code>`}<!-- HTML_TAG_END --></pre>
<blockquote><p>You can preview the built app with <code>pnpm preview</code>. This should <em>not</em> be used to serve the app in production.</p></blockquote>
<h2>License</h2>
<p>The content of this project itself is licensed under the <a href="${"http://creativecommons.org/licenses/by/4.0"}" rel="${"nofollow"}">Creative Commons Attribution 4.0 International License</a>,
and the underlying source code used to format and display that content is
licensed under the <a href="${"https://github.com/pluvial/pluvial.xyz/blob/main/LICENSE"}" rel="${"nofollow"}">MIT license</a>.</p>`;
    });
    metadata3 = {
      "title": "README",
      "links": [],
      "externalLinks": []
    };
    Readme_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(README, "Readme").$$render($$result, {}, {}, {})}`;
    });
    __glob_0_2 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      "default": Readme_1,
      metadata: metadata3
    });
  }
});

// .svelte-kit/deno/server/chunks/wasm-d96aa484.js
var wasm_d96aa484_exports = {};
__export(wasm_d96aa484_exports, {
  _: () => __glob_0_3
});
var metadata4, Wasm, __glob_0_3;
var init_wasm_d96aa484 = __esm({
  ".svelte-kit/deno/server/chunks/wasm-d96aa484.js"() {
    init_index_3a994b0d();
    metadata4 = {
      "title": "WebAssembly",
      "links": [],
      "externalLinks": []
    };
    Wasm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1>WebAssembly Example</h1>
<h2>${``}</h2>`;
    });
    __glob_0_3 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      "default": Wasm,
      metadata: metadata4
    });
  }
});

// .svelte-kit/deno/server/chunks/welcome-9a32be47.js
var welcome_9a32be47_exports = {};
__export(welcome_9a32be47_exports, {
  _: () => __glob_0_4
});
function writable2(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable2(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
function modulo(n, m) {
  return (n % m + m) % m;
}
var subscriber_queue2, css$12, Counter, css6, metadata5, Welcome, __glob_0_4;
var init_welcome_9a32be47 = __esm({
  ".svelte-kit/deno/server/chunks/welcome-9a32be47.js"() {
    init_index_3a994b0d();
    subscriber_queue2 = [];
    css$12 = {
      code: ".counter.svelte-h44oma.svelte-h44oma{display:flex;border-top:1px solid rgba(0, 0, 0, 0.1);border-bottom:1px solid rgba(0, 0, 0, 0.1);margin:1rem 0}.counter.svelte-h44oma button.svelte-h44oma{width:2em;padding:0;display:flex;align-items:center;justify-content:center;border:0;background-color:transparent;color:var(--text-color);font-size:2rem}.counter.svelte-h44oma button.svelte-h44oma:hover{background-color:var(--secondary-color)}svg.svelte-h44oma.svelte-h44oma{width:25%;height:25%}path.svelte-h44oma.svelte-h44oma{vector-effect:non-scaling-stroke;stroke-width:2px;stroke:var(--text-color)}.counter-viewport.svelte-h44oma.svelte-h44oma{width:8em;height:4em;overflow:hidden;text-align:center;position:relative}.counter-viewport.svelte-h44oma strong.svelte-h44oma{position:absolute;display:flex;width:100%;height:100%;font-weight:400;color:var(--accent-color);font-size:4rem;align-items:center;justify-content:center}.counter-digits.svelte-h44oma.svelte-h44oma{position:absolute;width:100%;height:100%}",
      map: null
    };
    Counter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let offset;
      let $displayed_count, $$unsubscribe_displayed_count;
      let count = 0;
      const displayed_count = spring();
      $$unsubscribe_displayed_count = subscribe(displayed_count, (value) => $displayed_count = value);
      $$result.css.add(css$12);
      {
        displayed_count.set(count);
      }
      offset = modulo($displayed_count, 1);
      $$unsubscribe_displayed_count();
      return `<div class="${"counter svelte-h44oma"}"><button aria-label="${"Decrease the counter by one"}" class="${"svelte-h44oma"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 1 1"}" class="${"svelte-h44oma"}"><path d="${"M0,0.5 L1,0.5"}" class="${"svelte-h44oma"}"></path></svg></button>

  <div class="${"counter-viewport svelte-h44oma"}"><div class="${"counter-digits svelte-h44oma"}" style="${"transform: translate(0, " + escape(100 * offset) + "%)"}"><strong style="${"top: -100%"}" aria-hidden="${"true"}" class="${"svelte-h44oma"}">${escape(Math.floor($displayed_count + 1))}</strong>
      <strong class="${"svelte-h44oma"}">${escape(Math.floor($displayed_count))}</strong></div></div>

  <button aria-label="${"Increase the counter by one"}" class="${"svelte-h44oma"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 1 1"}" class="${"svelte-h44oma"}"><path d="${"M0,0.5 L1,0.5 M0.5,0 L0.5,1"}" class="${"svelte-h44oma"}"></path></svg></button>
</div>`;
    });
    css6 = {
      code: "section.svelte-h43abn{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1;margin:var(--column-margin-top) auto 0 auto;white-space:nowrap}",
      map: null
    };
    metadata5 = {
      "title": "Welcome",
      "links": [],
      "externalLinks": []
    };
    Welcome = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css6);
      return `<section class="${"svelte-h43abn"}"><h1>Welcome to your new SvelteKit app</h1>
<h2>try editing <strong>src/routes/index.svelte</strong></h2>
  ${validate_component(Counter, "Counter").$$render($$result, {}, {}, {})}</section>`;
    });
    __glob_0_4 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module",
      "default": Welcome,
      metadata: metadata5
    });
  }
});

// .svelte-kit/deno/server/entries/pages/_slug_.svelte.js
var slug_svelte_exports = {};
__export(slug_svelte_exports, {
  default: () => U5Bslugu5D,
  load: () => load3,
  prerender: () => prerender
});
async function load3({ fetch: fetch2, params }) {
  const { slug } = params;
  const file = `${prefix}${slug}${suffix}`;
  if (file in importsPosts) {
    resolvedPosts[slug] ?? (resolvedPosts[slug] = await importsPosts[file]());
    const module = resolvedPosts[slug];
    if (!posts2 || !backlinks2) {
      const response = await fetch2("/posts.json");
      ({ posts: posts2, backlinks: backlinks2 } = await response.json());
    }
    const metadata6 = {
      ...module.metadata,
      ...posts2.map[slug].metadata,
      backlinks: backlinks2[slug]?.map((link) => ({
        href: `/${link}`,
        content: posts2.map[link].metadata.title
      })) ?? []
    };
    return {
      props: { component: module.default, metadata: metadata6 }
    };
  }
  console.warn(`Trying to render missing page: ${slug}, did not find ${file}`);
}
var css7, prerender, prefix, suffix, importsPosts, resolvedPosts, posts2, backlinks2, U5Bslugu5D;
var init_slug_svelte = __esm({
  ".svelte-kit/deno/server/entries/pages/_slug_.svelte.js"() {
    init_index_3a994b0d();
    css7 = {
      code: "footer.svelte-n739cz{margin:var(--column-margin-top) auto}",
      map: null
    };
    prerender = true;
    prefix = "/content/";
    suffix = ".md";
    importsPosts = { "/content/about.md": () => Promise.resolve().then(() => (init_about_8829b8bc(), about_8829b8bc_exports)).then(function(n) {
      return n._;
    }), "/content/debug.md": () => Promise.resolve().then(() => (init_debug_b9aa0e48(), debug_b9aa0e48_exports)).then(function(n) {
      return n._;
    }), "/content/readme.md": () => Promise.resolve().then(() => (init_readme_53778a7a(), readme_53778a7a_exports)).then(function(n) {
      return n._;
    }), "/content/wasm.md": () => Promise.resolve().then(() => (init_wasm_d96aa484(), wasm_d96aa484_exports)).then(function(n) {
      return n._;
    }), "/content/welcome.md": () => Promise.resolve().then(() => (init_welcome_9a32be47(), welcome_9a32be47_exports)).then(function(n) {
      return n._;
    }) };
    resolvedPosts = {};
    U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { component } = $$props;
      let { metadata: metadata6 } = $$props;
      const defaults = {
        title: "pluvial.xyz",
        author: "pluvial",
        description: "pluvial.xyz"
      };
      const { title, author, description, links: links3, externalLinks, backlinks: backlinks22 } = { ...defaults, ...metadata6 };
      if ($$props.component === void 0 && $$bindings.component && component !== void 0)
        $$bindings.component(component);
      if ($$props.metadata === void 0 && $$bindings.metadata && metadata6 !== void 0)
        $$bindings.metadata(metadata6);
      $$result.css.add(css7);
      return `${$$result.head += `${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="${"author"}"${add_attribute("content", author, 0)} data-svelte="svelte-y21vlh"><meta name="${"description"}"${add_attribute("content", description, 0)} data-svelte="svelte-y21vlh">`, ""}

${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}

<footer class="${"svelte-n739cz"}">${links3.length ? `<p>Internal Links:</p>
    <ul>${each(links3, (link) => {
        return `<li><a sveltekit:prefetch${add_attribute("href", link.href, 0)}>${escape(link.content)}</a>
        </li>`;
      })}</ul>` : ``}

  ${externalLinks.length ? `<p>External Links:</p>
    <ul>${each(externalLinks, (link) => {
        return `<li><a${add_attribute("href", link.href, 0)} rel="${"external"}">${escape(link.content)}</a>
        </li>`;
      })}</ul>` : ``}

  ${backlinks22.length ? `<p>Backlinks:</p>
    <ul>${each(backlinks22, ({ href, content }) => {
        return `<li><a sveltekit:prefetch${add_attribute("href", href, 0)}>${escape(content)}</a>
        </li>`;
      })}</ul>` : ``}
</footer>`;
    });
  }
});

// .svelte-kit/deno/server/nodes/4.js
var __exports4 = {};
__export(__exports4, {
  css: () => css8,
  entry: () => entry4,
  js: () => js4,
  module: () => slug_svelte_exports
});
var entry4, js4, css8;
var init__4 = __esm({
  ".svelte-kit/deno/server/nodes/4.js"() {
    init_slug_svelte();
    entry4 = "pages/_slug_.svelte-eb48bbd9.js";
    js4 = ["pages/_slug_.svelte-eb48bbd9.js", "chunks/preload-helper-ec9aa979.js", "chunks/vendor-0683de8a.js"];
    css8 = ["assets/pages/_slug_.svelte-1fdc913b.css"];
  }
});

// .svelte-kit/deno/server/entries/endpoints/search.json.js
var search_json_exports = {};
__export(search_json_exports, {
  get: () => get
});
async function get() {
  return {
    status: 200,
    body: { searchDocuments: searchDocuments2 }
  };
}
var imports, searchDocuments2;
var init_search_json = __esm({
  ".svelte-kit/deno/server/entries/endpoints/search.json.js"() {
    init_about_8829b8bc();
    init_debug_b9aa0e48();
    init_readme_53778a7a();
    init_wasm_d96aa484();
    init_welcome_9a32be47();
    init_index_3a994b0d();
    imports = { "/content/about.md": __glob_0_0, "/content/debug.md": __glob_0_1, "/content/readme.md": __glob_0_2, "/content/wasm.md": __glob_0_3, "/content/welcome.md": __glob_0_4 };
    searchDocuments2 = Object.entries(imports).map(([path2, module], index) => {
      const slug = path2.slice("/content/".length, -".md".length);
      const href = `/${slug}`;
      const { title } = module.metadata;
      const content = module.default.render().html;
      const document = { id: index, title, content, href, slug };
      return document;
    });
  }
});

// .svelte-kit/deno/server/entries/endpoints/posts.json.js
var posts_json_exports = {};
__export(posts_json_exports, {
  get: () => get2
});
async function get2() {
  return {
    status: 200,
    body: { posts: { list: posts3, map: postsMap }, links: links2, backlinks: backlinks3 }
  };
}
var prefix2, suffix2, imports2, pathToSlug, hrefToSlug, links2, backlinks3, posts3, postsMap;
var init_posts_json = __esm({
  ".svelte-kit/deno/server/entries/endpoints/posts.json.js"() {
    init_about_8829b8bc();
    init_debug_b9aa0e48();
    init_readme_53778a7a();
    init_wasm_d96aa484();
    init_welcome_9a32be47();
    init_index_3a994b0d();
    prefix2 = "/content/";
    suffix2 = ".md";
    imports2 = { "/content/about.md": __glob_0_0, "/content/debug.md": __glob_0_1, "/content/readme.md": __glob_0_2, "/content/wasm.md": __glob_0_3, "/content/welcome.md": __glob_0_4 };
    pathToSlug = (path2) => path2.slice(prefix2.length, -suffix2.length);
    hrefToSlug = (href) => href.slice(1);
    links2 = {};
    backlinks3 = {};
    posts3 = Object.entries(imports2).map(([path2, module]) => {
      const { metadata: metadata6 } = module;
      const slug = metadata6.slug ?? pathToSlug(path2);
      links2[slug] = metadata6.links.map(({ href }) => hrefToSlug(href));
      metadata6.links.forEach(({ href }) => {
        const linkSlug = hrefToSlug(href);
        backlinks3[linkSlug] = backlinks3[linkSlug]?.concat(slug) ?? [slug];
      });
      return {
        metadata: metadata6,
        slug
      };
    });
    postsMap = Object.fromEntries(posts3.map((post) => [post.slug, post]));
  }
});

// .svelte-kit/deno/deps.ts
import {
  readAll,
  readerFromStreamReader
} from "https://deno.land/std@0.121.0/streams/conversion.ts";
import { dirname, extname, fromFileUrl, join } from "https://deno.land/std@0.119.0/path/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";

// .svelte-kit/deno/server/app.js
init_index_3a994b0d();
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _use_hashes;
var _dev;
var _script_needs_csp;
var _style_needs_csp;
var _directives;
var _script_src;
var _style_src;
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone = {};
  for (const key2 in obj) {
    clone[key2.toLowerCase()] = obj[key2];
  }
  return clone;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler2 = mod[method];
  if (!handler2 && method === "head") {
    handler2 = mod.get;
  }
  if (!handler2) {
    return;
  }
  const response = await handler2(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    return;
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry5) {
    return entry5[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry5, i) {
    names.set(entry5[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var escape_json_in_html_dict = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var escape_json_in_html_regex = new RegExp(`[${Object.keys(escape_json_in_html_dict).join("")}]`, "g");
function escape_json_in_html(val) {
  return JSON.stringify(val).replace(escape_json_in_html_regex, (match) => escape_json_in_html_dict[match]);
}
function escape2(str, dict, unicode_encoder) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape2(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
var s = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode(data);
  for (let i = 0; i < array.length; i += 16) {
    const w = array.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  constructor({ mode, directives }, { dev, prerender: prerender2, needs_nonce }) {
    __privateAdd(this, _use_hashes, void 0);
    __privateAdd(this, _dev, void 0);
    __privateAdd(this, _script_needs_csp, void 0);
    __privateAdd(this, _style_needs_csp, void 0);
    __privateAdd(this, _directives, void 0);
    __privateAdd(this, _script_src, void 0);
    __privateAdd(this, _style_src, void 0);
    __privateSet(this, _use_hashes, mode === "hash" || mode === "auto" && prerender2);
    __privateSet(this, _directives, dev ? { ...directives } : directives);
    __privateSet(this, _dev, dev);
    const d = __privateGet(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${generate_hash(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
_use_hashes = /* @__PURE__ */ new WeakMap();
_dev = /* @__PURE__ */ new WeakMap();
_script_needs_csp = /* @__PURE__ */ new WeakMap();
_style_needs_csp = /* @__PURE__ */ new WeakMap();
_directives = /* @__PURE__ */ new WeakMap();
_script_src = /* @__PURE__ */ new WeakMap();
_style_src = /* @__PURE__ */ new WeakMap();
var updated = {
  ...readable(false),
  check: () => false
};
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2,
  url,
  params,
  resolve_opts,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url2) => stylesheets.add(url2));
      if (node.js)
        node.js.forEach((url2) => modulepreloads.add(url2));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session,
        updated
      },
      page: {
        url: state.prerender ? create_prerendering_url_proxy(url) : url,
        params,
        status,
        error: error2,
        stuff
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-hydrate="${target}"]').parentNode,
			paths: ${s(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s(options.prefix + node.entry)})`).join(",\n						")}
				],
				params: ${devalue(params)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('${options.service_worker}');
		}
	`;
  if (options.amp) {
    const styles2 = `${inlined_style}
${rendered.css.code}`;
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${styles2}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-svelte");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"', `data-hydrate="${target}"`];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url: url2, body: body2, json }) => {
        let attributes2 = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url2)}`;
        if (body2)
          attributes2 += ` data-body="${hash(body2)}"`;
        return `<script ${attributes2}>${json}<\/script>`;
      }).join("\n	");
      if (shadow_props) {
        body += `<script type="application/json" data-type="svelte-props">${escape_json_in_html(shadow_props)}<\/script>`;
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (maxage) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (maxage) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path2) {
  if (scheme.test(path2))
    return path2;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path2);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path2.slice(path_match[0].length).split("/") : path2.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix4 = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix4}${baseparts.join("/")}`;
}
function is_root_relative(path2) {
  return path2[0] === "/" && path2[1] !== "/";
}
function normalize_path(path2, trailing_slash) {
  if (path2 === "/" || trailing_slash === "ignore")
    return path2;
  if (trailing_slash === "never") {
    return path2.endsWith("/") ? path2.slice(0, -1) : path2;
  } else if (trailing_slash === "always" && /\/[^./]+$/.test(path2)) {
    return path2 + "/";
  }
  return path2;
}
async function load_node({
  event,
  options,
  state,
  route,
  url,
  params,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, !!state.prerender) : {};
  if (shadow.fallthrough)
    return;
  if (shadow.cookies) {
    set_cookie_headers.push(...shadow.cookies);
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(url) : url,
      params,
      props: shadow.body || {},
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        opts.headers.set("referer", event.url.href);
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix4 = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix4) ? resolved.slice(prefix4.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest._.mime[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            const authorization = event.request.headers.get("authorization");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, opts), options, {
            fetched: requested,
            initiator: route
          });
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 === "set-cookie") {
                  set_cookie_headers = set_cookie_headers.concat(value);
                } else if (key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  json: `{"status":${status_number},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape_json_in_html(body)}}`
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: { ...stuff }
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (loaded.fallthrough && !is_error) {
    return;
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender2) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender2 && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler2 = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler2 && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler2(event);
      if (result.fallthrough)
        return result;
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = body;
    }
    const get3 = method === "head" && mod.head || mod.get;
    if (get3) {
      const result = await get3(event);
      if (result.fallthrough)
        return result;
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = { ...body, ...data.body };
    }
    return data;
  } catch (e) {
    const error2 = coalesce_to_error(e);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const default_layout = await options.manifest._.nodes[0]();
    const default_error = await options.manifest._.nodes[1]();
    const params = {};
    const layout_loaded = await load_node({
      event,
      options,
      state,
      route: null,
      url: event.url,
      params,
      node: default_layout,
      $session,
      stuff: {},
      is_error: false,
      is_leaf: false
    });
    const error_loaded = await load_node({
      event,
      options,
      state,
      route: null,
      url: event.url,
      params,
      node: default_error,
      $session,
      stuff: layout_loaded ? layout_loaded.stuff : {},
      is_error: true,
      is_leaf: false,
      status,
      error: error2
    });
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff: error_loaded.stuff,
      status,
      error: error2,
      branch: [layout_loaded, error_loaded],
      url: event.url,
      params,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response({
      ...opts,
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      url: event.url,
      stuff: {}
    });
  }
  try {
    nodes = await Promise.all(route.a.map((n) => options.manifest._.nodes[n] && options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return new Response(void 0, {
      status: 204
    });
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  let stuff = {};
  ssr:
    if (resolve_opts.ssr) {
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              url: event.url,
              node,
              stuff,
              is_error: false,
              is_leaf: i === nodes.length - 1
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies(new Response(void 0, {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              }), set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options.handle_error(e, event);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options.manifest._.nodes[route.b[i]]();
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    url: event.url,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    is_error: true,
                    is_leaf: false,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  stuff = { ...node_loaded.stuff, ...error_loaded.stuff };
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options.handle_error(e, event);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              event,
              options,
              state,
              $session,
              status,
              error: error2,
              resolve_opts
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      stuff,
      url: event.url,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  const response = await respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route,
    params: event.params
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return new Response(`Bad request in load function: failed to fetch ${state.fetched}`, {
      status: 500
    });
  }
}
function negotiate(accept, types) {
  const parts = accept.split(",").map((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state = {}) {
  const url = new URL(request.url);
  const normalized = normalize_path(url.pathname, options.trailing_slash);
  if (normalized !== url.pathname) {
    return new Response(void 0, {
      status: 301,
      headers: {
        location: normalized + (url.search === "?" ? "" : url.search)
      }
    });
  }
  const { parameter, allowed } = options.method_override;
  const method_override = url.searchParams.get(parameter)?.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  const event = {
    request,
    url,
    params: {},
    locals: {},
    platform: state.platform
  };
  const removed = (property, replacement, suffix3 = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix3);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            url: event2.url,
            params: event2.params,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            branch: [],
            resolve_opts: {
              ...resolve_opts,
              ssr: false
            }
          });
        }
        let decoded = decodeURI(event2.url.pathname);
        if (options.paths.base) {
          if (!decoded.startsWith(options.paths.base)) {
            return new Response(void 0, { status: 404 });
          }
          decoded = decoded.slice(options.paths.base.length) || "/";
        }
        const is_data_request = decoded.endsWith(DATA_SUFFIX);
        if (is_data_request) {
          decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
          const normalized2 = normalize_path(url.pathname.slice(0, -DATA_SUFFIX.length), options.trailing_slash);
          event2.url = new URL(event2.url.origin + normalized2 + event2.url.search);
        }
        for (const route of options.manifest._.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          event2.params = route.params ? decode_params(route.params(match)) : {};
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.get("x-sveltekit-load") === "true") {
              if (response2) {
                if (response2.status >= 300 && response2.status < 400) {
                  const location = response2.headers.get("location");
                  if (location) {
                    const headers = new Headers(response2.headers);
                    headers.set("x-sveltekit-location", location);
                    response2 = new Response(void 0, {
                      status: 204,
                      headers
                    });
                  }
                }
              } else {
                response2 = new Response("{}", {
                  headers: {
                    "content-type": "application/json"
                  }
                });
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value?.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e) {
    const error2 = coalesce_to_error(e);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e2) {
      const error3 = coalesce_to_error(e2);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="/favicon.png" />\n    <link rel="manifest" href="/manifest.json" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <meta name="theme-color" content="#ffffff" />\n    <link rel="apple-touch-icon" href="/images/svelte-192.png" />\n    ' + head + "\n  </head>\n  <body>\n    <div>" + body + "</div>\n  </body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var App = class {
  constructor(manifest2) {
    const hooks = get_hooks(user_hooks);
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: base + "/service-worker.js",
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  render(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to app.render must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/deno/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["css/LICENSE", "css/min/a11yana.min.css", "css/min/ads-gazette.min.css", "css/min/ads-medium.min.css", "css/min/ads-notebook.min.css", "css/min/ads-tufte.min.css", "css/min/attri-bright-light-green.min.css", "css/min/attri-dark-fairy-pink.min.css", "css/min/attri-dark-forest-green.min.css", "css/min/attri-light-fairy-pink.min.css", "css/min/attri-midnight-green.min.css", "css/min/awsm-bigstone.min.css", "css/min/awsm-black.min.css", "css/min/awsm-default.min.css", "css/min/awsm-gondola.min.css", "css/min/awsm-mischka.min.css", "css/min/awsm-pastelpink.min.css", "css/min/awsm-pearllusta.min.css", "css/min/awsm-tasman.min.css", "css/min/awsm-white.min.css", "css/min/axist.min.css", "css/min/bahunya.min.css", "css/min/bamboo.min.css", "css/min/bare.min.css", "css/min/base.min.css", "css/min/basic.min.css", "css/min/bonsai.min.css", "css/min/boot-cerulean.min.css", "css/min/boot-cosmo.min.css", "css/min/boot-cyborg.min.css", "css/min/boot-darkly.min.css", "css/min/boot-flatly.min.css", "css/min/boot-journal.min.css", "css/min/boot-lumen.min.css", "css/min/boot-paper.min.css", "css/min/boot-readable.min.css", "css/min/boot-sandstone.min.css", "css/min/boot-slate.min.css", "css/min/boot-spacelab.min.css", "css/min/boot-superhero.min.css", "css/min/boot-yeti.min.css", "css/min/bullframe.min.css", "css/min/bulma.min.css", "css/min/caiuss.min.css", "css/min/caramel.min.css", "css/min/cardinal.min.css", "css/min/centurion.min.css", "css/min/chota.min.css", "css/min/cirrus.min.css", "css/min/clmaterial.min.css", "css/min/codify.min.css", "css/min/comet.min.css", "css/min/concise.min.css", "css/min/concrete.min.css", "css/min/cutestrap.min.css", "css/min/flat-ui.min.css", "css/min/fluidity.min.css", "css/min/furtive.min.css", "css/min/gd.min.css", "css/min/generic.min.css", "css/min/github-markdown.min.css", "css/min/gutenberg.min.css", "css/min/hack.min.css", "css/min/hello.min.css", "css/min/hiq.min.css", "css/min/holiday.min.css", "css/min/html-starterkit.min.css", "css/min/hyp.min.css", "css/min/kathamo.min.css", "css/min/koochak.min.css", "css/min/kraken.min.css", "css/min/kube.min.css", "css/min/latex.min.css", "css/min/lemon.min.css", "css/min/lit.min.css", "css/min/lotus.min.css", "css/min/markdown.min.css", "css/min/marx.min.css", "css/min/material.min.css", "css/min/materialize.min.css", "css/min/md-air.min.css", "css/min/md-modest.min.css", "css/min/md-retro.min.css", "css/min/md-splendor.min.css", "css/min/mercury.min.css", "css/min/milligram.min.css", "css/min/min.min.css", "css/min/mini.min.css", "css/min/minimal-stylesheet.min.css", "css/min/minimal.min.css", "css/min/mobi.min.css", "css/min/motherplate.min.css", "css/min/mu.min.css", "css/min/mui.min.css", "css/min/mvp.min.css", "css/min/neat.min.css", "css/min/new.min.css", "css/min/no-class.min.css", "css/min/normalize.min.css", "css/min/oh-my-css.min.css", "css/min/ok.min.css", "css/min/pandoc-scholar.min.css", "css/min/paper.min.css", "css/min/papier.min.css", "css/min/pavilion.min.css", "css/min/picnic.min.css", "css/min/pico.min.css", "css/min/preface.min.css", "css/min/primer.min.css", "css/min/propeller.min.css", "css/min/pure.min.css", "css/min/roble.min.css", "css/min/sakura.min.css", "css/min/sanitize.min.css", "css/min/scooter.min.css", "css/min/semantic-ui.min.css", "css/min/shoelace.min.css", "css/min/siimple.min.css", "css/min/simple.min.css", "css/min/skeleton-framework.min.css", "css/min/skeleton-plus.min.css", "css/min/skeleton.min.css", "css/min/snack.min.css", "css/min/spcss.min.css", "css/min/spectre.min.css", "css/min/style.min.css", "css/min/stylize.min.css", "css/min/tachyons.min.css", "css/min/tacit.min.css", "css/min/tent.min.css", "css/min/thao.min.css", "css/min/tui.min.css", "css/min/vanilla.min.css", "css/min/vital.min.css", "css/min/w3c-chocolate.min.css", "css/min/w3c-midnight.min.css", "css/min/w3c-modernist.min.css", "css/min/w3c-oldstyle.min.css", "css/min/w3c-steely.min.css", "css/min/w3c-swiss.min.css", "css/min/w3c-traditional.min.css", "css/min/w3c-ultramarine.min.css", "css/min/water.min.css", "css/min/wing.min.css", "css/min/writ.min.css", "css/min/yamb.min.css", "css/min/yorha.min.css", "css/src/a11yana.css", "css/src/ads-gazette.css", "css/src/ads-medium.css", "css/src/ads-notebook.css", "css/src/ads-tufte.css", "css/src/attri-bright-light-green.css", "css/src/attri-dark-fairy-pink.css", "css/src/attri-dark-forest-green.css", "css/src/attri-light-fairy-pink.css", "css/src/attri-midnight-green.css", "css/src/awsm-bigstone.css", "css/src/awsm-black.css", "css/src/awsm-default.css", "css/src/awsm-gondola.css", "css/src/awsm-mischka.css", "css/src/awsm-pastelpink.css", "css/src/awsm-pearllusta.css", "css/src/awsm-tasman.css", "css/src/awsm-white.css", "css/src/axist.css", "css/src/bahunya.css", "css/src/bamboo.css", "css/src/bare.css", "css/src/base.css", "css/src/basic.css", "css/src/bonsai.css", "css/src/boot-cerulean.css", "css/src/boot-cosmo.css", "css/src/boot-cyborg.css", "css/src/boot-darkly.css", "css/src/boot-flatly.css", "css/src/boot-journal.css", "css/src/boot-lumen.css", "css/src/boot-paper.css", "css/src/boot-readable.css", "css/src/boot-sandstone.css", "css/src/boot-slate.css", "css/src/boot-spacelab.css", "css/src/boot-superhero.css", "css/src/boot-yeti.css", "css/src/bullframe.css", "css/src/bulma.css", "css/src/caiuss.css", "css/src/caramel.css", "css/src/cardinal.css", "css/src/centurion.css", "css/src/chota.css", "css/src/cirrus.css", "css/src/clmaterial.css", "css/src/codify.css", "css/src/comet.css", "css/src/concise.css", "css/src/concrete.css", "css/src/cutestrap.css", "css/src/flat-ui.css", "css/src/fluidity.css", "css/src/furtive.css", "css/src/gd.css", "css/src/generic.css", "css/src/github-markdown.css", "css/src/gutenberg.css", "css/src/hack.css", "css/src/hello.css", "css/src/hiq.css", "css/src/holiday.css", "css/src/html-starterkit.css", "css/src/hyp.css", "css/src/kathamo.css", "css/src/koochak.css", "css/src/kraken.css", "css/src/kube.css", "css/src/latex.css", "css/src/lemon.css", "css/src/lit.css", "css/src/lotus.css", "css/src/markdown.css", "css/src/marx.css", "css/src/material.css", "css/src/materialize.css", "css/src/md-air.css", "css/src/md-modest.css", "css/src/md-retro.css", "css/src/md-splendor.css", "css/src/mercury.css", "css/src/milligram.css", "css/src/min.css", "css/src/mini.css", "css/src/minimal-stylesheet.css", "css/src/minimal.css", "css/src/mobi.css", "css/src/motherplate.css", "css/src/mu.css", "css/src/mui.css", "css/src/mvp.css", "css/src/neat.css", "css/src/new.css", "css/src/no-class.css", "css/src/normalize.css", "css/src/oh-my-css.css", "css/src/ok.css", "css/src/pandoc-scholar.css", "css/src/paper.css", "css/src/papier.css", "css/src/pavilion.css", "css/src/picnic.css", "css/src/pico.css", "css/src/preface.css", "css/src/primer.css", "css/src/propeller.css", "css/src/pure.css", "css/src/roble.css", "css/src/sakura.css", "css/src/sanitize.css", "css/src/scooter.css", "css/src/semantic-ui.css", "css/src/shoelace.css", "css/src/siimple.css", "css/src/simple.css", "css/src/skeleton-framework.css", "css/src/skeleton-plus.css", "css/src/skeleton.css", "css/src/snack.css", "css/src/spcss.css", "css/src/spectre.css", "css/src/style.css", "css/src/stylize.css", "css/src/tachyons.css", "css/src/tacit.css", "css/src/tent.css", "css/src/thao.css", "css/src/tui.css", "css/src/vanilla.css", "css/src/vital.css", "css/src/w3c-chocolate.css", "css/src/w3c-midnight.css", "css/src/w3c-modernist.css", "css/src/w3c-oldstyle.css", "css/src/w3c-steely.css", "css/src/w3c-swiss.css", "css/src/w3c-traditional.css", "css/src/w3c-ultramarine.css", "css/src/water.css", "css/src/wing.css", "css/src/writ.css", "css/src/yamb.css", "css/src/yorha.css", "favicon.png", "images/svelte-192.png", "images/svelte-512.png", "manifest.json", "robots.txt", "service-worker.js"]),
  _: {
    mime: { ".css": "text/css", ".png": "image/png", ".json": "application/json", ".txt": "text/plain" },
    entry: { "file": "start-5ed70704.js", "js": ["start-5ed70704.js", "chunks/vendor-0683de8a.js", "chunks/preload-helper-ec9aa979.js", "chunks/singletons-a6a7384f.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/dropin-minimal-css\/?$/,
        params: null,
        path: "/dropin-minimal-css",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/search\.json$/,
        params: null,
        load: () => Promise.resolve().then(() => (init_search_json(), search_json_exports))
      },
      {
        type: "endpoint",
        pattern: /^\/posts\.json$/,
        params: null,
        load: () => Promise.resolve().then(() => (init_posts_json(), posts_json_exports))
      },
      {
        type: "page",
        pattern: /^\/([^/]+?)\/?$/,
        params: (m) => ({ slug: m[1] }),
        path: null,
        shadow: null,
        a: [0, 3],
        b: [1]
      }
    ]
  }
};
var prerendered = /* @__PURE__ */ new Set(["/", "/posts.json", "/search.json", "/readme", "/welcome", "/about", "/wasm", "/debug"]);

// .svelte-kit/deno/index.js
var MEDIA_TYPES = {
  ".md": "text/markdown",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".map": "application/json",
  ".txt": "text/plain",
  ".ts": "text/typescript",
  ".tsx": "text/tsx",
  ".js": "application/javascript",
  ".jsx": "text/jsx",
  ".gz": "application/gzip",
  ".css": "text/css",
  ".wasm": "application/wasm",
  ".mjs": "application/javascript",
  ".otf": "font/otf",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".conf": "text/plain",
  ".list": "text/plain",
  ".log": "text/plain",
  ".ini": "text/plain",
  ".vtt": "text/vtt",
  ".yaml": "text/yaml",
  ".yml": "text/yaml",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".mp3": "audio/mp3",
  ".mp4a": "audio/mp4",
  ".m4a": "audio/mp4",
  ".ogg": "audio/ogg",
  ".spx": "audio/ogg",
  ".opus": "audio/ogg",
  ".wav": "audio/wav",
  ".webm": "audio/webm",
  ".aac": "audio/x-aac",
  ".flac": "audio/x-flac",
  ".mp4": "video/mp4",
  ".mp4v": "video/mp4",
  ".mkv": "video/x-matroska",
  ".mov": "video/quicktime",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".gif": "image/gif",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".tiff": "image/tiff",
  ".psd": "image/vnd.adobe.photoshop",
  ".ico": "image/vnd.microsoft.icon",
  ".webp": "image/webp",
  ".es": "application/ecmascript",
  ".epub": "application/epub+zip",
  ".jar": "application/java-archive",
  ".war": "application/java-archive",
  ".webmanifest": "application/manifest+json",
  ".doc": "application/msword",
  ".dot": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".dotx": "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  ".cjs": "application/node",
  ".bin": "application/octet-stream",
  ".pkg": "application/octet-stream",
  ".dump": "application/octet-stream",
  ".exe": "application/octet-stream",
  ".deploy": "application/octet-stream",
  ".img": "application/octet-stream",
  ".msi": "application/octet-stream",
  ".pdf": "application/pdf",
  ".pgp": "application/pgp-encrypted",
  ".asc": "application/pgp-signature",
  ".sig": "application/pgp-signature",
  ".ai": "application/postscript",
  ".eps": "application/postscript",
  ".ps": "application/postscript",
  ".rdf": "application/rdf+xml",
  ".rss": "application/rss+xml",
  ".rtf": "application/rtf",
  ".apk": "application/vnd.android.package-archive",
  ".key": "application/vnd.apple.keynote",
  ".numbers": "application/vnd.apple.keynote",
  ".pages": "application/vnd.apple.pages",
  ".geo": "application/vnd.dynageo",
  ".gdoc": "application/vnd.google-apps.document",
  ".gslides": "application/vnd.google-apps.presentation",
  ".gsheet": "application/vnd.google-apps.spreadsheet",
  ".kml": "application/vnd.google-earth.kml+xml",
  ".mkz": "application/vnd.google-earth.kmz",
  ".icc": "application/vnd.iccprofile",
  ".icm": "application/vnd.iccprofile",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xlm": "application/vnd.ms-excel",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pot": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".potx": "application/vnd.openxmlformats-officedocument.presentationml.template",
  ".xps": "application/vnd.ms-xpsdocument",
  ".odc": "application/vnd.oasis.opendocument.chart",
  ".odb": "application/vnd.oasis.opendocument.database",
  ".odf": "application/vnd.oasis.opendocument.formula",
  ".odg": "application/vnd.oasis.opendocument.graphics",
  ".odp": "application/vnd.oasis.opendocument.presentation",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".rar": "application/vnd.rar",
  ".unityweb": "application/vnd.unity",
  ".dmg": "application/x-apple-diskimage",
  ".bz": "application/x-bzip",
  ".crx": "application/x-chrome-extension",
  ".deb": "application/x-debian-package",
  ".php": "application/x-httpd-php",
  ".iso": "application/x-iso9660-image",
  ".sh": "application/x-sh",
  ".sql": "application/x-sql",
  ".srt": "application/x-subrip",
  ".xml": "application/xml",
  ".zip": "application/zip"
};
var contentType = (path2) => MEDIA_TYPES[extname(path2)];
var app = new App(manifest);
var __dirname = dirname(fromFileUrl(import.meta.url));
var prefix3 = `/${manifest.appDir}/`;
async function handler(ctx, next) {
  if (ctx.request.url.pathname.startsWith(prefix3)) {
    return await ctx.send({
      root: join(__dirname, "client"),
      headers: {
        "cache-control": "public, immutable, max-age=31536000",
        "content-type": contentType(ctx.request.url.pathname)
      }
    });
  }
  const pathname = ctx.request.url.pathname.replace(/\/$/, "");
  let file = pathname.substring(1);
  try {
    file = decodeURIComponent(file);
  } catch (err) {
  }
  if (manifest.assets.has(file)) {
    return await ctx.send({ root: join(__dirname, "static") });
  }
  file += "/index.html";
  if (manifest.assets.has(file)) {
    return await ctx.send({ path: file, root: join(__dirname, "static") });
  }
  if (prerendered.has(pathname || "/")) {
    return await ctx.send({ path: file, root: join(__dirname, "prerendered") });
  }
  const req = ctx.request.originalRequest;
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    console.error(err);
    ctx.response.status = err.status || 400;
    ctx.response.body = err.reason || "Invalid request body";
    return await next();
  }
  const rendered = await app.render({
    method: req.method,
    headers: headers_to_object(req.headers),
    url: req.url,
    rawBody: body
  });
  if (rendered) {
    ctx.response.status = rendered.status;
    ctx.response.headers = make_headers(rendered.headers);
    ctx.response.body = rendered.body;
  } else {
    ctx.response.status = 404;
    ctx.response.body = "Not found";
  }
}
var headers_to_object = (headers) => Object.fromEntries(headers.entries());
function make_headers(headers) {
  const result = new Headers();
  for (const header in headers) {
    const value = headers[header];
    if (typeof value === "string") {
      result.set(header, value);
      continue;
    }
    for (const sub of value) {
      result.append(header, sub);
    }
  }
  return result;
}
async function getRawBody(req) {
  const { body, headers } = req;
  const type = headers.get("content-type")?.split(/,;\s*/)?.[0];
  if (type === null || body === null) {
    return null;
  }
  const data = await readAll(readerFromStreamReader(req.body.getReader()));
  return data;
}
var path = Deno.env.get("SOCKET_PATH") ?? false;
var host = Deno.env.get("HOST") ?? "0.0.0.0";
var port = Deno.env.get("PORT") ?? (!path && 3e3);
var server = new Application().use(handler);
server.addEventListener("listen", () => {
  console.log(`Listening on http://${addr}`);
});
var addr = path || `${host}:${port}`;
server.listen(addr).catch((err) => {
  console.error("error", err);
});
export {
  host,
  path,
  port,
  server
};
