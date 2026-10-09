// Lokaler Server für dist/, der sich wie Vercel verhält: Brotli/Gzip, saubere URLs, Sicherheits-Header
// (aus config/headers.mjs), Immutable-Cache für /_astro/. Für Lighthouse-Messungen: node scripts/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { brotliCompress, gzip, constants } from 'node:zlib';
import { promisify } from 'node:util';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { indexHeader, sicherheitsHeader } from '../config/headers.mjs';

const wurzel = process.env.DIST_DIR ? join(process.env.DIST_DIR, sep) : fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.argv[2] ?? 4400);
const erlaubeIndex = process.env.PUBLIC_ALLOW_INDEX === 'true';
const br = promisify(brotliCompress);
const gz = promisify(gzip);

const typen = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};
const komprimierbar = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.md', '.svg']);
const cache = new Map();

async function datei(pfad) {
  try {
    const s = await stat(pfad);
    return s.isFile() ? pfad : null;
  } catch {
    return null;
  }
}

async function aufloesen(urlPfad) {
  const sauber = normalize(decodeURIComponent(urlPfad)).replace(/^([/\\])+/, '');
  const basis = join(wurzel, sauber);
  if (!basis.startsWith(wurzel.replace(/[/\\]$/, ''))) return null;
  if (extname(sauber)) return datei(basis);
  return (await datei(join(basis, 'index.html'))) ?? (await datei(basis + '.html'));
}

createServer(async (anfrage, antwort) => {
  try {
    const url = new URL(anfrage.url, 'http://localhost');
    let pfad = await aufloesen(url.pathname);
    let status = 200;
    if (!pfad) {
      pfad = join(wurzel, '404.html');
      status = 404;
    }
    const endung = extname(pfad);
    const kopf = {
      'Content-Type': typen[endung] ?? 'application/octet-stream',
      'Cache-Control': url.pathname.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
      Vary: 'Accept-Encoding',
    };
    for (const { key, value } of [...sicherheitsHeader(), ...indexHeader(erlaubeIndex)]) kopf[key] = value;

    let inhalt = await readFile(pfad);
    const akzeptiert = String(anfrage.headers['accept-encoding'] ?? '');
    if (komprimierbar.has(endung) && inhalt.length > 512) {
      const art = akzeptiert.includes('br') ? 'br' : akzeptiert.includes('gzip') ? 'gzip' : null;
      if (art) {
        const schluessel = `${art}:${pfad}`;
        if (!cache.has(schluessel)) {
          cache.set(schluessel, art === 'br' ? await br(inhalt, { params: { [constants.BROTLI_PARAM_QUALITY]: 6 } }) : await gz(inhalt, { level: 9 }));
        }
        inhalt = cache.get(schluessel);
        kopf['Content-Encoding'] = art;
      }
    }
    kopf['Content-Length'] = inhalt.length;
    antwort.writeHead(status, kopf);
    antwort.end(anfrage.method === 'HEAD' ? undefined : inhalt);
  } catch (fehler) {
    antwort.writeHead(500, { 'Content-Type': 'text/plain' });
    antwort.end(String(fehler));
  }
}).listen(port, () => console.log(`dist/ auf http://localhost:${port} (${sep === '\\' ? 'Windows' : 'Unix'}, Indexierung ${erlaubeIndex ? 'erlaubt' : 'gesperrt'})`));
