# Publicar entradas

Las cuatro secciones `reviews`, `research`, `quant` y `teaching` se escriben como archivos Markdown, al igual que la Bitácora.

## Crear un borrador

```sh
npm run new:entry -- reviews crimen-y-castigo es "Crimen y castigo"
npm run new:entry -- research polaritones es "Polaritones"
npm run new:entry -- quant mercados-electricos es "Mercados eléctricos"
npm run new:entry -- teaching problemas-calculo es "Problemas de cálculo"
```

También puedes copiar el archivo de `templates/` correspondiente a `src/content/NOMBRE_SECCION/es/slug.md`.

Para inglés usa `en` y mantén **el mismo slug** en ambos archivos para que se conecten como traducciones. Publicar una sola versión está permitido: no se enlaza ninguna traducción inexistente.

Revisa los campos al principio del archivo (entre `---`); cambia `draft: true` a `draft: false` para publicar. Los borradores no generan páginas públicas ni aparecen en el sitemap. Las imágenes van en `public/assets/` y se referencian como `/assets/imagen.jpg`. Dentro del texto se admiten Markdown, LaTeX con `$...$` y `$$...$$`, pies de imagen y notas al pie.

Las categorías y metadatos varían según la sección: consulta los ejemplos de `templates/`. Un mismo slug debe ser único por sección e idioma. Antes de publicar, ejecuta `npm run build`.
