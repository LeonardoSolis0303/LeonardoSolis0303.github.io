# Leonardo Solis — sitio personal

Sitio bilingüe en Astro, publicado en [GitHub Pages](https://leonardosolis0303.github.io/).
Las entradas de Bitácora / Log se escriben en Markdown, con ecuaciones LaTeX renderizadas con KaTeX durante la compilación.

## Publicar una entrada desde GitHub

1. Abre `src/content/blog/es/` (o `en/` para inglés).
2. Usa **Add file → Create new file** y elige un nombre como `mi-nueva-entrada.md`.
3. Copia [la plantilla](templates/entrada.md). Completa título, descripción, fecha, idioma, slug y contenido.
4. Cambia `draft: true` a `draft: false` cuando esté lista.
5. Guarda el cambio en `main`. GitHub Actions construye y publica el sitio automáticamente.

No necesitas editar índices, menús ni el sitemap al añadir una entrada. Si la compilación falla, la versión anterior permanece publicada: revisa la pestaña **Actions** del repositorio.

## Escribir y revisar en tu computadora

Usa Node.js 22.12 o posterior; se recomienda una versión LTS compatible con Astro.

```bash
npm ci
npm run new:post -- mi-nueva-entrada es "Título de mi entrada"
npm run dev
```

El comando crea un borrador a partir de la plantilla y no sobrescribe archivos existentes.
Abre la dirección local que muestra Astro, entra en Bitácora y revisa el resultado. Los borradores llevan una etiqueta visible en la vista previa local.

Para comprobar la versión que se publicará:

```bash
npm run build
npm run preview
```

`npm run build` también comprueba enlaces internos, URLs canónicas, versiones de idioma, metadatos de artículos y sitemap.
Los borradores se excluyen del sitio generado, incluso de los listados y el sitemap. Los archivos del repositorio público siguen siendo públicos, aunque tengan `draft: true`.

## Datos de cada entrada

| Campo | Uso |
| --- | --- |
| `title` | Título visible. |
| `description` | Resumen para el listado y los buscadores. |
| `date` | Fecha de publicación, entre comillas: `"2026-10-23"`. |
| `lang` | `es` o `en`. |
| `slug` | Parte final de la URL, con minúsculas, números y guiones. Una vez publicada, consérvala para mantener sus enlaces. |
| `category` | `fisica`, `quant`, `matematicas`, `mercados` o `personal`. |
| `draft` | `true` para borrador; `false` para publicar. Si se omite, se trata como borrador. |
| `tags` | Opcional: `["cuántica", "matemáticas"]`. |
| `featured` | Opcional: destaca la entrada con una estrella. |
| `updated` | Opcional: fecha de una modificación relevante, igual o posterior a `date`. |
| `image`, `imageAlt`, `caption` | Opcionales: portada, texto alternativo y pie de foto. |

Las entradas se ordenan por fecha; el tiempo de lectura se calcula a partir del texto.
La fecha no programa una publicación: el cambio se publica cuando lo guardas en `main` con `draft: false`.

Para una traducción, crea otro archivo en la carpeta del otro idioma, usa el mismo `slug`, cambia `lang` y traduce título, descripción y texto. No es obligatorio traducir todas las entradas. El enlace de idioma del artículo y las etiquetas para buscadores solo vinculan artículos cuya traducción existe y está publicada; sin traducción, el selector de idioma lleva a la portada del otro idioma.

## Ecuaciones, imágenes y código

Usa `$E = mc^2$` para matemáticas dentro de un párrafo. Para un bloque:

```latex
$$
i\hbar \frac{\partial}{\partial t}|\psi(t)\rangle
= \hat H|\psi(t)\rangle.
$$
```

KaTeX admite integrales, matrices, ecuaciones alineadas y mucha de la notación habitual de LaTeX; no compila documentos `.tex` completos ni todos sus paquetes. Consulta [los comandos admitidos](https://katex.org/docs/supported.html). Para un signo de moneda literal escribe `\$`.

Sube las imágenes a `public/images/` y enlázalas como `![Descripción de la imagen](/images/mi-imagen.png)`. Para código, usa bloques Markdown con tres acentos graves y el nombre del lenguaje. También puedes usar listas, tablas, citas y enlaces.

## Buscadores

El sitio genera títulos, descripciones, URLs canónicas, enlaces entre traducciones y metadatos `BlogPosting`. El [sitemap](https://leonardosolis0303.github.io/sitemap.xml) contiene las páginas publicadas; `robots.txt` apunta a ese mismo dominio. Las fechas `lastmod` de los artículos proceden de `updated` o `date`, no de cada compilación.

Para comprobar y solicitar la indexación en Google:

1. Abre [Google Search Console](https://search.google.com/search-console/).
2. Añade una propiedad de **prefijo de URL**: `https://leonardosolis0303.github.io/`.
3. Verifica la propiedad. Si eliges el archivo HTML de Google, colócalo sin cambios en `public/`, publica y completa la verificación.
4. Envía `sitemap.xml` en **Sitemaps**.
5. Inspecciona la portada o una entrada y solicita su indexación.

Este repositorio no verifica la propiedad ni envía solicitudes a Google por sí mismo. La indexación y la posición de los resultados dependen de Google.

## Perfil y otras secciones

Research, Quant, Enseñanza, Reseñas y CV conservan sus datos en `src/data/siteData.ts`.
`CV.contact` centraliza el correo y los perfiles; los campos vacíos no se muestran. GitHub ya contiene el perfil correcto. Añade correo y LinkedIn reales cuando corresponda (LinkedIn se guarda como `linkedin.com/in/tu-perfil`, sin `https://`).

La portada enlaza al CV web. Para habilitar una descarga de PDF, coloca un PDF real en `public/assets/cv.pdf` y configura `CV.pdfUrl` como `/assets/cv.pdf`. Se retiró el archivo de texto que antes tenía extensión `.pdf`.

## Validación

```bash
npm test
```

Comprueba la creación de entradas, protección contra sobrescritura, renderizado de ecuaciones, exclusión de borradores y artículos sin traducción. Elimina sus entradas temporales y deja una compilación limpia al terminar.
