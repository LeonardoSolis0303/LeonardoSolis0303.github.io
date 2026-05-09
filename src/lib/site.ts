import { SITE_DATA } from '../data/siteData';
import type { Lang } from './i18n';

export const data = SITE_DATA;

export function g(obj: any, field: string, lang: Lang): string {
  if (!obj) return '';
  if (lang === 'en' && obj[field + '_en'] != null) return obj[field + '_en'];
  return obj[field] ?? '';
}

export function arr(obj: any, field: string, lang: Lang): any[] {
  if (!obj) return [];
  if (lang === 'en' && obj[field + '_en']) return obj[field + '_en'];
  return obj[field] ?? [];
}

export function slugify(input: string): string {
  return String(input)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'entry';
}

export function quantSlug(item: any) { return slugify(item.titulo_en || item.titulo); }
export function researchSlug(item: any) { return item.id || slugify(item.titulo_en || item.titulo); }
export function reviewSlug(item: any) { return slugify(item.titulo); }
export function blogSlug(item: any) { return slugify(item.titulo_en || item.titulo); }
export function teachingItems() {
  const e: any = data.ENSENANZA;
  return [
    ...e.problemas.map((item: any, i: number) => ({...item, kind:'problemas', kindIndex:i})),
    ...e.presenciales.map((item: any, i: number) => ({...item, kind:'presenciales', kindIndex:i})),
    ...e.universitarias.map((item: any, i: number) => ({...item, kind:'universitarias', kindIndex:i})),
  ];
}
export function teachingSlug(item: any) { return `${item.kind}-${slugify(item.titulo_en || item.titulo)}`; }

export function routeFor(lang: Lang, section: string, slug?: string): string {
  const base: Record<string, Record<Lang,string>> = {
    cv: { en:'/en/cv', es:'/es/cv' }, research: { en:'/en/research', es:'/es/research' },
    quant: { en:'/en/quant', es:'/es/quant' }, teaching: { en:'/en/teaching', es:'/es/ensenanza' },
    reviews: { en:'/en/reviews', es:'/es/resenas' }, blog: { en:'/en/blog', es:'/es/bitacora' },
  };
  const b = base[section][lang];
  return slug ? `${b}/${slug}` : b;
}

export const statusInfo: Record<string, any> = {
  tesis: { es:'Tesis', en:'Thesis', cls:'status--tesis' },
  progreso: { es:'En progreso', en:'In progress', cls:'status--progreso' },
  exploratorio: { es:'Exploratorio', en:'Exploratory', cls:'status--exploratorio' },
};

export function statusLabel(status: string, lang: Lang) { return statusInfo[status]?.[lang] ?? status; }
export function lineClass(line: string) { return line === 'experimental' ? 'chip--experimental' : 'chip--theory'; }
export function catClass(cat: string) { return `chip--cat-${cat}`; }
export function reviewCatClass(cat: string) { return cat === 'noficcion' ? 'chip--moss' : cat === 'ciencias' ? 'chip--cafe' : 'chip--terra'; }
