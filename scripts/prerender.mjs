import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/Webloom.tsx');
  const { SEO_ROUTES, SITE_URL, getSeo, structuredData } = await server.ssrLoadModule('/src/seo.ts');
  const template = await readFile('dist/index.html', 'utf8');
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  for (const route of SEO_ROUTES) {
    const seo = getSeo(route);
    const head = `<title>${escape(seo.title)}</title>
<meta name="description" content="${escape(seo.description)}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${seo.canonical}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Webloom" />
<meta property="og:locale" content="en_US" />
<meta property="og:title" content="${escape(seo.title)}" />
<meta property="og:description" content="${escape(seo.description)}" />
<meta property="og:url" content="${seo.canonical}" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="${escape(seo.title)}" />
<meta name="twitter:description" content="${escape(seo.description)}" />
<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData(route)).replaceAll('<', '\\u003c')}</script>`;
    const html = template.replace(/<title>[\s\S]*?<\/title>/, '').replace(/<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g, '').replace(/<link\s+rel="canonical"[^>]*>/g, '').replace('</head>', `${head}\n</head>`).replace('<div id="root"></div>', `<div id="root">${renderToString(createElement(App, { initialRoute: route }))}</div>`);
    const destination = route === '/' ? 'dist' : `dist${route}`;
    await mkdir(destination, { recursive: true });
    await writeFile(`${destination}/index.html`, html);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${SEO_ROUTES.map(route => `<url><loc>${SITE_URL}${route === '/' ? '/' : route}</loc></url>`).join('')}</urlset>\n`;
  await writeFile('dist/sitemap.xml', sitemap);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`Prerendered ${SEO_ROUTES.length} portfolio pages and generated sitemap.`);
} finally { await server.close(); }
