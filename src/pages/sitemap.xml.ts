import type { APIRoute } from 'astro';
import { data, blogSlug, researchSlug, quantSlug, reviewSlug, teachingItems, teachingSlug, routeFor } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const staticPaths = [
    '/', '/en', '/es', '/en/cv', '/es/cv', '/en/research', '/es/research', '/en/quant', '/es/quant',
    '/en/teaching', '/es/ensenanza', '/en/reviews', '/es/resenas', '/en/blog', '/es/bitacora',
  ];
  const dynamicPaths = [
    ...data.RESEARCH.flatMap((x:any)=>[routeFor('en','research',researchSlug(x)),routeFor('es','research',researchSlug(x))]),
    ...data.QUANT.flatMap((x:any)=>[routeFor('en','quant',quantSlug(x)),routeFor('es','quant',quantSlug(x))]),
    ...data.RESENAS.flatMap((x:any)=>[routeFor('en','reviews',reviewSlug(x)),routeFor('es','reviews',reviewSlug(x))]),
    ...data.BITACORA.flatMap((x:any)=>[routeFor('en','blog',blogSlug(x)),routeFor('es','blog',blogSlug(x))]),
    ...teachingItems().flatMap((x:any)=>[routeFor('en','teaching',teachingSlug(x)),routeFor('es','teaching',teachingSlug(x))]),
  ];
  const all = [...staticPaths, ...dynamicPaths];
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all.map(p => {
    const url = site ? new URL(p, site).toString() : p;
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
  }).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
