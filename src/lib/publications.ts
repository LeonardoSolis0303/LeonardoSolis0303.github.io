import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';
import { routeFor } from './site';

export type PublicationSection = 'reviews' | 'research' | 'quant' | 'teaching';

export async function getEntries<S extends PublicationSection>(
  section: S, lang?: Lang, includeDrafts = import.meta.env.DEV,
): Promise<CollectionEntry<S>[]> {
  const entries = await getCollection(section);
  const routes = new Set<string>();
  for (const entry of entries) {
    const key = entry.data.lang + '/' + entry.data.slug;
    if (routes.has(key)) throw new Error('Duplicate ' + section + ' URL: ' + key);
    routes.add(key);
  }
  return entries
    .filter((entry) => (!lang || entry.data.lang === lang) && (includeDrafts || !entry.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.slug.localeCompare(b.data.slug));
}

export function entryUrl(section: PublicationSection, entry: { data: { lang: Lang; slug: string } }): string {
  return routeFor(entry.data.lang, section, entry.data.slug);
}

export async function alternateEntryUrl<S extends PublicationSection>(
  section: S, entry: CollectionEntry<S>,
): Promise<string | undefined> {
  const otherLang: Lang = entry.data.lang === 'es' ? 'en' : 'es';
  const matching = (await getEntries(section, otherLang, false))
    .find((candidate) => candidate.data.slug === entry.data.slug);
  return matching ? entryUrl(section, matching) : undefined;
}

export function researchLine(line: 'experimental' | 'teorico', lang: Lang): string {
  return line === 'experimental'
    ? (lang === 'es' ? 'Experimental' : 'Experimental')
    : (lang === 'es' ? 'Teórico' : 'Theoretical');
}

export function reviewCategory(category: 'ficcion' | 'noficcion' | 'ciencias', lang: Lang): string {
  const labels = {
    es: { ficcion: 'Ficción', noficcion: 'No ficción', ciencias: 'Ciencias & Matemáticas' },
    en: { ficcion: 'Fiction', noficcion: 'Non-fiction', ciencias: 'Science & Mathematics' },
  };
  return labels[lang][category];
}
