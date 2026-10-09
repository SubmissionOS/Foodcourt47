import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://foodcourt47.de',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (seite) => !/\/hero-[abc]\/?$/.test(seite) })],
  devToolbar: { enabled: false },
});
