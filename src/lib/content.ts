/* ────────────────────────────────────────────────
   content.ts — utilidades para emparejar contenido bilingüe
   ──────────────────────────────────────────────── */

import type { CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

type BlogEntry    = CollectionEntry<'blog'>;
type ProjectEntry = CollectionEntry<'projects'>;
type AnyEntry     = BlogEntry | ProjectEntry;

/* Cada entry vive en  <collection>/<translationKey>/<lang>.md
   El id de Astro es algo como "rmt-energy-markets/en". Sacamos
   la translationKey con el primer segmento. */
export function translationKey(entry: AnyEntry): string {
  const id = entry.id; // ej. "rmt-energy-markets/en"
  return id.split('/')[0];
}

/* Filtra una colección por idioma y opcionalmente excluye drafts. */
export function byLang<T extends AnyEntry>(
  entries: T[],
  lang: Lang,
  includeDrafts = false
): T[] {
  return entries
    .filter(e => e.data.lang === lang)
    .filter(e => includeDrafts || !e.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/* Dada una entry, busca su contraparte en el otro idioma (misma carpeta). */
export function counterpart<T extends AnyEntry>(
  entry: T,
  all: T[]
): T | undefined {
  const key = translationKey(entry);
  const otherLang: Lang = entry.data.lang === 'en' ? 'es' : 'en';
  return all.find(
    e => translationKey(e) === key && e.data.lang === otherLang && !e.data.draft
  );
}

/* URL pública de una entry según su tipo y lengua. */
export function entryUrl(entry: AnyEntry): string {
  const lang = entry.data.lang;
  const slug = entry.data.slug;
  if (entry.collection === 'blog') {
    return `/${lang}/blog/${slug}`;
  }
  // projects
  const segment = lang === 'en' ? 'projects' : 'proyectos';
  return `/${lang}/${segment}/${slug}`;
}

/* Estimación de tiempo de lectura si no viene en frontmatter */
export function estimateReadingMinutes(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
