// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Preview en GitHub Pages hasta que exista el dominio (ADR-013): `site` + `base`.
// Con dominio propio: `site: 'https://<dominio>'`, sin `base`, y `public/CNAME`.
const SITE = 'https://owner8b-droid.github.io';
const BASE = '/grupobarsol/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  // El CSS completo pesa ~4,5 KB gzip: en línea ahorra un viaje de red antes del primer pintado (LCP en red lenta).
  build: { inlineStylesheets: 'always' },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false }, // es en "/", en en "/en/"
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-CR', en: 'en' } },
      filter: (page) => !page.includes('/sistema/'),
    }),
  ],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Urbanist',
      cssVariable: '--font-urbanist',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  // security: { csp: true }, // se activa en la F7 (BRIEF.md §4.3)
});
