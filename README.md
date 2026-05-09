# leosolis-site

Sitio personal de Leonardo Solis. Astro + Markdown, bilingüe (EN/ES),
desplegado en GitHub Pages.

---

## Requisitos

- Node.js ≥ 22.12 (Astro 6 lo requiere)
- npm

## Setup local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist con HTML estático
npm run preview  # sirve /dist localmente para verificar
```

---

## Estructura

```
src/
├── content/
│   ├── blog/
│   │   ├── rmt-energy-markets/
│   │   │   ├── en.md            ← versión en inglés
│   │   │   └── es.md            ← versión en español
│   │   ├── crr-attribution/
│   │   │   ├── en.md
│   │   │   └── es.md
│   │   └── measurement-problem/
│   │       ├── en.md
│   │       └── es.md
│   └── projects/
│       ├── rmt-energy-markets/
│       ├── crr-attribution/
│       └── quantum-memory-fwm/
├── content.config.ts            ← schemas Zod (validan frontmatter)
├── lib/
│   ├── i18n.ts                  ← strings de UI por idioma
│   └── content.ts               ← helpers para emparejar bilingüe
├── components/
│   ├── Sidebar.astro
│   ├── SEO.astro
│   ├── Listing.astro
│   └── HomeContent.astro
├── layouts/
│   └── Base.astro
├── pages/
│   ├── index.astro              ← / (home en inglés, link visible a /es)
│   ├── en/
│   │   ├── index.astro          ← /en
│   │   ├── about.astro          ← /en/about
│   │   ├── contact.astro
│   │   ├── blog/index.astro
│   │   ├── blog/[slug].astro
│   │   ├── projects/index.astro
│   │   └── projects/[slug].astro
│   ├── es/
│   │   ├── index.astro          ← /es
│   │   ├── sobre-mi.astro
│   │   ├── contacto.astro
│   │   ├── blog/...
│   │   └── proyectos/...
│   └── sitemap.xml.ts
├── styles/
│   ├── global.css
│   └── home.css
└── public/
    ├── assets/
    │   ├── pizarron.jpg
    │   └── cv.pdf               ← REEMPLAZA con tu CV real
    ├── favicon.svg
    ├── robots.txt
    └── .nojekyll
```

---

## Cómo escribir contenido

### Una nueva entrada de blog

1. Crea una carpeta dentro de `src/content/blog/` con un nombre corto y
   neutral (es la **translationKey**, así se conectan las dos versiones):

   ```
   src/content/blog/mi-nueva-entrada/
   ├── en.md
   └── es.md
   ```

2. En cada archivo, frontmatter mínimo:

   ```markdown
   ---
   title: "My New Entry"
   description: "Short SEO-friendly description."
   date: 2026-05-10
   lang: en
   slug: "my-new-entry"
   tags: ["physics", "notes"]
   draft: false
   ---

   Cuerpo en Markdown.
   ```

   El `slug` se convierte en la URL final:
   `/en/blog/my-new-entry` y `/es/blog/mi-nueva-entrada`.
   Pueden ser slugs distintos en cada idioma — y deben serlo, para SEO.

3. **No tienes que escribir las dos versiones de inmediato.** Si solo
   tienes la versión en español, crea solo `es.md`. La página existirá en
   `/es/blog/...` y no aparecerá en inglés. Cuando la traduzcas,
   agrega `en.md` en la misma carpeta y se conectarán automáticamente.

4. Para un borrador no publicado, `draft: true`. No genera URL hasta que
   lo cambies a `false`.

### Un nuevo proyecto

Lo mismo, pero en `src/content/projects/`. El frontmatter acepta campos
extra:

```yaml
---
title: "..."
description: "..."
date: 2026-05-01
lang: en
slug: "..."
tags: ["..."]
status: "active"      # active | paused | archived | draft
repo: "https://github.com/usuario/repo"   # opcional
relatedPosts: ["measurement-problem"]     # translationKeys de posts
draft: false
---
```

`relatedPosts` toma las translationKeys (nombres de carpeta) de posts del
blog y los muestra al final de la página del proyecto.

---

## Cómo ligar el sitio con tus repos de GitHub

En el frontmatter de cada proyecto, pon `repo: "https://github.com/..."`.
Aparecerá automáticamente el botón **GitHub repository** al final de la
página del proyecto.

Para el sentido inverso (que el repo apunte de vuelta al sitio), pon en
el README del repo:

```markdown
> Read more about this project: <https://leosolis.github.io/en/projects/random-matrix-theory-energy-markets>
```

---

## SEO

Cada página individual tiene:

- `<title>` y `<meta description>` propios
- `<link rel="canonical">` a sí misma
- `<link rel="alternate" hreflang="...">` a la versión en el otro idioma
  (cuando existe)
- `<meta property="og:..."` para Open Graph
- HTML estático real (no JS rendering)

`/sitemap.xml` se genera en cada build. `robots.txt` lo apunta.

---

## Despliegue en GitHub Pages

### Si tu repo se llama `leosolis.github.io`

1. Sube el código a la rama `main`.
2. Ve a **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. El workflow en `.github/workflows/deploy.yml` se ejecuta solo en cada
   push y publica el sitio en `https://leosolis.github.io`.

### Si tu repo se llama distinto (ej. `mi-sitio`)

El sitio vivirá en `https://leosolis.github.io/mi-sitio/`. Para que las
URLs internas funcionen, abre `astro.config.mjs` y descomenta `base`:

```js
export default defineConfig({
  site: 'https://leosolis.github.io',
  base: '/mi-sitio/',
  ...
});
```

### Cambiar el dominio (custom domain)

Si compras un dominio (ej. `leosolis.com`):

1. En Settings → Pages, agrégalo como custom domain.
2. Cambia `site` en `astro.config.mjs` a `https://leosolis.com`.
3. Asegúrate de que `base` esté como `/`.

---

## Tareas de personalización antes del primer deploy

- [ ] Reemplazar `public/assets/cv.pdf` con el CV real.
- [ ] Reemplazar `tucorreo@ejemplo.com` en `/en/contact.astro` y
      `/es/contacto.astro`.
- [ ] Verificar los handles de GitHub y LinkedIn en
      `Sidebar.astro` y en las páginas de contacto.
- [ ] Si cambias de dominio, actualizar `site` en `astro.config.mjs`.
- [ ] Actualizar `Sitemap` en `public/robots.txt` con la URL final.
- [ ] (Opcional) Cambiar `leosolis.github.io` en `pages/index.astro` y en
      el `about` por la URL real cuando esté.

---

## Troubleshooting

**El build falla con un error de schema en un Markdown.**
Falta un campo obligatorio o pusiste un valor que no encaja con el
schema. Revisa `src/content.config.ts` y compara con el frontmatter del
archivo que falla.

**Los enlaces a otros idiomas no aparecen.**
Verifica que la carpeta tenga ambos `en.md` y `es.md`, y que ninguno
tenga `draft: true`.

**La página queda en blanco.**
Probablemente un problema de path con `base`. Revisa `astro.config.mjs`.
