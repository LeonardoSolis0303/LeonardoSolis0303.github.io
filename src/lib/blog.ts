import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(lang?: Lang, includeDrafts = import.meta.env.DEV): Promise<Post[]> {
  const posts = await getCollection('blog');
  const routes = new Set<string>();
  for (const post of posts) {
    const key = post.data.lang + '/' + post.data.slug;
    if (routes.has(key)) throw new Error('Duplicate blog URL: ' + key);
    routes.add(key);
  }
  return posts
    .filter((post) => (!lang || post.data.lang === lang) && (includeDrafts || !post.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.slug.localeCompare(b.data.slug));
}

export function postUrl(post: Post): string {
  const base = post.data.lang === 'es' ? '/es/bitacora/' : '/en/blog/';
  return base + post.data.slug + '/';
}

export async function alternatePostUrl(post: Post): Promise<string | undefined> {
  const otherLang = post.data.lang === 'es' ? 'en' : 'es';
  const translation = (await getPosts(otherLang)).find((entry) => entry.data.slug === post.data.slug);
  return translation ? postUrl(translation) : undefined;
}

export function readingMinutes(post: Post): number {
  const text = (post.body ?? '').replace(/\x60{3}[\s\S]*?\x60{3}/g, '').replace(/\$\$[\s\S]*?\$\$/g, '');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200));
}
