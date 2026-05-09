export type Lang = 'en' | 'es';

export const LANGS: Lang[] = ['en', 'es'];

export const routes = {
  en: {
    home: '/en', cv: '/en/cv', research: '/en/research', quant: '/en/quant',
    teaching: '/en/teaching', reviews: '/en/reviews', blog: '/en/blog', contact: '/en/contact',
  },
  es: {
    home: '/es', cv: '/es/cv', research: '/es/research', quant: '/es/quant',
    teaching: '/es/ensenanza', reviews: '/es/resenas', blog: '/es/bitacora', contact: '/es/contacto',
  },
} as const;

export const ui = {
  en: {
    nav: { home:'Home', cv:'CV', research:'Research', quant:'Quant', teaching:'Teaching', reviews:'Reviews', blog:'Log', contact:'Contact' },
    home: {
      eyebrow:'Physics · Markets · Mathematics', role:'Physicist & Quant Researcher',
      blurb:'I work near the intersection of physics, mathematics, quantum experimentation, and energy markets. This site is a public notebook: projects, classes, research notes, reviews, and ideas in progress.',
      shortcuts:'Shortcuts', latestPost:'Latest entry', mathComps:'Math competitions', problems:'Problems', classes:'Classes', downloadCV:'Download CV',
      recentPosts:'Recent writing', featuredResearch:'Research lines', featuredQuant:'Quant notes', seeAll:'See all', aboutLabel:'About this site'
    },
    cv:{ title:'CV', subtitle:'Education, experience, awards, papers in progress, and technical skills.', education:'Education', experience:'Experience', awards:'Awards & Recognition', papers:'Papers in progress', skills:'Skills', download:'Download PDF CV' },
    research:{ title:'Research', subtitle:'Laboratory work, thesis ideas, theoretical explorations, and papers in progress.', all:'All', lab:'Laboratory', theory:'Theory', back:'Back to research', location:'Location', advisor:'Advisor' },
    quant:{ title:'Quant & Markets', subtitle:'Work at the intersection of statistical physics, energy markets, algorithms, and model attribution.', intro:'I work at the intersection between statistical physics and energy markets: network models, congestion, attribution, correlation structure, and quantitative decision analysis.', back:'Back to quant', period:'Period', organization:'Organization', stack:'Stack' },
    teaching:{ title:'Teaching', subtitle:'Classes, problem collections, workshops, and teaching projects.', problems:'Problems', presential:'In-person classes', university:'University', back:'Back to teaching', statement:'Statement', solution:'Solution', topics:'Topics' },
    reviews:{ title:'Reviews', subtitle:'Books, films, games, and texts worth thinking through.', all:'All', nonfiction:'Non-fiction', science:'Science', fiction:'Fiction', back:'Back to reviews', score:'Score', status:{leido:'Read', leyendo:'Reading', abandonado:'Abandoned'} },
    blog:{ title:'Log', subtitle:'Notes on physics, mathematics, markets, teaching, and personal work in progress.', all:'All', cats:{fisica:'Physics', quant:'Quant', matematicas:'Mathematics', mercados:'Markets', personal:'Personal'}, back:'Back to log', readingTime:'min read', featured:'Featured' },
    common:{ switchLang:'Leer en español', switchLangShort:'ES', readMore:'Read more', empty:'No entries yet.', siteFullName:'Leonardo Solis', siteRole:'Physicist & Quant Researcher' },
  },
  es: {
    nav: { home:'Inicio', cv:'CV', research:'Research', quant:'Quant', teaching:'Enseñanza', reviews:'Reseñas', blog:'Bitácora', contact:'Contacto' },
    home: {
      eyebrow:'Física · Mercados · Matemáticas', role:'Físico y Quant Researcher',
      blurb:'Trabajo cerca de la intersección entre física, matemáticas, experimentación cuántica y mercados de energía. Este sitio es una bitácora pública: proyectos, clases, notas de investigación, reseñas e ideas en progreso.',
      shortcuts:'Atajos', latestPost:'Última entrada', mathComps:'Competencias matemáticas', problems:'Problemas', classes:'Clases', downloadCV:'Descargar CV',
      recentPosts:'Escritos recientes', featuredResearch:'Líneas de investigación', featuredQuant:'Notas quant', seeAll:'Ver todas', aboutLabel:'Sobre este sitio'
    },
    cv:{ title:'CV', subtitle:'Educación, experiencia, logros, papers en progreso y habilidades técnicas.', education:'Educación', experience:'Experiencia', awards:'Logros & Reconocimientos', papers:'Papers en progreso', skills:'Habilidades', download:'Descargar CV en PDF' },
    research:{ title:'Research', subtitle:'Trabajo de laboratorio, tesis, exploraciones teóricas y papers en progreso.', all:'Todas', lab:'Laboratorio', theory:'Teoría', back:'Volver a research', location:'Lugar', advisor:'Asesor' },
    quant:{ title:'Quant & Mercados', subtitle:'Trabajo en la intersección entre física estadística, mercados de energía, algoritmos y atribución de modelos.', intro:'Trabajo en la intersección entre física estadística y mercados de energía: modelos de red, congestión, atribución, estructura de correlaciones y análisis cuantitativo de decisiones.', back:'Volver a quant', period:'Periodo', organization:'Organización', stack:'Stack' },
    teaching:{ title:'Enseñanza', subtitle:'Clases, colecciones de problemas, talleres y proyectos educativos.', problems:'Problemas', presential:'Clases presenciales', university:'Universitarias', back:'Volver a enseñanza', statement:'Enunciado', solution:'Solución', topics:'Temas' },
    reviews:{ title:'Reseñas', subtitle:'Libros, películas, videojuegos y textos que vale la pena pensar.', all:'Todas', nonfiction:'No ficción', science:'Ciencias', fiction:'Ficción', back:'Volver a reseñas', score:'Calificación', status:{leido:'Leído', leyendo:'Leyendo', abandonado:'Abandonado'} },
    blog:{ title:'Bitácora', subtitle:'Notas sobre física, matemáticas, mercados, enseñanza y trabajo personal en progreso.', all:'Todas', cats:{fisica:'Física', quant:'Quant', matematicas:'Matemáticas', mercados:'Mercados', personal:'Personal'}, back:'Volver a bitácora', readingTime:'min', featured:'Destacada' },
    common:{ switchLang:'Read in English', switchLangShort:'EN', readMore:'Leer más', empty:'Sin entradas todavía.', siteFullName:'Leonardo Solis', siteRole:'Físico y Quant Researcher' },
  },
} as const;

export const t = (lang: Lang) => ui[lang];

export function formatDate(d: Date | string, lang: Lang): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return String(d);
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}
