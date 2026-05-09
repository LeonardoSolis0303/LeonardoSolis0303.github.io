import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Genera el id de la entry usando el path "translationKey/lang"
   en lugar del slug del frontmatter, para evitar colisiones cuando
   dos idiomas comparten slug (caso CRR). */
const localId = ({ entry }: { entry: string }) => {
  // entry viene como "rmt-energy-markets/en.md"
  return entry.replace(/\.md$/, '');
};

/* Posts del blog. Cada post vive como:
   src/content/blog/<translation-key>/<lang>.md
   donde <lang> es 'en' o 'es'. La translationKey se deriva del nombre
   de la carpeta automáticamente (en lib/content.ts). */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog', generateId: localId }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['en', 'es']),
    slug: z.string(),               // slug local de la URL en su idioma
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),   // ruta opcional a imagen
    readingMinutes: z.number().optional(),
  }),
});

/* Proyectos. Misma idea que blog. */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId: localId }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['en', 'es']),
    slug: z.string(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['active', 'paused', 'archived', 'draft']).default('active'),
    repo: z.string().url().optional(),    // enlace a GitHub
    relatedPosts: z.array(z.string()).default([]), // translationKeys de posts relacionados
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
