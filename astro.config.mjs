import { defineConfig } from 'astro/config';

// IMPORTANTE: cambia "site" por tu URL real cuando despliegues.
// Si tu repo se llama exactamente "tuusuario.github.io", el "site" es
// "https://tuusuario.github.io" y el "base" se queda como "/".
// Si tu repo se llama distinto (ej. "mi-sitio"), descomenta "base"
// y ponlo a "/mi-sitio/".
export default defineConfig({
  site: 'https://leonardosolis0303.github.io',
  // base: '/mi-sitio/',
  trailingSlash: 'never',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
