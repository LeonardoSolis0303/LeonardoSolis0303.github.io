import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// IMPORTANTE: cambia "site" por tu URL real cuando despliegues.
// Si tu repo se llama exactamente "tuusuario.github.io", el "site" es
// "https://tuusuario.github.io" y el "base" se queda como "/".
// Si tu repo se llama distinto (ej. "mi-sitio"), descomenta "base"
// y ponlo a "/mi-sitio/".
export default defineConfig({
  site: 'https://leonardosolis0303.github.io',
  // base: '/mi-sitio/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { allowedHosts: ['terminal.local'] },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
