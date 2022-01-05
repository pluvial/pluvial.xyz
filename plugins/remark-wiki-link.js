// forked from https://github.com/landakram/remark-wiki-link/tree/v0.0.4
// the last version compatible with remark < v13

// MIT License

// Copyright (c) 2017 Mark Hudnall

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

const LINK_REGEX = /^\[\[(.+?)\]\]/;

function locator(value, fromIndex) {
  return value.indexOf('[', fromIndex);
}

function wikiLinkPlugin(opts = {}) {
  let permalinks = opts.permalinks || [];
  let defaultPageResolver = name => [name.replace(/ /g, '_').toLowerCase()];
  let pageResolver = opts.pageResolver || defaultPageResolver;
  let newClassName = opts.newClassName || 'new';
  let wikiLinkClassName = opts.wikiLinkClassName || 'internal';
  let defaultHrefTemplate = permalink => `#/page/${permalink}`;
  let hrefTemplate = opts.hrefTemplate || defaultHrefTemplate;
  let aliasDivider = opts.aliasDivider || ':';

  function isAlias(pageTitle) {
    return pageTitle.indexOf(aliasDivider) !== -1;
  }

  function parseAliasLink(pageTitle) {
    var [name, displayName] = pageTitle.split(aliasDivider);
    return { name, displayName };
  }

  function parsePageTitle(pageTitle) {
    if (isAlias(pageTitle)) {
      return parseAliasLink(pageTitle);
    }
    return {
      name: pageTitle,
      displayName: pageTitle,
    };
  }

  function inlineTokenizer(eat, value) {
    let match = LINK_REGEX.exec(value);

    if (match) {
      const pageName = match[1].trim();
      const { name, displayName } = parsePageTitle(pageName);

      let pagePermalinks = pageResolver(name);
      let permalink = pagePermalinks.find(p => permalinks.indexOf(p) != -1);
      let exists = permalink != undefined;

      if (!exists) {
        permalink = pagePermalinks[0];
      }

      let classNames = wikiLinkClassName;
      if (!exists) {
        classNames += ' ' + newClassName;
      }

      return eat(match[0])({
        type: 'wikiLink',
        value: name,
        data: {
          alias: displayName,
          permalink: permalink,
          exists: exists,
          hName: 'a',
          hProperties: {
            className: classNames,
            href: hrefTemplate(permalink),
          },
          hChildren: [
            {
              type: 'text',
              value: displayName,
            },
          ],
        },
      });
    }
  }

  inlineTokenizer.locator = locator;

  const Parser = this.Parser;

  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;
  inlineTokenizers.wikiLink = inlineTokenizer;
  inlineMethods.splice(inlineMethods.indexOf('link'), 0, 'wikiLink');

  // Stringify for wiki link
  const Compiler = this.Compiler;

  if (Compiler != null) {
    const visitors = Compiler.prototype.visitors;
    if (visitors) {
      visitors.wikiLink = function (node) {
        if (node.data.alias != node.value) {
          return `[[${node.value}${aliasDivider}${node.data.alias}]]`;
        }
        return `[[${node.value}]]`;
      };
    }
  }
}

export default wikiLinkPlugin;
