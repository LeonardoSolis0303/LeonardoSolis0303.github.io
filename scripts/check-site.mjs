import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve('dist');
const origin = 'https://leonardosolis0303.github.io';
async function filesIn(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    result.push(...(entry.isDirectory() ? await filesIn(file) : [file]));
  }
  return result;
}
const files = await filesIn(root);
const pages = files.filter((file) => file.endsWith('.html'));
assert(pages.length > 0, 'No HTML pages were built.');
const htmlByPath = new Map(await Promise.all(pages.map(async (file) => [
  '/' + file.slice(root.length + 1).replace(/index\.html$/, ''),
  await readFile(file, 'utf8'),
])));
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
const links = (html) => [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attrs(tag));
const normalize = (path) => path.endsWith('/') ? path : path + '/';

for (const [path, html] of htmlByPath) {
  const canonical = links(html).filter((link) => link.rel === 'canonical');
  assert.equal(canonical.length, 1, 'Expected one canonical: ' + path);
  assert.equal(canonical[0].href, origin + (path === '/' ? '/en/' : path), 'Incorrect canonical: ' + path);
  assert(/<title>[^<]+<\/title>/.test(html), 'Missing title: ' + path);
  assert(links(html).every((link) => !link.href?.includes('leosolis.github.io')), 'Old domain: ' + path);
  assert(!html.includes('draft-notice'), 'A draft leaked into production: ' + path);
  assert(!html.includes('name="robots" content="noindex'), 'Published page is noindex: ' + path);
  assert(!html.includes('class="katex-error"'), 'An equation failed to render: ' + path);
  for (const alternate of links(html).filter((link) => link.hreflang)) {
    const target = new URL(alternate.href);
    assert.equal(target.origin, origin);
    assert(htmlByPath.has(target.pathname), 'Missing translation: ' + alternate.href);
    if (alternate.hreflang !== 'x-default') {
      assert(links(htmlByPath.get(target.pathname)).some((link) =>
        link.hreflang && link.href === canonical[0].href), 'Non-reciprocal language link: ' + path);
    }
  }
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    const url = new URL(value, origin);
    const destination = join(root, decodeURIComponent(url.pathname));
    const exists = await stat(destination).catch(() => null);
    assert(exists, 'Broken internal asset/link in ' + path + ': ' + value);
    if (exists.isDirectory()) assert(url.pathname.endsWith('/'), 'Directory link needs a trailing slash: ' + value);
    if (url.hash && htmlByPath.has(normalize(url.pathname))) {
      assert(htmlByPath.get(normalize(url.pathname)).includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'),
        'Broken anchor in ' + path + ': ' + value);
    }
  }
  if (/^\/(?:es\/bitacora|en\/blog)\/[^/]+\/$/.test(path)) {
    const json = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
    assert(json, 'Missing article metadata: ' + path);
    const article = JSON.parse(json[1]);
    assert.equal(article['@type'], 'BlogPosting');
    assert.equal(article.url, origin + path);
    assert(!Number.isNaN(Date.parse(article.datePublished)), 'Invalid publication date: ' + path);
  }
}
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'Duplicate sitemap URL.');
const expected = [...htmlByPath.keys()].filter((path) => path !== '/').map((path) => origin + path).sort();
assert.deepEqual(sitemapUrls.sort(), expected, 'Sitemap must include each canonical page exactly once.');
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert(robots.includes('Sitemap: ' + origin + '/sitemap.xml'), 'Incorrect robots.txt sitemap.');
console.log('Verified ' + pages.length + ' pages: internal links, canonical URLs, language links, article metadata and sitemap.');
