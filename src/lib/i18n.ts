/* ────────────────────────────────────────────────
   i18n.ts — strings de interfaz por idioma
   ──────────────────────────────────────────────── */

export type Lang = 'en' | 'es';

export const LANGS: Lang[] = ['en', 'es'];

export const ui = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
      contact: 'Contact',
    },
    home: {
      eyebrow: 'Physics · Markets · Mathematics',
      role: 'Physicist & Quant Researcher',
      blurb:
        'I work on quantum experimentation in academia and quant research professionally — programming, models, electricity markets. I write here to think out loud about physics, mathematics and markets.',
      shortcuts: 'Shortcuts',
      latestPost: 'Latest entry',
      mathComps: 'Math competitions',
      problems: 'Problems',
      classes: 'Classes',
      downloadCV: 'Download CV',
      recentPosts: 'Recent writing',
      featuredProjects: 'Selected projects',
      seeAll: 'See all',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Notes on physics, mathematics, markets, and the occasional book.',
      readingTime: 'min read',
      empty: 'No entries yet.',
      back: 'Back to blog',
      otherLang: 'Read in Spanish',
      published: 'Published',
    },
    projects: {
      title: 'Projects',
      subtitle:
        'A curated selection. The site is the narrative; the code lives on GitHub.',
      empty: 'No projects yet.',
      back: 'Back to projects',
      otherLang: 'Read in Spanish',
      summary: 'Summary',
      problem: 'Problem',
      method: 'Method',
      results: 'Status & Results',
      learnings: 'Learnings',
      links: 'Links',
      repo: 'GitHub repository',
      relatedPosts: 'Related writing',
      stack: 'Stack',
    },
    about: {
      title: 'About',
      kicker: 'about',
    },
    contact: {
      title: 'Contact',
      kicker: 'contact',
    },
    status: {
      active: 'active',
      paused: 'paused',
      archived: 'archived',
      draft: 'draft',
    },
    common: {
      readMore: 'Read more',
      switchLang: 'Leer en español',
      switchLangShort: 'ES',
      siteFullName: 'Leonardo Solis',
      siteRole: 'Physicist & Quant Researcher',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      blog: 'Blog',
      contact: 'Contacto',
    },
    home: {
      eyebrow: 'Física · Mercados · Matemáticas',
      role: 'Físico y Quant Researcher',
      blurb:
        'Hago experimentación cuántica en la academia y quant research en lo profesional —programación, modelos, mercados eléctricos. Aquí escribo para pensar en voz alta sobre física, matemáticas y mercados.',
      shortcuts: 'Atajos',
      latestPost: 'Última entrada',
      mathComps: 'Competencias matemáticas',
      problems: 'Problemas',
      classes: 'Clases',
      downloadCV: 'Descargar CV',
      recentPosts: 'Escritos recientes',
      featuredProjects: 'Proyectos destacados',
      seeAll: 'Ver todos',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Apuntes sobre física, matemáticas, mercados y de cuando en cuando un libro.',
      readingTime: 'min de lectura',
      empty: 'Aún sin entradas.',
      back: 'Volver al blog',
      otherLang: 'Read in English',
      published: 'Publicado',
    },
    projects: {
      title: 'Proyectos',
      subtitle:
        'Una selección curada. El sitio es la narrativa; el código vive en GitHub.',
      empty: 'Aún sin proyectos.',
      back: 'Volver a proyectos',
      otherLang: 'Read in English',
      summary: 'Resumen',
      problem: 'Problema',
      method: 'Método',
      results: 'Estado y resultados',
      learnings: 'Aprendizajes',
      links: 'Enlaces',
      repo: 'Repositorio en GitHub',
      relatedPosts: 'Lecturas relacionadas',
      stack: 'Stack',
    },
    about: {
      title: 'Sobre mí',
      kicker: 'sobre mí',
    },
    contact: {
      title: 'Contacto',
      kicker: 'contacto',
    },
    status: {
      active: 'activo',
      paused: 'pausado',
      archived: 'archivado',
      draft: 'borrador',
    },
    common: {
      readMore: 'Leer más',
      switchLang: 'Read in English',
      switchLangShort: 'EN',
      siteFullName: 'Leonardo Solis',
      siteRole: 'Físico y Quant Researcher',
    },
  },
} as const;

export const t = (lang: Lang) => ui[lang];

/* Rutas que dependen del idioma. La sección de proyectos se llama
   "projects" en inglés y "proyectos" en español (la ruta importa para SEO). */
export const routes = {
  en: { home: '/en', about: '/en/about', projects: '/en/projects', blog: '/en/blog', contact: '/en/contact' },
  es: { home: '/es', about: '/es/sobre-mi', projects: '/es/proyectos', blog: '/es/blog', contact: '/es/contacto' },
} as const;

/* Formato de fecha por idioma */
export function formatDate(d: Date, lang: Lang): string {
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(d: Date, lang: Lang): string {
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
