import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    lang: z.enum(['es', 'en']),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.enum(['fisica', 'quant', 'matematicas', 'mercados', 'personal']).default('personal'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    caption: z.string().optional(),
  }).refine((post) => !post.updated || post.updated >= post.date, {
    message: 'updated must be on or after date', path: ['updated'],
  }),
});

export const collections = { blog };
