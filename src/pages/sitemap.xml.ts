import type { APIRoute } from 'astro';
import { data, researchSlug, quantSlug, reviewSlug, teachingItems, teachingSlug, routeFor } from '../lib/site';
import { getPosts, postUrl } from '../lib/blog';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Configure site in astro.config.mjs before building the sitemap.');
  const staticPaths = [
    '/en/', '/es/', '/en/cv/', '/es/cv/', '/en/research/', '/es/research/', '/en/quant/', '/es/quant/',
    '/en/teaching/', '/es/ensenanza/', '/en/reviews/', '/es/resenas/', '/en/blog/', '/es/bitacora/',
    '/en/contact/', '/es/contacto/',
  ];
  const dynamicPaths = [
    ...data.RESEARCH.flatMap((x) => [routeFor('en', 'research', researchSlug(x)), routeFor('es', 'research', researchSlug(x))]),
    ...data.QUANT.flatMap((x) => [routeFor('en', 'quant', quantSlug(x)), routeFor('es', 'quant', quantSlug(x))]),
    ...data.RESENAS.flatMap((x) => [routeFor('en', 'reviews', reviewSlug(x)), routeFor('es', 'reviews', reviewSlug(x))]),
    ...teachingItems().flatMap((x) => [routeFor('en', 'teaching', teachingSlug(x)), routeFor('es', 'teaching', teachingSlug(x))]),
  ];
  const posts = await getPosts(undefined, false);
  const entries = [
    ...[...staticPaths, ...dynamicPaths].map((path) => ({ path, modified: undefined as Date | undefined })),
    ...posts.map((post) => ({ path: postUrl(post), modified: post.data.updated ?? post.data.date })),
  ];
  const escapeXml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const urls = entries.map(({ path, modified }) => {
    const lastmod = modified ? `<lastmod>${modified.toISOString().slice(0, 10)}</lastmod>` : '';
    return `<url><loc>${escapeXml(new URL(path, site).href)}</loc>${lastmod}</url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
