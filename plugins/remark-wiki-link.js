// forked from https://github.com/landakram/remark-wiki-link/tree/v0.0.4
// the last version compatible with remark < v13

// MIT License

// Copyright (c) 2017 Mark Hudnall
// Copyright (c) 2021 João Paquim

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

const locator = (value, fromIndex) => value.indexOf('[', fromIndex);

const defaultPageResolver = name => [name.replace(/ /g, '_').toLowerCase()];

const defaultHrefTemplate = permalink => `#/page/${permalink}`;

function wikiLinkPlugin({
  permalinks = [],
  pageResolver = defaultPageResolver,
  newClassName = 'new',
  wikiLinkClassName = 'internal',
  hrefTemplate = defaultHrefTemplate,
  aliasDivider = ':',
} = {}) {
  const isAlias = pageTitle => pageTitle.indexOf(aliasDivider) !== -1;

  function parseAliasLink(pageTitle) {
    const [name, displayName] = pageTitle.split(aliasDivider);
    return { name, displayName };
  }

  const parsePageTitle = pageTitle =>
    isAlias(pageTitle)
      ? parseAliasLink(pageTitle)
      : {
          name: pageTitle,
          displayName: pageTitle,
        };

  function inlineTokenizer(eat, value) {
    const match = LINK_REGEX.exec(value);

    if (match) {
      const pageName = match[1].trim();
      const { name, displayName } = parsePageTitle(pageName);

      const pagePermalinks = pageResolver(name);
      let permalink = pagePermalinks.find(p => permalinks.indexOf(p) != -1);
      const exists = permalink != undefined;

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

  const { inlineTokenizers, inlineMethods } = this.Parser.prototype;
  inlineTokenizers.wikiLink = inlineTokenizer;
  inlineMethods.splice(inlineMethods.indexOf('link'), 0, 'wikiLink');

  // Stringify for wiki link
  if (this.Compiler != null) {
    const { visitors } = this.Compiler.prototype;
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
