import type { APIRoute } from 'astro';
import { erlaubeIndex } from '../lib/index-schalter';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  const text = erlaubeIndex
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `# Entwurf: gesperrt. Mit PUBLIC_ALLOW_INDEX=true beim Build wird die Seite indexierbar.\nUser-agent: *\nDisallow: /\n`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
