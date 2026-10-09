// Lädt die Fotos aus src/content/fotos.json (Feld "quelle") nach src/assets/fotos/<id>.jpg.
// Einmalig nötig, danach liegen die Dateien im Repo. Aufruf: node scripts/fotos-laden.mjs
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

const fotos = JSON.parse(readFileSync(new URL('../src/content/fotos.json', import.meta.url), 'utf8'));
const ziel = new URL('../src/assets/fotos/', import.meta.url);
mkdirSync(ziel, { recursive: true });

for (const f of fotos) {
  const datei = new URL(`${f.id}.jpg`, ziel);
  if (existsSync(datei)) continue;
  // Unsplash: Original in hoher Auflösung als JPEG, Qualität 82
  const url = f.quelle.includes('images.unsplash.com') ? `${f.quelle}?w=2400&q=82&fm=jpg&fit=max` : f.quelle;
  const antwort = await fetch(url);
  if (!antwort.ok) throw new Error(`${f.id}: HTTP ${antwort.status} (${url})`);
  writeFileSync(datei, Buffer.from(await antwort.arrayBuffer()));
  console.log('geladen', f.id);
}
