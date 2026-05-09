import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { byLang, entryUrl } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const blog     = await getCollection('blog');
  const projects = await getCollection('projects');

  const staticPaths = [
    '/', '/en', '/es',
    '/en/about', '/es/sobre-mi',
    '/en/contact', '/es/contacto',
    '/en/blog', '/es/blog',
    '/en/projects', '/es/proyectos',
  ];

  const dynamicPaths = [
    ...byLang(blog,     'en').map(entryUrl),
    ...byLang(blog,     'es').map(entryUrl),
    ...byLang(projects, 'en').map(entryUrl),
    ...byLang(projects, 'es').map(entryUrl),
  ];

  const all = [...staticPaths, ...dynamicPaths];
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(p => {
  const url = site ? new URL(p, site).toString() : p;
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
  </url>`;
}).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
