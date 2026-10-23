import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const [slug, lang = 'es', ...titleParts] = process.argv.slice(2);
if (!slug || slug === '--help') {
  console.log('Uso: npm run new:post -- nombre-de-la-entrada [es|en] "Título de la entrada"');
  process.exit(slug === '--help' ? 0 : 1);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !['es', 'en'].includes(lang)) {
  console.error('Usa un nombre con minúsculas, números y guiones, y el idioma es o en.');
  process.exit(1);
}
const root = new URL('../', import.meta.url);
const date = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());
const fields = {
  title: titleParts.join(' ') || slug.replace(/-/g, ' '),
  description: lang === 'es' ? 'Una descripción breve de la entrada.' : 'A short description of the entry.',
  date, lang, slug,
};
let template = await readFile(new URL('templates/entrada.md', root), 'utf8');
for (const [key, value] of Object.entries(fields)) {
  template = template.replace(new RegExp('^' + key + ':.*$', 'm'), () => key + ': ' + JSON.stringify(value));
}
const dir = new URL('src/content/blog/' + lang + '/', root);
await mkdir(dir, { recursive: true });
const file = new URL(slug + '.md', dir);
try {
  await writeFile(file, template, { flag: 'wx' });
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.error('La entrada ya existe; no se ha sobrescrito: ' + fileURLToPath(file));
  process.exit(1);
}
console.log('Borrador creado: ' + fileURLToPath(file));
console.log('Reemplaza el ejemplo, revisa con npm run dev y cambia draft a false para publicar.');
