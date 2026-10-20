import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
const titles = new Set();
for (const url of urls) {
  const html = await readFile(`dist${url.pathname === '/' ? '' : url.pathname}/index.html`, 'utf8');
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${url}: one canonical`);
  assert.ok(html.includes(`href="${url.href}"`), `${url}: canonical matches route`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${url}: one prerendered h1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${url}: unique title`); titles.add(title);
  assert.ok(html.includes('name="description"'), `${url}: description`);
  assert.ok(!/href="(?:#\/|https:\/\/webloom.design)/.test(html), `${url}: crawlable links and current domain`);
  const graph = JSON.parse(html.match(/id="structured-data"[^>]*>(.*?)<\/script>/s)[1]);
  assert.ok(graph['@graph'].length >= 3, `${url}: valid structured data`);
}
const hardware = await readFile('dist/work/hardwaresniper/index.html', 'utf8');
assert.ok(hardware.includes('Explore Interactive Demo'));
const demo = await readFile('dist/demos/hardwaresniper/index.html', 'utf8');
assert.ok(demo.includes('/demos/hardwaresniper/assets/'));
console.log(`Verified ${urls.length} static pages: unique metadata, canonical URLs, structured data, visible headings, crawlable links, and packaged HardwareSniper demo.`);
