import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://foodcourt47.de',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  // Skripte immer als eigene Datei ausliefern, damit die CSP ohne Inline-Skripte auskommt
  vite: { build: { assetsInlineLimit: 0 } },
});
