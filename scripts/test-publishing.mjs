import assert from 'node:assert/strict';
import { readFile, writeFile, access, mkdtemp, cp, symlink, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const astroPackagePath = require.resolve('astro/package.json');
const astroBin = resolve(dirname(astroPackagePath), require(astroPackagePath).bin.astro);
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const testRoot = await mkdtemp(join(tmpdir(), 'site-publishing-'));
for (const path of ['src', 'public', 'scripts', 'templates', 'package.json', 'astro.config.mjs', 'tsconfig.json']) {
  await cp(join(projectRoot, path), join(testRoot, path), { recursive: true });
}
await symlink(join(projectRoot, 'node_modules'), join(testRoot, 'node_modules'), 'dir');
const publishedSlug = 'publishing-test-' + process.pid;
const draftSlug = publishedSlug + '-draft';
const file = (slug) => join(testRoot, 'src/content/blog/es/' + slug + '.md');
function run(args, success = true, cwd = testRoot) {
  const result = spawnSync(process.execPath, args, { encoding: 'utf8', cwd });
  if (success && result.status !== 0) throw new Error(result.stdout + result.stderr);
  if (!success) assert.notEqual(result.status, 0);
}
function build(cwd = testRoot) {
  run([astroBin, 'build'], true, cwd);
  run(['scripts/check-site.mjs'], true, cwd);
}
try {
  for (const slug of [publishedSlug, draftSlug]) {
    run(['scripts/new-post.mjs', slug, 'es', 'Prueba: ecuaciones y publicación']);
  }
  const before = await readFile(file(publishedSlug), 'utf8');
  run(['scripts/new-post.mjs', publishedSlug, 'es', 'No sobrescribir'], false);
  assert.equal(await readFile(file(publishedSlug), 'utf8'), before);
  run(['scripts/new-post.mjs', '../fuera-de-la-carpeta', 'es'], false);
  await writeFile(file(publishedSlug), before.replace('draft: true', 'draft: false'));
  build();
  const html = await readFile(join(testRoot, 'dist/es/bitacora/' + publishedSlug + '/index.html'), 'utf8');
  assert(html.includes('class="katex"'), 'Inline math was not rendered.');
  assert(html.includes('class="katex-display"'), 'Display math was not rendered.');
  assert(html.includes('<math'), 'Accessible MathML is missing.');
  assert(!html.includes('katex-error'), 'A template equation failed.');
  assert(!html.includes('hreflang="en"'), 'Untranslated article advertises an English translation.');
  assert(html.includes('<ul>') && html.includes('<strong>'), 'Markdown formatting is missing.');
  await assert.rejects(access(join(testRoot, 'dist/es/bitacora/' + draftSlug + '/index.html')));
  for (const path of ['dist/sitemap.xml', 'dist/index.html', 'dist/es/index.html', 'dist/es/bitacora/index.html']) {
    assert(!(await readFile(join(testRoot, path), 'utf8')).includes(draftSlug), 'Draft leaked into ' + path);
  }
  console.log('Passed: post creation, overwrite/path protection, Markdown, inline/display math, MathML, drafts and missing translations.');
} finally {
  await rm(testRoot, { recursive: true, force: true });
}
build(projectRoot);
