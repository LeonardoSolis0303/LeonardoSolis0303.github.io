# Leonardo Solis — personal site

Astro version of the personal website, preserving the original blackboard / linen aesthetic and the original sections:

- Home
- CV
- Research
- Quant
- Teaching / Enseñanza
- Reviews / Reseñas
- Blog / Bitácora

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

The site deploys to GitHub Pages through `.github/workflows/deploy.yml`.

## Editing content

Most editable content is centralized in:

```text
src/data/siteData.ts
```

This was ported from the original React site data files.
