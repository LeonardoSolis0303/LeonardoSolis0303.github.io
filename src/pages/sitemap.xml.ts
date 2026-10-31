import type { APIRoute } from 'astro';
import { getPosts, postUrl } from '../lib/blog';
import { getEntries, entryUrl, type PublicationSection } from '../lib/publications';
export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Missing site URL');
  const staticPaths = ['/en/','/es/','/en/cv/','/es/cv/','/en/research/','/es/research/','/en/quant/','/es/quant/','/en/teaching/','/es/ensenanza/','/en/reviews/','/es/resenas/','/en/blog/','/es/bitacora/','/en/contact/','/es/contacto/'];
  const sections: PublicationSection[] = ['reviews','research','quant','teaching'];
  const posts = await getPosts(undefined,false);
  const grouped = await Promise.all(sections.map((section)=>getEntries(section,undefined,false)));
  const urls = [
    ...staticPaths.map((path)=>({path, date:undefined as Date | undefined})),
    ...posts.map((post)=>({path:postUrl(post),date:post.data.updated??post.data.date})),
    ...grouped.flatMap((entries,i)=>entries.map((entry)=>({path:entryUrl(sections[i],entry),date:entry.data.updated??entry.data.date}))),
  ];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.map(({path,date})=>'<url><loc>'+new URL(path,site).href+'</loc>'+(date?'<lastmod>'+date.toISOString().slice(0,10)+'</lastmod>':'')+'</url>').join('\n')
    + '\n</urlset>\n';
  return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
