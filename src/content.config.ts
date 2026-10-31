import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const loader = (section: string) => glob({
  pattern: '**/*.md',
  base: './src/content/' + section,
  generateId: ({ entry }: { entry: string }) => entry.replace(/\.md$/, ''),
});

const base = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  lang: z.enum(['es', 'en']),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  draft: z.boolean().default(true),
  image: z.string().optional(),
  imageAlt: z.string().default(''),
  caption: z.string().optional(),
  tags: z.array(z.string()).default([]),
});
const withDates = <T extends z.ZodTypeAny>(schema: T) => schema.refine(
  (entry: any) => !entry.updated || entry.updated >= entry.date,
  { message: 'updated must be on or after date', path: ['updated'] },
);

const blog = defineCollection({
  loader: loader('blog'),
  schema: withDates(base.extend({
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
    category: z.enum(['fisica', 'quant', 'matematicas', 'mercados', 'personal']).default('personal'),
    featured: z.boolean().default(false),
  })),
});

const reviews = defineCollection({
  loader: loader('reviews'),
  schema: withDates(base.extend({
    author: z.string().min(1),
    year: z.number().int(),
    score: z.number().min(0).max(10),
    category: z.enum(['ficcion', 'noficcion', 'ciencias']),
    status: z.enum(['leido', 'leyendo', 'abandonado']).default('leido'),
  })),
});
const research = defineCollection({
  loader: loader('research'),
  schema: withDates(base.extend({
    line: z.enum(['experimental', 'teorico']),
    status: z.enum(['tesis', 'progreso', 'exploratorio']),
    place: z.string().optional(),
    advisor: z.string().optional(),
  })),
});
const quant = defineCollection({
  loader: loader('quant'),
  schema: withDates(base.extend({
    period: z.string().min(1),
    organization: z.string().min(1),
    stack: z.array(z.string()).default([]),
  })),
});
const teaching = defineCollection({
  loader: loader('teaching'),
  schema: withDates(base.extend({
    kind: z.enum(['problemas', 'presenciales', 'universitarias']),
    period: z.string().optional(),
    year: z.number().int().optional(),
    category: z.string().optional(),
  })),
});

export const collections = { blog, reviews, research, quant, teaching };
