// Schreibt vercel.json passend zu PUBLIC_ALLOW_INDEX. Läuft vor jedem Build.
// Standard (Variable fehlt): gesperrt, mit X-Robots-Tag noindex. Die eingecheckte Datei entspricht diesem Standard.
import { writeFileSync } from 'node:fs';
import { vercelConfig } from '../config/headers.mjs';

const erlaubeIndex = process.env.PUBLIC_ALLOW_INDEX === 'true';
const ziel = new URL('../vercel.json', import.meta.url);
writeFileSync(ziel, JSON.stringify(vercelConfig(erlaubeIndex), null, 2) + '\n');
console.log(`vercel.json geschrieben (Indexierung ${erlaubeIndex ? 'erlaubt' : 'gesperrt'})`);
