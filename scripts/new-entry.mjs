import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const [section, slug, lang='es', ...titleParts] = process.argv.slice(2);
const allowed = ['reviews','research','quant','teaching'];
if (!allowed.includes(section) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '') || !['es','en'].includes(lang)) {
  console.error('Uso: npm run new:entry -- reviews|research|quant|teaching slug es|en "Título"');
  process.exit(1);
}
const root = new URL('../', import.meta.url);
const template = await readFile(new URL('templates/' + section + '.md',root),'utf8');
const title = titleParts.join(' ') || slug.replaceAll('-',' ');
const date = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const content = template
  .replace(/^title:.*$/m,()=> 'title: ' + JSON.stringify(title))
  .replace(/^slug:.*$/m,()=> 'slug: ' + JSON.stringify(slug))
  .replace(/^lang:.*$/m,()=> 'lang: ' + JSON.stringify(lang))
  .replace(/^date:.*$/m,()=> 'date: ' + JSON.stringify(date));
const folder = new URL('src/content/' + section + '/' + lang + '/',root);
await mkdir(folder,{recursive:true});
const destination = new URL(slug + '.md',folder);
try { await writeFile(destination,content,{flag:'wx'}); }
catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.error('Ya existe; no se sobrescribió: ' + fileURLToPath(destination));
  process.exit(1);
}
console.log('Borrador: ' + fileURLToPath(destination));
console.log('Completa los datos, escribe el texto y cambia draft: true a false para publicar.');
