import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://foodcourt47.de',
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  // Schriften selbst gehostet: nur der Latin-Zeichensatz (deckt Umlaute, ß, €, Anführungszeichen ab),
  // eine variable Datei je Familie, font-display: swap, Fallback mit angepassten Metriken gegen Layout-Sprünge.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      display: 'swap',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [{ weight: '100 900', style: 'normal', src: ['./node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2'] }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Jost',
      cssVariable: '--font-jost',
      display: 'swap',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [{ weight: '100 900', style: 'normal', src: ['./node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2'] }],
      },
    },
  ],
  // Skripte immer als eigene Datei ausliefern, damit die CSP ohne Inline-Skripte auskommt
  vite: { build: { assetsInlineLimit: 0 } },
});
